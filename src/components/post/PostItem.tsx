"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Button } from "@/components/ui/button";
import Gallery from "@/components/ui/gallery";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommentProvider } from "@/context/CommentProvider";
import { usePost } from "@/context/PostProvider";
import { getPrivacyData } from "@/lib/post.utils";
import { cn, getUsername } from "@/lib/utils";
import {
    BellRing,
    Bookmark,
    MessageSquareWarning,
    MoreHorizontal,
} from "lucide-react";
import moment from "moment";
import { FC, useState } from "react";
import OriginPostItem from "./OriginPostItem";
import PostAction from "./actions/PostAction";
import CommentInput from "./actions/comment/CommentInput";
import CommentList from "./actions/comment/CommentList";
import ToggleContent from "./ToggleContent";

type Props = {};
moment.locale("vi");
const PostItem: FC<Props> = ({}: Props) => {
    const { post, originPost, showComment } = usePost();

    return (
        <Card className="my-5 mx-2 p-5">
            <div className="flex justify-between items-start">
                <div className="flex items-center justify-center gap-2">
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Avatar className="cursor-pointer ">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback>
                                    {getUsername(post.author.avatar)}
                                </AvatarFallback>
                            </Avatar>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-60">
                            <div className="flex justify-start space-x-4">
                                <Avatar>
                                    <AvatarImage src={post.author.avatar} />
                                    <AvatarFallback>
                                        {getUsername(post.author.avatar)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">
                                        {post.author.name}
                                    </h4>
                                    <div className="mt-6 grid grid-cols-2 gap-2">
                                        <Button size="sm">Theo dõi</Button>
                                        <Button variant="secondary" size="sm">
                                            Báo cáo
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                    <div className="flex flex-col justify-center items-start">
                        <h4 className="text-base md:text-lg line-clamp-2 max-w-full font-medium">
                            {post.author.name}

                            {post.originPost && (
                                <>
                                    <span className="text-sm">
                                        {" "}
                                        đã chia sẻ bài viết của{" "}
                                    </span>
                                    {post.originPost?.author.name}
                                </>
                            )}
                        </h4>
                        <div className="flex justify-start items-center gap-2">
                            <p className="text-xs text-muted-foreground">
                                {moment(post.createdAt).fromNow()}
                            </p>
                            {getPrivacyData(post.privacy, ({ Icon, label }) => (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Icon className="w-3 h-3 font-semibold"></Icon>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-slate-100 text-black dark:bg-slate-800 dark:text-slate-100">
                                            <p>{label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Bookmark className="w-4 h-4" />
                                <span className="mx-4"> Lưu bài viết</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <BellRing className="w-4 h-4" />
                                <span className="mx-4"> Nhận thông báo</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator></DropdownMenuSeparator>
                            <DropdownMenuItem>
                                <MessageSquareWarning className="w-4 h-4" />
                                <span className="mx-4">
                                    Báo cáo bài viết này
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </div>
            <CardContent className="my-3">
                {post.content !== null && (
                    <ToggleContent content={post.content} />
                )}

                {originPost && (
                    <div className="p-5 border">
                        <OriginPostItem {...originPost}></OriginPostItem>
                    </div>
                )}

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
            </CardContent>
            <CommentProvider>
                <PostAction></PostAction>
                {showComment && (
                    <div className="mt-2">
                        <Separator></Separator>
                        {post.commentCount > 0 ? (
                            <CommentList></CommentList>
                        ) : (
                            <div className="h-[30svh] w-full flex justify-center items-center text-muted-foreground text-sm md:text-base">
                                Hãy là người đầu tiên bình luận bài viết này
                            </div>
                        )}

                        <CommentInput></CommentInput>
                    </div>
                )}
            </CommentProvider>
        </Card>
    );
};

export default PostItem;
