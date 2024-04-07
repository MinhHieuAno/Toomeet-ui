"use client";
import api from "@/lib/api";
import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
    useTransition,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type AuthProviderProps = {
    children: React.ReactNode;
};

type Account = {
    accountId: string;
    email: string;
    user: {
        id: number;
        name: string;
        profile: {
            avatar: {
                url: string;
                format: string;
            } | null;
            background: { url: string; format: string } | null;
            description: string | null;
            dateOfBirth: string;
            gender: "FEMALE" | "MALE" | "ORTHER";
        };
        createdAt: string;
        updatedAt: string;
    };
};

interface IAuthContext {
    account: Account | null;
    loading: boolean;
    saveAuth: (auth: {
        account: Account;
        expireIn: number;
        token: string;
        tokenType: string;
    }) => void;
    updateAccount: (account: Account) => void;
    logout: () => void;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, startFetchUser] = useTransition();

    useEffect(() => {
        startFetchUser(() => {
            auth(logout).then((data) => setAccount(data));
        });
    }, []);

    const router = useRouter();
    const saveAuth = (auth: {
        account: Account;
        expireIn: number;
        token: string;
        tokenType: string;
    }) => {
        sessionStorage.setItem("account", JSON.stringify(auth.account));
        localStorage.setItem("token-type", JSON.stringify(auth.tokenType));

        Cookies.set("access_token", auth.token, {
            expires: new Date(new Date().getTime() + auth.expireIn),
        });
        setAccount(auth.account);
    };

    const logout = () => {
        Cookies.remove("access_token");
        setAccount(null);
        sessionStorage.clear();
        localStorage.clear();
        router.replace("/auth/login");
    };

    const updateAccount = (account: Account) => {
        setAccount(account);
        sessionStorage.setItem("account", JSON.stringify(account));
    };

    const values = { account, saveAuth, logout, loading, updateAccount };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

const auth = async (logout: () => void): Promise<Account | null> => {
    const userStorage = sessionStorage.getItem("account");
    const token = Cookies.get("access_token");

    if (!token) {
        sessionStorage.clear();
        return null;
    }

    if (userStorage) {
        return JSON.parse(userStorage);
    }
    try {
        const account = await getAccount();
        sessionStorage.setItem("account", JSON.stringify(account));
        return account;
    } catch (error: any) {
        logout();
        return null;
    }
};

const getAccount = async (): Promise<Account> => {
    const { data } = await api("/users/account");
    return data;
    // return {
    //     accountId: "1234",
    //     email: "hieu@gmail.com",
    //     user: {
    //         id: 1,
    //         updatedAt: "",
    //         createdAt: "",
    //         name: "Minh Hieu",
    //         profile: {
    //             avatar: {
    //                 format: "PNG",
    //                 url: "https://ik.imagekit.io/freeflo/production/24b2bc0e-6d28-4018-8a2d-fa9b34427864.png?tr=w-1920,q-75&alt=media&pr-true",
    //             },
    //             background: null,
    //             dateOfBirth: new Date().toISOString(),
    //             description: null,
    //             gender: "MALE",
    //         },
    //     },
    // };
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export { useAuth, AuthProvider };
