import { Configuration, LogLevel } from "@azure/msal-browser";
import { AZURE_CLIENT_ID, AZURE_TENANT, AZURE_REDIRECT_URI } from "./constants";

export const msalConfig: Configuration = {
    auth: {
        clientId: AZURE_CLIENT_ID,
        authority: AZURE_TENANT,
        redirectUri: AZURE_REDIRECT_URI,
    },
    cache: {
        cacheLocation: "localStorage",
        // cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    // case LogLevel.Info:
                    //     console.info(message);
                    //     return;
                    // case LogLevel.Verbose:
                    //     console.debug(message);
                    //     return;
                    // case LogLevel.Warning:
                    //     console.warn(message);
                    //     return;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: ["User.Read"],
};

export const apiRequest = {
    scopes: [
        "api://90867b7a-144e-4c72-9b6b-eaa714547bc2/access_as_user",
        "User.Read",
    ],
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
