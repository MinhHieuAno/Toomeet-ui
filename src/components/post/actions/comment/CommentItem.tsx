"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentType } from "@/lib/post.utils";
import { cn, getUsername } from "@/lib/utils";
import moment from "moment";
import CommentReaction from "./CommentReaction";
import CommentList from "./CommentList";
import { useState } from "react";
import { useComment } from "@/context/CommentProvider";

type Props = {
    data: CommentType;
    isChildren?: boolean;
};

const CommentItem = ({ data, isChildren }: Props) => {
    const [showReply, setShowReply] = useState<boolean>(false);
    const { setReplyComment } = useComment();

    return (
        <div>
            <div className="relative flex justify-start items-start gap-2">
                <span className="absolute top-10 left-[19px] w-[20px] border-l-4 rounded-bl-md h-[60%] "></span>
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
                <div className="">
                    <div className="max-w-[80%] p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text w-max">
                        <h5 className="text-muted-foreground font-semibold text-xs">
                            {data.author.name}
                        </h5>
                        <p className="max-w-full line-clamp-4 text-pretty text-sm md:text-base">
                            {data.content}
                        </p>
                    </div>
                    <div className="flex justify-start items-center gap-2 text-sm text-slate-700 dark:text-slate-400 font-medium mt-1">
                        <span className="text-xs">
                            {moment(data.createdAt).format("HH:mm")}
                        </span>
                        <CommentReaction comment={data}></CommentReaction>

                        <span
                            onClick={() => {
                                setShowReply(true);
                                setReplyComment(data);
                            }}
                            className="hover:underline hover:text-primary transition-all cursor-pointer"
                        >
                            phản hồi
                        </span>
                    </div>
                </div>
            </div>
            {data.replyCount > 0 && (
                <div className="pl-8">
                    <span
                        onClick={() => setShowReply((show) => !show)}
                        className="hover:underline hover:text-primary text-sm transition-all cursor-pointer"
                    >
                        {showReply
                            ? `ẩn ${data.replyCount} bình luận`
                            : `xem thêm ${data.replyCount} bình luận`}
                    </span>
                    {showReply && (
                        <CommentList
                            parent={data.id}
                            numberOfComment={data.replyCount}
                        ></CommentList>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
