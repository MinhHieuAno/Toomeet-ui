"use client";
import AddFriendCard from "@/components/card/AddFriendCard";
import FriendCardLoading from "@/components/card/FriendCardLoading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { Page } from "@/lib/common.type";
import { Friend } from "@/lib/friend.utils";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

const FriendSuggestion = (props: Props) => {
    const [friends, setFriends] = useState<Friend[]>([]);

    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const { toast } = useToast();

    const first = useRef<boolean>(true);

    useEffect(() => {
        if (!first.current) return;
        (async () => {
            await fetch();
        })();
        first.current = false;
    }, []);

    const fetch = async () => {
        try {
            const response = await api("/users/suggestions", {
                params: {
                    p: page.index + 1,
                    l: 8,
                },
            });
            const data = response.data;
            setFriends((friends) => [...friends, ...data.content]);
            setPage({
                last: data.last,
                index: data.number,
                numberOfElements: data.numberOfElements,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        } catch (error: any) {
            toast({
                title: "Lỗi",
                description: error,
            });
            console.log(error);
        }
    };

    const removeCard = (id: number) => {
        setFriends((friends) => friends.filter((friend) => friend.id !== id));
    };

    return (
        <div className="w-full h-full ">
            {/* {!loading && friends?.length <= 0 && (
                <div className="w-full h-full flex justify-center items-center flex-col">
                    <h3 className="text-lg">Không có đề xuất nào</h3>
                </div>
            )} */}
            <InfiniteScroll
                className="w-full h-full grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-2"
                dataLength={friends.length}
                next={fetch}
                hasMore={!page.last}
                loader={new Array(8).fill(0).map((_, index) => (
                    <FriendCardLoading key={index} />
                ))}
            >
                {friends.map((friend, index) => (
                    <AddFriendCard
                        onDelete={() => removeCard(friend.id)}
                        key={index}
                        data={friend}
                    ></AddFriendCard>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default FriendSuggestion;
