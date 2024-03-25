import React from "react";
import { Card, CardDecoration } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

type Props = {};

const FriendCardLoading = (props: Props) => {
    return (
        <Card className="w-full h-full">
            <CardDecoration></CardDecoration>
            <div className="p-5 pt-0 ">
                <Skeleton className="w-full aspect-square"></Skeleton>
                <Skeleton className="w-full h-5 mt-3"></Skeleton>
                <Skeleton className="w-full h-5 mt-3"></Skeleton>
            </div>
        </Card>
    );
};

export default FriendCardLoading;
