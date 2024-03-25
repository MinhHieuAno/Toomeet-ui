"use client";

import { cn, getUsername } from "@/lib/utils";
import { MoreHorizontalIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { MessageType, RoomType } from "@/lib/chat.utils";
import { FC, useEffect, useState } from "react";
import api from "@/lib/api";
import { Skeleton } from "../ui/skeleton";
import moment from "moment";
import { useSocket } from "@/context/SocketProvider";
import { useAuth } from "@/context/AuthProvider";

type Props = {
    className?: string;
    room: RoomType;
};

const ChatItem = ({ className, room: data }: Props) => {
    const [room, setRoom] = useState<RoomType>(() => data);
    const [loading, setLoading] = useState<boolean>(false);
    const [latestMessage, setLatestMessage] = useState<MessageType | null>(
        null
    );

    const { client } = useSocket();
    const { account } = useAuth();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await api(`/chats/messages/${room.id}/latest`);
                setLatestMessage(data);
            } catch (error: any) {
                console.log(`Load lasted message error::: ${error}`);
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (!client || !client.connected || !account || !account.user) return;
        client.subscribe(`/messages/${room.id}`, (message) => {
            const newMessage = JSON.parse(message.body);
            console.log("newMessage = " + JSON.stringify(newMessage));
        });

        client.subscribe(`/chat-room/${room.id}`, (message) => {
            const updatedRoom = JSON.parse(message.body);
            setRoom((room) => ({
                ...room,
                name: updatedRoom.name,
                avatar: updatedRoom.avatar,
            }));
        });

        return () => {
            client.unsubscribe(`/messages/${room.id}`);
        };
    }, [client, client?.connected, account, room.id]);

    return (
        <Link
            href={`/messages/${room.id}`}
            className={cn(
                "group relative flex justify-start items-start gap-2 w-full max-w-full px-5 py-4 hover:bg-slate-100/50 dark:hover:bg-slate-900 transition-colors  cursor-pointer ",
                className
            )}
        >
            <div className="hidden group-hover:flex absolute top-[5%] right-[3%]">
                <div className="flex w-full h-full !p-2">
                    <MoreHorizontalIcon size={20}></MoreHorizontalIcon>
                </div>
            </div>
            <div className="relative">
                <Avatar className="relative w-12 h-12">
                    <AvatarImage src={room.avatar}></AvatarImage>
                    <AvatarFallback>{getUsername(room.name)[0]}</AvatarFallback>
                </Avatar>
                <span className="w-3 h-3 bottom-0 right-0 rounded-full bg-green-500 absolute animate-ping"></span>
                <span className="w-3 h-3 bottom-0 right-0 rounded-full bg-green-500 absolute"></span>
            </div>
            <div className="flex-1 w-full flex flex-col justify-center items-start">
                <h4 className="font-semibold text-lg">{room.name}</h4>
                {loading && <Skeleton className="w-8 h-3"></Skeleton>}
                {!loading &&
                    (latestMessage ? (
                        <LatestdMessage
                            message={latestMessage}
                        ></LatestdMessage>
                    ) : (
                        <p className="text-sm text-red-500">
                            tải tin nhắn thất bại
                        </p>
                    ))}
            </div>
        </Link>
    );
};

type LatestdMessageProps = {
    message: MessageType;
};

const LatestdMessage: FC<LatestdMessageProps> = ({ message }) => {
    if (message.text)
        return (
            <p className="text-sm text-muted-foreground">
                {message.senderName}:
                {message.text
                    ? message.text
                    : message.icon
                    ? "Icon"
                    : message.image
                    ? "Hình ảnh"
                    : ""}
                {moment(message.timestamp).toNow()}
            </p>
        );
};

export default ChatItem;
