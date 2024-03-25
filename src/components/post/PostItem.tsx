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

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Post, getPrivacyData } from "@/lib/post.utils";
import { getUsername } from "@/lib/utils";
import {
    BellRing,
    Bookmark,
    MessageSquareWarning,
    MoreHorizontal,
} from "lucide-react";
import moment from "moment";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import Gallery from "../ui/gallery";
import { Separator } from "../ui/separator";
import PostAction from "./actions/PostAction";
import { usePost } from "@/context/PostProvider";

type Props = {};
moment.locale("vi");
const PostItem: FC<Props> = (props) => {
    const { post } = usePost();
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
                        <h4 className="text-lg md:text-xl font-medium">
                            {post.author.name}
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
                <DropdownMenu>
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
                </DropdownMenu>
            </div>
            <CardContent className="my-3">
                {post.content !== null && (
                    <ToggleContent content={post.content} />
                )}
                {post.images !== null && (
                    <Gallery
                        className="w-full p-2 md:p-8"
                        images={post.images}
                        row={2}
                    ></Gallery>
                )}
            </CardContent>

            <PostAction></PostAction>
        </Card>
    );
};

const ToggleContent = ({
    content,
    maxLength = 200,
}: {
    content: string;
    maxLength?: number;
}) => {
    const [open, setOpen] = useState<boolean>(
        () => content.length <= maxLength
    );

    return (
        <h5 className="text-sm md:text-lg my-4 text-pretty">
            {content.length > 200 ? (
                <>
                    {content.slice(0, open ? content.length : maxLength)}
                    <Button
                        onClick={() => setOpen((open) => !open)}
                        variant="link"
                        size="sm"
                    >
                        {open ? "Ẩn" : "Xem thêm"}
                    </Button>
                </>
            ) : (
                content
            )}
        </h5>
    );
};

export default PostItem;
