import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
    AuthenticationResult,
    EventMessage,
    EventType,
    InteractionRequiredAuthError,
    InteractionStatus,
    PublicClientApplication,
    RedirectRequest,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { CustomNavigationClient } from "@/lib/auth/navigationClient";
import useCookie from "@/lib/auth/useCookie";
import { msalConfig } from "@/lib/configs/authConfig";

export const useMsalInstance = () => {
    const router = useRouter();
    const msalInstance = useMemo(() => {
        const navigationClient = new CustomNavigationClient(router);
        const instance = new PublicClientApplication({
            ...msalConfig,
            system: {
                navigationClient,
            },
        });
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
            instance.setActiveAccount(accounts[0]);
        }
        instance.addEventCallback((event: EventMessage) => {
            if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                const payload = event.payload as AuthenticationResult;
                const account = payload.account;
                instance.setActiveAccount(account);
            }
        });
        return instance;
    }, [router]);
    return msalInstance;
};

export const useMsalToken = (
    tokenName: string,
    loginRequest: RedirectRequest
) => {
    const { accounts, instance, inProgress } = useMsal();
    const [cookieValue, expirationDate, setCookie] = useCookie(tokenName);
    const [isLoading, setIsLoading] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetryCount = 3;
    const retryDelay = 1000;
    const getToken = useCallback(
        async (retry = false) => {
            try {
                console.log("Calling token API...");
                const response = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0],
                });
                setCookie(
                    response.accessToken,
                    response.expiresOn ||
                        new Date(new Date().getTime() + 100000)
                );
                setIsLoading(false);
            } catch (error) {
                if (error instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect(loginRequest);
                    setIsLoading(false);
                } else if (retry && retryCount < maxRetryCount) {
                    setRetryCount(retryCount + 1);
                    setTimeout(() => getToken(true), retryDelay);
                } else {
                    setIsLoading(false);
                }
            }
        },
        [accounts, instance, loginRequest, setCookie, retryCount]
    );
    useEffect(() => {
        if (
            !isLoading &&
            inProgress === InteractionStatus.None &&
            instance &&
            accounts &&
            accounts.length > 0 &&
            (!cookieValue ||
                (expirationDate ? new Date() > expirationDate : true))
        ) {
            setIsLoading(true);
            getToken();
        }
    }, [
        accounts,
        instance,
        loginRequest,
        cookieValue,
        expirationDate,
        setCookie,
        isLoading,
        inProgress,
        getToken,
    ]);
    return cookieValue !== undefined ? cookieValue : null;
};
