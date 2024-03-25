"use client";
import { Friend } from "@/lib/friend.utils";
import React, { ReactNode } from "react";
import { Card, CardDecoration } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getUsername } from "@/lib/utils";

type Props = {
    data: Friend;
    children?: ReactNode;
};

const FriendCard = ({ data, children }: Props) => {
    return (
        <Card className="w-full h-full relative group overflow-hidden">
            <CardDecoration></CardDecoration>
            <div className="p-5 pt-0 ">
                <div className="w-full aspect-square">
                    <Avatar className="w-full h-full rounded-none">
                        <img src={data.profile.avatar?.url} alt="" />
                        <AvatarFallback>
                            {getUsername(data.name)[0]}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="mt-5 text-lg font-semibold text-center text-pretty line-clamp-2 max-w-full text-ellipsis min-h-14">
                    {data.name}
                </div>
                <div className=" bg-white dark:bg-slate-900 backdrop-blur-md bg-opacity-80 h-full  group-hover:top-32 w-full transition-all rounded-3xl">
                    {children}
                </div>
            </div>
        </Card>
    );
};

export default FriendCard;
