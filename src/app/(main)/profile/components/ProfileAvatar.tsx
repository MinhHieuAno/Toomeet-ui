"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InputImage from "../../../../components/input/InputImage";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { useProfile } from "@/context/ProfileProvider";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { ImageListType } from "react-images-uploading";
import FormData from "form-data";

type Props = {};

const ProfileAvatar = (props: Props) => {
    const { profile, isCurrentUser } = useProfile();
    const { account, updateAccount } = useAuth();
    const [avatar, setAvatar] = useState<string>("");

    const { toast } = useToast();

    useEffect(() => {
        if (!profile || !profile.avatar) return;
        setAvatar(profile.avatar);
    }, [profile]);

    const handleUpdateAvatar = async (images: ImageListType) => {
        if (!account) return;
        try {
            const avatar = images[0];
            if (!avatar) return;
            const formData = new FormData();
            formData.append("avatar", avatar.file || null);
            const { data } = await api({
                method: "PATCH",
                url: "/users/update/avatar",
                data: formData,
            });
            setAvatar(data.url);
            updateAccount({
                ...account,
                user: {
                    ...account.user,
                    profile: {
                        ...account.user.profile,
                        avatar: data,
                    },
                },
            });
            toast({
                title: "Thành công",
                description: "Ảnh đại diện đã được cập nhật",
            });
        } catch (error: any) {
            toast({
                title: "Cập nhật ảnh đại diện thất bại",
                description: error,
            });
        }
    };

    return (
        <div className="relative group">
            <Avatar className="mt-4 h-[120px] w-[120px] md:h-[150px] md:w-[150px] xl:h-[180px] xl:w-[180px] md:border-[6px] border-[4px] border-white dark:border-slate-900 bg-white dark:bg-slate-900 m-2">
                <AvatarImage src={avatar}></AvatarImage>
                <AvatarFallback>{profile?.name}</AvatarFallback>
            </Avatar>
            {isCurrentUser && (
                <InputImage onSave={handleUpdateAvatar} multiple={false}>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="abs-center group-hover:flex hidden transition-all"
                    >
                        <Edit></Edit>
                    </Button>
                </InputImage>
            )}
        </div>
    );
};

export default ProfileAvatar;
