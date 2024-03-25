"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import useDebounce from "@/hooks/useDebounce";
import { useToast } from "../ui/use-toast";
import api from "@/lib/api";
import { RoomType } from "@/lib/chat.utils";
import { ScrollArea } from "../ui/scroll-area";
import ChatItem from "./ChatItem";

type Props = {};

const ChatSearch = (props: Props) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [results, setResults] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const debouceSearchValue = useDebounce(searchValue, 500);

    const { toast } = useToast();

    useEffect(() => {
        if (!debouceSearchValue.trim()) {
            setResults([]);
            return;
        }
        (async () => {
            setLoading(true);
            try {
                const { data } = await api("chats/rooms/search", {
                    params: { keyword: debouceSearchValue },
                });
                setResults(data);
            } catch (error: any) {
                toast({
                    title: "Lỗi",
                    description: error,
                });
            }
            setLoading(false);
        })();
    }, [debouceSearchValue]);

    return (
        <div>
            <div className="my-3">
                <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Tìm kiếm cuộc trò chuyện"
                ></Input>
            </div>
            {results.length > 0 && <Separator></Separator>}
            {loading && (
                <div className="h-80 flex justify-center items-center">
                    <div className="w-5 h-5 rounded-full border-[2px] border-primary border-t-transparent animate-spin"></div>
                </div>
            )}
            {results.length > 0 && (
                <ScrollArea className="h-80">
                    {results.map((room) => (
                        <ChatItem key={room.id} room={room}></ChatItem>
                    ))}
                </ScrollArea>
            )}
        </div>
    );
};

export default ChatSearch;
