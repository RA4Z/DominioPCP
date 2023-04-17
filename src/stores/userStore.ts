import { create } from "zustand";
import { persist } from "zustand/middleware";

import { APP_VERSION } from "@/lib/configs/constants";

export type UserInfoProps = {
    user_id: string;
    user_name: string;
    user_email: string;
    user_roles: string[];
};

const initialUserInfo: UserInfoProps = {
    user_id: "",
    user_name: "",
    user_email: "",
    user_roles: [""],
};

type UserInfoState = {
    userInfo: UserInfoProps;
    setUserInfo: (newState: UserInfoProps) => void;
};

export const useInfoStore = create<UserInfoState>()(
    persist(
        (set, _get) => ({
            // initial state
            userInfo: initialUserInfo,
            // manipulate state
            setUserInfo: (newState) => {
                set((state) => ({
                    ...state,
                    userInfo: newState,
                }));
            },
        }),
        // store name, used for pesisting state in local storage
        {
            name: "UserInfoStore",
            version: APP_VERSION,
        }
    )
);
