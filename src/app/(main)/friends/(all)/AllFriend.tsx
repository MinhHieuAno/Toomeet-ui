"use client";
import FriendCard from "@/components/card/FriendCard";
import FriendCardLoading from "@/components/card/FriendCardLoading";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { Page } from "@/lib/common.type";
import { Friend } from "@/lib/friend.utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

const AllFriend = (props: Props) => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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
            setLoading(true);
            await fetch();
            setLoading(false);
        })();
        first.current = false;
    }, []);

    const fetch = async () => {
        try {
            const response = await api("/users/friends", {
                params: {
                    p: page.index + 1,
                    l: 20,
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
        } catch (error) {
            toast({
                title: "Lỗi: ",
                description: JSON.stringify(error),
            });
            console.log(error);
        }
    };

    return (
        <div className="w-full h-full mb-28" id="all-friend-container">
            <InfiniteScroll
                className="w-full h-full grid gap-2 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                dataLength={friends.length}
                next={fetch}
                hasMore={!page.last}
                loader={new Array(8).fill(0).map((_, index) => (
                    <FriendCardLoading key={index} />
                ))}
                scrollableTarget="all-friend-container"
            >
                {friends.map((friend, index) => (
                    <FriendCard key={index} data={friend}>
                        <div className=" w-full grid grid-cols-2 gap-2 mt-5">
                            <Button>Nhắn tin</Button>
                            <Button variant="secondary">Hủy kết bạn</Button>
                        </div>
                    </FriendCard>
                ))}
            </InfiniteScroll>
            {friends?.length <= 0 && !loading && (
                <div className="w-full h-full flex justify-center items-center flex-col">
                    <h3 className="text-lg">
                        Không tìm thấy bạn bè để hiện thị
                    </h3>
                    <Link
                        className={cn(buttonVariants({ variant: "link" }))}
                        href="/friends/suggestions"
                    >
                        Kết bạn ngay
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AllFriend;
