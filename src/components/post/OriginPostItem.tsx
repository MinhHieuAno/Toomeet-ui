"use client";
import { OriginPost } from "@/lib/post.utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, getUsername } from "@/lib/utils";
import moment from "moment";
import ToggleContent from "./ToggleContent";
import Gallery from "../ui/gallery";

type Props = OriginPost;

const OriginPostItem = (post: Props) => {
    return (
        <div>
            <div className="flex justify-start gap-2">
                <Avatar className="w-6 h-6">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>
                        {getUsername(post.author.avatar)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center items-start">
                    <h4 className="text-sm md:text-base line-clamp-1 max-w-full font-medium">
                        {post.author.name}
                    </h4>
                    <div className="flex justify-start items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                            {moment(post.createdAt).fromNow()}
                        </p>
                    </div>
                </div>
            </div>
            {post.content !== null && <ToggleContent content={post.content} />}
            {post.images !== null && (
                <div
                    className={cn(
                        "flex justify-center items-center  overflow-hidden",
                        {
                            ["h-auto max-h-[300px] md:max-h-[600px] overflow-hidden"]:
                                post.images.length > 0,
                        }
                    )}
                >
                    <Gallery
                        className=" p-2 md:p-8 w-full h-full"
                        images={post.images}
                        row={2}
                    ></Gallery>
                </div>
            )}
        </div>
    );
};

export default OriginPostItem;
