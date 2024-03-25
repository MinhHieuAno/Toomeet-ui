"use client";
import ChatList from "@/components/chat/ChatList";
import ChatSearch from "@/components/chat/ChatSearch";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarBlock from "@/components/sidebar/SidebarBlock";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useSocket } from "@/context/SocketProvider";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    const { connect, disconnect } = useSocket();

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, []);

    return (
        <>
            <Sidebar className="col-start-1 col-end-3">
                <SidebarBlock fullScreen className="">
                    <div className="px-5 py-4">
                        <div className="w-full flex justify-between items-center ">
                            <h1 className="text-2xl font-semibold text-muted-foreground">
                                Trò chuyện
                            </h1>
                            <div className="flex justify-end items-center gap-1">
                                <Link
                                    href="/messages/new"
                                    className={cn(
                                        buttonVariants({ variant: "link" })
                                    )}
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
                                        <DropdownMenuLabel>
                                            Cài đặt
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            Tham gia
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <ChatSearch></ChatSearch>
                    </div>
                    <Separator></Separator>
                    <ChatList></ChatList>
                </SidebarBlock>
            </Sidebar>
            <Card className="my-2 col-start-3 col-end-9">{children}</Card>
        </>
    );
};

export default layout;
