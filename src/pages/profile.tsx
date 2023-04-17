import Link from "next/link";
import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
} from "@azure/msal-react";

import { graphConfig, loginRequest } from "@/lib/configs/authConfig";
import { LinkButton } from "@/components/common/buttons/Button";
import { useGraphApi } from "@/lib/msGraph/msGraph";
import { useMsalToken } from "@/lib/auth/msal";

const ProfileContent = () => {
    const token = useMsalToken("userToken", loginRequest);

    const { loading, error, data } = useGraphApi(
        token || "",
        graphConfig.graphMeEndpoint
    );

    if (loading) {
        return <LoadingComponent />;
    }
    if (error) {
        return <ErrorComponent />;
    }

    return (
        <div>
            <pre>{data ? JSON.stringify(data, null, 3) : null}</pre>
            {/* <pre>{token}</pre> */}
        </div>
    );
};

const ErrorComponent = () => {
    return <span>Error</span>;
};
const LoadingComponent = () => {
    return <span>Loading</span>;
};

export default function ProfilePage() {
    return (
        <>
            <AuthenticatedTemplate>
                <p>Profile Page</p>
                <Link href="/">
                    <LinkButton text="Home" color="blue" />
                </Link>
                <ProfileContent />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Link href="/">
                    <LinkButton text="Home" color="blue" />
                </Link>
                <p>No users are signed in!</p>
            </UnauthenticatedTemplate>
        </>
    );
}
