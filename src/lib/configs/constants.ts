export const APP_VERSION = 1.001;
export const APP_NAME = "Boilerplate";

export const AZURE_CLIENT_ID =
    process.env.NEXT_PUBLIC_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID || "";
export const AZURE_TENANT =
    process.env.NEXT_PUBLIC_AZURE_ACTIVE_DIRECTORY_TENANT || "";
export const AZURE_REDIRECT_URI =
    process.env.NEXT_PUBLIC_AZURE_REDIRECT_URI || "";

export const GRAPHQL_API_URI = process.env.NEXT_PUBLIC_GRAPHQL_API_URI || "";
export const GRAPHQL_API_URI_DEV =
    process.env.NEXT_PUBLIC_GRAPHQL_API_URI_DEV || "";
export const HASURA_SECRET = process.env.NEXT_PUBLIC_HASURA_SECRET || "";
