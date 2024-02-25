"use client";
import api from "@/lib/api";
import React, {
    Dispatch,
    useContext,
    useEffect,
    useState,
    useTransition,
} from "react";
import Cookies from "js-cookie";

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
            avatar: string | null;
            background: string | null;
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
    logout: () => void;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, startFetchUser] = useTransition();

    useEffect(() => {
        startFetchUser(() => {
            auth().then((data) => setAccount(data));
        });
    }, []);

    const saveAuth = (auth: {
        account: Account;
        expireIn: number;
        token: string;
        tokenType: string;
    }) => {
        sessionStorage.setItem("account", JSON.stringify(auth.account));
        localStorage.setItem("token-type", JSON.stringify(auth.tokenType));

        Cookies.set("access_token", auth.token, {
            expires: auth.expireIn,
        });
        setAccount(auth.account);
    };

    const logout = () => {
        Cookies.remove("access_token");
        setAccount(null);
        sessionStorage.clear();
        localStorage.clear();
    };

    const values = { account, saveAuth, logout, loading };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

const auth = async (): Promise<Account | null> => {
    const userStorage = sessionStorage.getItem("account");

    const token = Cookies.get("access_token");

    if (!token) {
        sessionStorage.clear();
        return null;
    }

    try {
        if (userStorage) {
            return JSON.parse(userStorage);
        }
    } catch (error) {
        console.log({ error });
    }

    try {
        const reponse = await api("/users/info");
        const data = reponse.data;
        console.log({ data });

        const mockData: Account = {
            accountId: "1234",
            email: "hieu@gmail.com",
            user: {
                id: 1,
                name: "Minh Hieu",
                profile: {
                    avatar: null,
                    background: null,
                    description: null,
                    dateOfBirth: "2008-01-31T17:00:00.000+00:00",
                    gender: "MALE",
                },
                createdAt: "2008-01-31T17:00:00.000+00:00",
                updatedAt: "2008-01-31T17:00:00.000+00:00",
            },
        };

        localStorage.setItem("user", JSON.stringify(mockData));

        return mockData;
    } catch (error: any) {
        console.log({ error });
        return null;
    }
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export { useAuth, AuthProvider };
