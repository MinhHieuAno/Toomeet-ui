"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import api from "@/lib/api";
import { cn, getUsername } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
    token: string;
    roomName: string;
    roomAvatar: string;
    roomId: string;
};

const JoinRoomCard = ({ token, roomAvatar, roomName, roomId }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();
    const handeJoinRoom = async () => {
        try {
            setLoading(true);
            const { data } = await api({
                method: "POST",
                url: `/chats/rooms/${roomId}/join`,
                data: {
                    token,
                },
            });
            toast({
                title: "Thành công",
                description: data,
            });
            router.replace(`/messages/room/${roomId}`);
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Tham gia thất bại",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <MaxWidthWrapper className="flex justify-center items-center col-span-full">
            <Card className="max-w-[100svw]">
                <CardHeader>
                    <CardTitle className="text-xl text-center">
                        Lời mời tham gia cuộc trò chuyện
                    </CardTitle>
                    <div className="flex justify-center items-center gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src={roomAvatar || undefined}
                            ></AvatarImage>
                            <AvatarFallback>
                                {getUsername(roomName)[0]}
                            </AvatarFallback>
                        </Avatar>
                        <h2 className="text-lg font-semibold">{roomName}</h2>
                    </div>
                    <div className="flex justify-center items-center">
                        <iframe
                            className=" xl:w-[400px] xl:h-[200px]"
                            src="https://lottie.host/embed/a580cbcd-31e1-498b-9657-ec539fc4c3bc/KP4Zkmtvxg.json"
                        ></iframe>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-between items-center gap-2">
                    <Link
                        href={"/messages/dashboard"}
                        className={cn(
                            "flex-1",
                            buttonVariants({ variant: "secondary" })
                        )}
                    >
                        Hủy
                    </Link>
                    <Button
                        disabled={loading}
                        onClick={handeJoinRoom}
                        className="flex-1"
                    >
                        {!loading ? "Tham gia" : "Đang xử lý"}
                    </Button>
                </CardFooter>
            </Card>
        </MaxWidthWrapper>
    );
};

export default JoinRoomCard;
