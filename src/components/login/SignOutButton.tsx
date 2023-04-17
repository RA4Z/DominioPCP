import { useMsal } from "@azure/msal-react";

export const SignOutButton = () => {
    const { instance } = useMsal();
    const handleLogout = () => {
        // instance.logoutRedirect().catch((e) => {
        //     console.error(`loginPopup failed: ${e}`);
        // });
        instance.logoutRedirect().catch((e) => {
            console.error(`logoutRedirect failed: ${e}`);
        });
    };

    return (
        <div>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    );
};
