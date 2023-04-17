import { useState } from "react";
import Cookies from "js-cookie";

type CookieHookResult = [
    string | undefined,
    Date | undefined,
    (value: string, expires?: Date) => void
];

const useCookie = (
    cookieName: string,
    cookiePath = "/",
    cookieDomain?: string
): CookieHookResult => {
    const [cookieValue, setCookieValue] = useState<string | undefined>(
        Cookies.get(cookieName)
    );
    const [expirationDate, setExpirationDate] = useState<Date | undefined>(
        () => {
            const expiration = Cookies.get(cookieName + "_expires");
            if (expiration) {
                return new Date(expiration);
            }
            return undefined;
        }
    );

    const setCookie = (value: string, expires?: Date): void => {
        if (!value || typeof value !== "string") {
            throw new Error("Invalid cookie value");
        }
        if (expires && isNaN(expires.getTime())) {
            throw new Error("Invalid expiration date");
        }

        Cookies.set(cookieName, value, {
            expires,
            httpOnly: true,
            secure: true,
            path: cookiePath,
            domain: cookieDomain,
        });
        setCookieValue(value);
        if (expires) {
            Cookies.set(cookieName + "_expires", expires.toUTCString(), {
                path: cookiePath,
                domain: cookieDomain,
            });
            setExpirationDate(expires);
        } else {
            Cookies.remove(cookieName + "_expires", {
                path: cookiePath,
                domain: cookieDomain,
            });
            setExpirationDate(undefined);
        }
    };

    return [cookieValue, expirationDate, setCookie];
};

export default useCookie;
