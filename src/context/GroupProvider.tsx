"use client";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { Group } from "@/lib/group.utils";
import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

type GroupProviderProps = {
    children: React.ReactNode;
    groupId: string;
};

interface IGroupContext {
    group: Group | undefined;
    loading: boolean;
    isAdmin: boolean;
    setGroup: Dispatch<SetStateAction<Group | undefined>>;
}

const GroupContext = React.createContext<IGroupContext | null>(null);

const GroupProvider: React.FC<GroupProviderProps> = ({ children, groupId }) => {
    const [group, setGroup] = useState<Group | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const { toast } = useToast();

    const router = useRouter();

    const { account } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await api(`/group/${groupId}`);
                setGroup(data);
            } catch (error: any) {
                toast({
                    title: "Tải thông tin nhóm thất bại",
                    description: error,
                });
                router.replace("/groups/feed");
            }
            setLoading(false);
        })();
    }, [groupId]);

    useEffect(() => {
        if (!account || !account.user.id || !groupId) return;
        (async () => {
            try {
                setLoading(true);
                const { data } = await api(`/group/checkadmin`, {
                    params: {
                        userId: account.user.id,
                        groupId: groupId,
                    },
                });

                setIsAdmin(!!data.isAdmin);
            } catch (error: any) {
                toast({
                    title: "Tải thông tin nhóm thất bại",
                    description: error,
                });
                router.replace("/groups/feed");
            }
            setLoading(false);
        })();
    }, [groupId, account, account?.user.id]);

    const values = { group, loading, isAdmin, setGroup };

    return (
        <GroupContext.Provider value={values}>{children}</GroupContext.Provider>
    );
};

const useGroup = () => {
    const context = useContext(GroupContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useGroup must be used within GroupProvider");
    }
    return context;
};

export { GroupProvider, useGroup };
