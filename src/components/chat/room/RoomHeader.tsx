import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn, getUsername } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Info } from "lucide-react";
import React from "react";
import ChatAction from "./ChatAction";
import { useChatRoom } from "@/context/ChatRoomProvider";
import { Skeleton } from "@/components/ui/skeleton";

type Props = { className?: string };

const RoomHeader = ({ className }: Props) => {
    const { room, loading } = useChatRoom();

    return (
        <div
            className={cn(
                "border-b flex justify-between items-center px-5 py-2",
                className
            )}
        >
            <div className="h-full flex justify-start items-center gap-2">
                <Avatar>
                    <AvatarImage src={room?.avatar} />
                    <AvatarFallback>
                        {getUsername(room?.name || "")}
                    </AvatarFallback>
                </Avatar>
                <div className="h-full flex flex-col justify-center items-start">
                    {room?.name && !loading ? (
                        <h4>{room?.name}</h4>
                    ) : (
                        <Skeleton className="w-48 h-5"></Skeleton>
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
