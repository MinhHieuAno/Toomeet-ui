"use client";
import { Friend } from "@/lib/friend.utils";
import React, { ReactNode } from "react";
import { Card, CardDecoration } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUsername } from "@/lib/utils";

type Props = {
    data: Friend;
    children?: ReactNode;
};

const FriendCard = ({ data, children }: Props) => {
    return (
        <Card className="w-full h-full relative group overflow-hidden">
            <CardDecoration></CardDecoration>
            <div className="flex flex-col p-5 pt-0">
                <div className="flex justify-start items-start gap-2">
                    <div className="w-32 h-32 flex-shrink-0 aspect-square">
                        <Avatar className="w-full h-full rounded-none">
                            <AvatarImage
                                src={data.profile.avatar?.url}
                            ></AvatarImage>
                            {/* <img src={data.profile.avatar?.url} alt="" /> */}
                            <AvatarFallback>
                                {getUsername(data.name)[0]}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className=" font-semibold text-pretty line-clamp-2 max-w-[90%] text-ellipsis min-h-14">
                        {data.name}
                    </div>
                </div>
                <div>
                    <div className=" bg-white dark:bg-slate-900 backdrop-blur-md bg-opacity-80 h-full  group-hover:top-32 w-full transition-all rounded-3xl">
                        {children}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default FriendCard;
