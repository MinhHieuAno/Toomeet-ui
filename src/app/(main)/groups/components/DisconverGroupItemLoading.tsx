import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const DisconverGroupItemLoading = (props: Props) => {
    return (
        <Card className="">
            <div className="w-full h-52 rounded-[inherit] overflow-hidden">
                <Skeleton className="w-full h-full"></Skeleton>
            </div>
            <div className="p-5 space-y-4">
                <div className="min-h-20 space-y-2">
                    <Skeleton className="w-full h-5"></Skeleton>
                    <Skeleton className="w-[80%] h-5"></Skeleton>
                </div>
            </div>
        </Card>
    );
};

export default DisconverGroupItemLoading;
