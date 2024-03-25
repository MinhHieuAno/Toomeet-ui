"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentType } from "@/lib/post.utils";
import { cn, getUsername } from "@/lib/utils";
import moment from "moment";
import CommentReaction from "./CommentReaction";
import CommentList from "./CommentList";
import { useState } from "react";

type Props = {
    data: CommentType;
    isChildren?: boolean;
};

const CommentItem = ({ data, isChildren }: Props) => {
    const [showReply, setShowReply] = useState<boolean>(false);

    return (
        <div>
            <div className="relative flex justify-start items-start gap-2">
                <span className="absolute top-10 left-[19px] w-[20px] border-l-4 rounded-bl-2xl h-[60%] "></span>
                <Avatar
                    className={cn({
                        "w-6 h-6": isChildren,
                    })}
                >
                    <AvatarImage src={data.author.avatar}></AvatarImage>
                    <AvatarFallback>
                        {getUsername(data.author.name)[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text w-max">
                        <h5 className="text-muted-foreground font-semibold text-xs">
                            {data.author.name}
                        </h5>
                        <p>{data.content}</p>
                    </div>
                    <div className="flex justify-start items-center gap-2 text-sm text-slate-700 dark:text-slate-400 font-medium mt-1">
                        <span className="text-xs">
                            {moment(data.createAt).format("HH:MM")}
                        </span>
                        <CommentReaction comment={data}></CommentReaction>

                        <span
                            onClick={() => setShowReply(true)}
                            className="hover:underline hover:text-primary transition-all cursor-pointer"
                        >
                            phản hồi
                        </span>
                        <span
                            onClick={() => setShowReply((prev) => !prev)}
                            className="hover:underline hover:text-primary transition-all cursor-pointer"
                        >
                            {showReply ? "ẩn" : "xem thêm"}
                        </span>
                    </div>
                </div>
            </div>
            {showReply && (
                <div className="pl-8">
                    <CommentList parent={data.id}></CommentList>
                </div>
            )}
        </div>
    );
};

export default CommentItem;
