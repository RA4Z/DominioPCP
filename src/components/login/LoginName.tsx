import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

export const LoginName = () => {
    const { instance } = useMsal();
    const [name, setName] = useState<string | null>(null);

    const activeAccount = instance.getActiveAccount();
    useEffect(() => {
        if (activeAccount && activeAccount.name) {
            setName(activeAccount.name.split(" ")[0]);
        } else {
            setName(null);
        }
    }, [activeAccount]);

    if (name) {
        return <p>{name}</p>;
    } else {
        return null;
    }
};
