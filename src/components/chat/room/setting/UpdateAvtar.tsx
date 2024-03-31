"use client";
import InputImage from "@/components/input/InputImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useChatRoom } from "@/context/ChatRoomProvider";
import api from "@/lib/api";
import { RoomType } from "@/lib/chat.utils";
import { getUsername } from "@/lib/utils";
import FormData from "form-data";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import { ImageListType } from "react-images-uploading";

type Props = {};

const UpdateAvtar = (props: Props) => {
    const { room } = useChatRoom();
    const { toast } = useToast();

    const handleUpdateAvatar = async (images: ImageListType) => {
        try {
            const avatar = images[0];
            if (!avatar) return;
            const formData = new FormData();

            formData.append("avatar", avatar.file || null);

            const { data } = await api({
                method: "PATCH",
                url: `/chats/rooms/${room?.id}/update/avatar`,
                data: formData,
            });
            toast({
                title: " Thành công: ",
                description: "Ảnh đại diện đã được cập nhật.",
            });
        } catch (error: any) {
            toast({
                title: " Lỗi: ",
                description: error,
            });
        }
    };

    return (
        <div className="relative">
            <Avatar className="relative mx-auto w-24 h-24 lg:w-28 lg:h-28">
                <AvatarImage src={room?.avatar || undefined}></AvatarImage>
                <AvatarFallback>
                    {getUsername(room?.name || "")?.[0]}
                </AvatarFallback>
            </Avatar>
            <InputImage onSave={handleUpdateAvatar} multiple={false}>
                <Button className="abs-center text-white" variant="ghost">
                    <Edit></Edit>
                </Button>
            </InputImage>
        </div>
    );
};

export default UpdateAvtar;
