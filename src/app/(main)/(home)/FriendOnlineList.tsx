"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useDebounce from "@/hooks/useDebounce";
import api from "@/lib/api";
import { Friend } from "@/lib/friend.utils";
import { cn, getUsername, toLowerCaseNonAccentVietnamese } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {};

const FriendOnlineList = (props: Props) => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Friend[]>([]);
    const searchValue = useDebounce(searchText);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await api(
                    "http://localhost:8082/users/friends/online"
                );
                const data = response.data;
                setFriends(() => data.content);
            } catch (error) {
                console.log("Load friend online failed:::" + error);
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResults([]);
            return;
        }

        handleSearch(searchValue);
    }, [searchValue]);

    const handleSearch = (text: string) => {
        const results: Friend[] = friends.filter((friend) =>
            toLowerCaseNonAccentVietnamese(friend.name).includes(
                toLowerCaseNonAccentVietnamese(text)
            )
        );
        setSearchResults(results);
    };

    return (
        <div className="w-full">
            <div className="mb-5">
                <Input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="tìm kiếm"
                ></Input>
            </div>

            {searchResults.length > 0 && (
                <>
                    <div>
                        <h4 className="text-sm text-muted-foreground">
                            kết quả:
                        </h4>
                        {searchResults.map((friend, index) => {
                            return (
                                <FriendOnlineItem
                                    key={index}
                                    friend={friend}
                                ></FriendOnlineItem>
                            );
                        })}
                    </div>
                    <Separator></Separator>
                </>
            )}

            <div>
                {loading && <>đang tải</>}
                {!loading &&
                    friends.map((friend, index) => {
                        return (
                            <FriendOnlineItem
                                key={index}
                                friend={friend}
                            ></FriendOnlineItem>
                        );
                    })}
            </div>
        </div>
    );
};

const FriendOnlineItem = ({ friend }: { friend: Friend }) => {
    return (
        <Link
            href="/"
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full h-full flex justify-start items-center gap-5 "
            )}
        >
            <div className="relative">
                <Avatar className=" w-10 h-10 avatar-online">
                    <AvatarImage
                        src={friend.profile.avatar?.url || undefined}
                    ></AvatarImage>
                    <AvatarFallback>
                        {getUsername(friend.name)[0]}
                    </AvatarFallback>
                </Avatar>
                <span className="absolute -right-0 -bottom-0 w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                <span className="absolute -right-0 -bottom-0 w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <p className="text-lg text-ellipsis text-nowrap overflow-hidden w-[200px]">
                {friend.name}
            </p>
        </Link>
    );
};

export default FriendOnlineList;
