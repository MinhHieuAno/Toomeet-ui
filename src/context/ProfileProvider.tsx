"use client";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { ProfilePublic } from "@/lib/profile.utils";
import { useRouter, notFound } from "next/navigation";
import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAuth } from "./AuthProvider";

type ProfileProviderProps = {
    children: React.ReactNode;
    profileId: number;
};

interface IProfileContext {
    profile: ProfilePublic | undefined;
    loading: boolean;
    isCurrentUser: boolean;
}

const ProfileContext = React.createContext<IProfileContext | null>(null);

const ProfileProvider: React.FC<ProfileProviderProps> = ({
    children,
    profileId,
}) => {
    const [profile, setProfile] = useState<ProfilePublic | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

    const { toast } = useToast();
    const router = useRouter();
    const { account } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await api(`/users/profile/${profileId}`);
                setProfile(data);
            } catch (error: any) {
                toast({
                    title: "Tải thông tin nhóm thất bại",
                    description: error,
                });
                router.replace("/");
            }
            setLoading(false);
        })();
    }, [profileId]);

    useEffect(() => {
        if (!profile || !profile.id || !account || !account.user) return;

        if (profile.id === account.user.id) {
            setIsCurrentUser(true);
        }
    }, [profile?.id, account?.user]);

    const values = { profile, loading, isCurrentUser };

    return (
        <ProfileContext.Provider value={values}>
            {children}
        </ProfileContext.Provider>
    );
};

const useProfile = () => {
    const context = useContext(ProfileContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useProfile must be used within ProfileProvider");
    }
    return context;
};

export { ProfileProvider, useProfile };
