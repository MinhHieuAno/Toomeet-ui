"use client";
import api from "@/lib/api";
import { RoomType } from "@/lib/chat.utils";
import { Page } from "@/lib/common.type";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useToast } from "@/components/ui/use-toast";
import ChatItem from "./ChatItem";
import ChatItemLoading from "./ChatItemLoading";
import { useViewport } from "@/context/ViewportProvider";

type Props = {};

const ChatList = ({}: Props) => {
    const [chats, setChats] = useState<RoomType[]>([]);
    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const { viewport } = useViewport();
    const first = useRef<boolean>(true);

    const { toast } = useToast();

    useEffect(() => {
        if (!first.current) return;
        (async () => {
            await fetch();
        })();
        first.current = false;
    }, []);

    const fetch = async () => {
        try {
            const { data } = await api("/chats/rooms", {
                params: {
                    p: page.index + 1,
                    l: 15,
                },
            });

            setChats((chats) => [...chats, ...data.content]);
            setPage({
                last: data.last,
                index: data.number,
                numberOfElements: data.numberOfElements,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        } catch (error: any) {
            toast({
                title: "Tải tin nhắn thất bại",
                description: error,
            });
            console.log(error);
        }
    };

    return (
        <div
            className="mt-3 w-full h-[calc(100svh-222px)] xl:h-[70svh] overflow-y-auto custom-scroll "
            id="chat-list-wrapper"
        >
            <InfiniteScroll
                className="w-full h-full"
                dataLength={chats.length}
                next={fetch}
                hasMore={!page.last}
                loader={new Array(3).fill(0).map((_, index) => (
                    <ChatItemLoading key={index} />
                ))}
                scrollableTarget="chat-list-wrapper"
            >
                {chats.map((chat, index) => (
                    <ChatItem room={chat} key={chat.id} {...chat} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default ChatList;
