"use client";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import {
    ChatMemberType,
    MessageType,
    RoomSetting,
    RoomType,
} from "@/lib/chat.utils";
import { useRouter } from "next/navigation";
import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { useSocket } from "./SocketProvider";

type ChatRoomProviderProps = {
    children: React.ReactNode;
    roomId: number;
};

interface IChatRoomContext {
    room: RoomType | null;
    members: ChatMemberType[];
    loading: boolean;
    setting: RoomSetting | null;
    reply: MessageType | null;
    setReply: Dispatch<SetStateAction<MessageType | null>>;
}

const ChatRoomContext = React.createContext<IChatRoomContext | null>(null);

const ChatRoomProvider: React.FC<ChatRoomProviderProps> = ({
    children,
    roomId,
}) => {
    const [room, setRoom] = useState<RoomType | null>(null);
    const [setting, setSetting] = useState<RoomSetting | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [members, setMembers] = useState<ChatMemberType[]>([]);
    const [reply, setReply] = useState<MessageType | null>(null);

    const router = useRouter();
    const { toast } = useToast();
    const { client } = useSocket();

    /** LOAD DEFAULT SETTINGS */
    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const getRoomPromise = api(`/chats/rooms/${roomId}`).then(
                    (response) => setRoom(response.data)
                );
                const getRoomSettingPromise = api(
                    `/chats/rooms/settings/${roomId}`
                ).then((response) => setSetting(response.data));
                const getRoomMemberPromise = api(
                    `/chats/${roomId}/members`
                ).then((response) => setMembers(response.data));

                await Promise.all([
                    getRoomPromise,
                    getRoomSettingPromise,
                    getRoomMemberPromise,
                ]);
            } catch (error: any) {
                toast({
                    title: "Lỗi",
                    description: error,
                });
                console.log(error);
                router.replace("/messages");
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (!client?.connected) return;

        client.subscribe(`/chat-room/${room?.id}`, (message) => {
            const updatedRoom = JSON.parse(message.body);
            setRoom((room) => {
                if (room === null) return null;
                return {
                    ...room,
                    avatar: updatedRoom.avatar,
                    name: updatedRoom.name,
                };
            });
            setSetting((setting) => {
                if (setting === null) return null;
                return {
                    ...setting,
                    color: updatedRoom.color,
                    icon: updatedRoom.icon,
                };
            });
        });

        client.subscribe(`/chat-members/${room?.id}`, (message) => {
            const data = JSON.parse(message.body);
            if (!data.member) return;

            let newMembers = members;

            if (data.type === "JOIN") {
                setMembers((members) => [...members, data.member]);
                toast({
                    title: "Thông báo: ",
                    description: `${data?.member?.name} đã tham gia phòng`,
                });
            } else if (data.type === "LEAVE") {
                setMembers((members) =>
                    members.filter((member) => member.id !== data.member.id)
                );
                toast({
                    title: "Thông báo: ",
                    description: `${data?.member?.name} đã rời khỏi phòng`,
                });
            }
        });

        return () => {
            client.unsubscribe(`/chat-room/${room?.id}`);
            client.unsubscribe(`/chat-members/${room?.id}`);
        };
    }, [room?.id, client, client?.connected]);

    const values = {
        room,
        loading,
        setting,
        members,
        reply,
        setReply,
    };

    return (
        <ChatRoomContext.Provider value={values}>
            {children}
        </ChatRoomContext.Provider>
    );
};

const useChatRoom = () => {
    const context = useContext(ChatRoomContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useChatRoom must be used within ChatRoomProvider");
    }
    return context;
};

export { ChatRoomProvider, useChatRoom };
