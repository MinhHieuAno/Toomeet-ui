import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn, getUsername } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ChevronLeft, Info } from "lucide-react";
import React from "react";
import ChatAction from "./ChatAction";
import { useChatRoom } from "@/context/ChatRoomProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useViewport } from "@/context/ViewportProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";

type Props = { className?: string };

const RoomHeader = ({ className }: Props) => {
    const { room, loading } = useChatRoom();
    const { viewport } = useViewport();
    const router = useRouter();

    return (
        <div
            className={cn(
                "border-b flex justify-between items-center px-5 py-2",
                className
            )}
        >
            <div className="h-full flex justify-start items-center gap-2">
                {viewport === "mobile" && (
                    <ButtonBack
                        backUrl="/messages/dashboard"
                        variant="ghost"
                        size="icon"
                    >
                        <ChevronLeft />
                    </ButtonBack>
                )}
                <Avatar>
                    <AvatarImage src={room?.avatar} />
                    <AvatarFallback>
                        {getUsername(room?.name || "")}
                    </AvatarFallback>
                </Avatar>
                <div className="h-full flex flex-col justify-center items-start">
                    {room?.name && !loading ? (
                        <h4 className="text-nowrap line-clamp-1 text-ellipsis max-w-[150px]">
                            {room?.name}
                        </h4>
                    ) : (
                        <Skeleton className="w-32 md:w-48 h-5"></Skeleton>
                    )}
                    <div className="px-4 relative">
                        <span className="absolute top-[50%] -translate-y-[50%] left-0 bg-green-500 w-2 h-2 rounded-full"></span>
                        <p className="text-sm text-muted-foreground">
                            Đang hoạt động
                        </p>
                    </div>
                </div>
            </div>
            <ChatAction></ChatAction>
        </div>
    );
};

export default RoomHeader;
