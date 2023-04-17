import { LinkButton } from "@/components/common/buttons/Button";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <p>Home Page</p>
            <Link href="/">
                <LinkButton text="Home" color="blue" />
            </Link>
            <Link href="/login">
                <LinkButton text="Login" color="red" />
            </Link>
            <Link href="/profile">
                <LinkButton text="Profile" color="green" />
            </Link>
        </main>
    );
}
