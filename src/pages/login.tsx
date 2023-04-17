import Link from "next/link";

import { SignInSignOutButton } from "@/components/login/SignInSignOutButton";
import { LoginName } from "@/components/login/LoginName";
import { LinkButton } from "@/components/common/buttons/Button";

export default function LoginPage() {
    return (
        <main>
            <p>Login Page</p>
            <Link href="/">
                <LinkButton text="Home" color="blue" />
            </Link>
            <LoginName />
            <SignInSignOutButton />
        </main>
    );
}
