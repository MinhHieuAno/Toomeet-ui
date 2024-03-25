import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const ChatItemLoading = (props: Props) => {
    return (
        <div className="px-5 py-4 w-full flex justify-start items-center gap-2">
            <div>
                <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
            </div>
            <div className="w-full space-y-3">
                <Skeleton className="w-[80%] h-5"></Skeleton>
                <Skeleton className="w-[50%] h-5"></Skeleton>
            </div>
        </div>
    );
};

export default ChatItemLoading;
