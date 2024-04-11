import React from "react";
import { Card, CardDecoration } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type Props = {};

const FriendCardLoading = (props: Props) => {
    return (
        <Card className="w-full h-full">
            <CardDecoration></CardDecoration>
            <div className="p-5 pt-0 flex flex-col gap-5">
                <div className="flex gap-3">
                    <Skeleton className="w-32 h-32 aspect-square"></Skeleton>
                    <div className="w-full space-y-3">
                        <Skeleton className="w-full h-5"></Skeleton>
                        <Skeleton className="w-full h-5"></Skeleton>
                        <Skeleton className="w-full h-5"></Skeleton>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <Skeleton className="w-full h-10"></Skeleton>
                    <Skeleton className="w-full h-10"></Skeleton>
                </div>
            </div>
        </Card>
    );
};

export default FriendCardLoading;
