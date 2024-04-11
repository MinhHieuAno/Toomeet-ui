import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import ChatSearch from "./ChatSearch";
import { Separator } from "@/components/ui/separator";
import ChatList from "./ChatList";

type Props = {};

const ChatSidebar = (props: Props) => {
    return (
        <Card className="col-span-2 ">
            <div className="px-4 py-2 md:px-5 md:py-4">
                <div className="w-full flex justify-between items-center ">
                    <h1 className="text-2xl font-semibold text-muted-foreground">
                        Trò chuyện
                    </h1>
                    <div className="flex justify-end items-center gap-1">
                        <Link
                            href="/messages/new"
                            className={cn(buttonVariants({ variant: "link" }))}
                        >
                            Tạo nhóm
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-muted-foreground"
                                >
                                    <Settings></Settings>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="min-w-44">
                                <DropdownMenuLabel>Cài đặt</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Tham gia</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <ChatSearch></ChatSearch>
            </div>
            <Separator></Separator>
            <ChatList></ChatList>
        </Card>
    );
};

export default ChatSidebar;
