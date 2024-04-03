import React from "react";
import { Skeleton } from "../../../ui/skeleton";

type Props = {};

const CommentItemLoading = (props: Props) => {
    return (
        <div className="px-3 py-2 w-full flex justify-start items-center gap-2">
            <div>
                <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
            </div>
            <div className="w-full space-y-2">
                <Skeleton className="w-[80%] h-5"></Skeleton>
                <Skeleton className="w-[50%] h-5"></Skeleton>
            </div>
        </div>
    );
};

export default CommentItemLoading;
