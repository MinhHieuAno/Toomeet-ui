"use client";
import React, { ReactNode } from "react";
import * as z from "zod";
import InputExtendItem from "./InputExtendItem";
import { ImagePlus } from "lucide-react";
import { ImageListType } from "react-images-uploading";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { useChatRoom } from "@/context/ChatRoomProvider";
import FormData from "form-data";
import InputImage from "@/components/input/InputImage";

type Props = {};

const SendMessageImage = ({}: Props) => {
    const { toast } = useToast();
    const { room } = useChatRoom();

    const handleSendImage = async (images: ImageListType) => {
        if (!images[0]) return;
        try {
            const formData = new FormData();
            formData.append("image", images[0].file);

            await api({
                method: "POST",
                url: "/chats/messages/image",
                params: {
                    r: room?.id,
                },
                data: formData,
            });
            toast({
                title: "Thành công",
                description: "Ảnh đã được lưu trên đám mây",
            });
        } catch (error: any) {
            toast({
                title: "Gửi ảnh thất bại",
                description: error,
            });
        }
    };

    return (
        <InputImage onSave={handleSendImage} multiple={false}>
            <div className="w-full flex justify-start items-center gap-2 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer">
                <ImagePlus className="w-5 h-5 text-green-500" />
                <p>Hình ảnh</p>
            </div>
        </InputImage>
    );
};

export default SendMessageImage;
