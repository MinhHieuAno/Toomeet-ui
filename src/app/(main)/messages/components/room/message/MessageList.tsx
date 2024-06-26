"use client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { useChatRoom } from "@/context/ChatRoomProvider";
import { useSocket } from "@/context/SocketProvider";
import api from "@/lib/api";
import { MessageType } from "@/lib/chat.utils";
import { Page } from "@/lib/common.type";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./Message";

type Props = { className?: string };

const MessageList = ({ className }: Props) => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [unReadMessages, setUnreadMessages] = useState<MessageType[]>([]);
    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });
    const { toast } = useToast();
    const { account } = useAuth();
    const { getConnection } = useSocket();
    const frist = useRef<boolean>(true);
    const { room, setting } = useChatRoom();

    useEffect(() => {
        if (!frist.current || !room) return;
        (async () => {
            await fetch();
        })();
        frist.current = false;
    }, [room]);

    useEffect(() => {
        const client = getConnection();
        if (!client || !client.connected || !account || !account.user) return;
        const sub = client.subscribe(`/messages/${room?.id}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setUnreadMessages((messages) => [...messages, newMessage]);
        });
        return () => sub.unsubscribe();
    }, [account, room?.id]);

    const fetch = async () => {
        try {
            const response = await api("/chats/messages", {
                params: {
                    p: page.index + 1,
                    l: 12,
                    r: room?.id,
                },
            });
            const data = response.data;

            setMessages((messages) => [...messages, ...data.content]);
            setPage({
                last: data.last,
                index: data.number,
                numberOfElements: data.numberOfElements,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        } catch (error) {
            toast({
                title: "Lỗi: ",
                description: JSON.stringify(error),
            });
            console.log(error);
        }
    };

    return (
        <div
            id={`message-list-${room?.id}`}
            className={cn(
                className,
                "relative h-[300px] overflow-y-auto custom-scroll flex flex-col-reverse"
            )}
        >
            {!frist.current && messages.length === 0 && (
                <div className="abs-center text-center text-muted-foreground font-medium">
                    Hãy bắt đầu cuộc trò chuyện
                </div>
            )}
            <div className="p-4 md:p-5  gap-2 md:gap-5 flex flex-col">
                {unReadMessages.map((message, index) => (
                    <Message
                        canScrollIntoView
                        key={index}
                        data={message}
                        isOwner={message.senderId === account?.user.id}
                    ></Message>
                ))}
            </div>

            <InfiniteScroll
                dataLength={messages.length}
                next={fetch}
                hasMore={!page.last}
                loader={
                    <div className=" w-full flex justify-center">
                        <span
                            style={{
                                borderColor: setting?.color,
                            }}
                            className="w-8 h-8 border-2 border-primary !border-t-transparent animate-spin rounded-full"
                        ></span>
                    </div>
                }
                className="p-4 md:p-5 gap-2 md:gap-5 flex flex-col-reverse"
                scrollableTarget={`message-list-${room?.id}`}
                inverse
            >
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        data={message}
                        isOwner={message.senderId === account?.user.id}
                    ></Message>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default MessageList;
