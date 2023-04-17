import { loginRequest } from "@/lib/configs/authConfig";
import { useMsal } from "@azure/msal-react";

export const SignInButton = () => {
    const { instance } = useMsal();
    const handleLogin = (loginType: string) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch((e) => {
                console.error(`loginPopup failed: ${e}`);
            });
        }
        if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch((e) => {
                console.error(`loginRedirect failed: ${e}`);
            });
        }
    };

    return (
        <div className="flex flex-col">
            <button onClick={() => handleLogin("popup")}>
                Sign In with Popup
            </button>
            <button onClick={() => handleLogin("redirect")}>
                Sign In with Redirect
            </button>
        </div>
    );
};
