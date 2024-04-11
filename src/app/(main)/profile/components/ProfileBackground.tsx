"use client";
import { useProfile } from "@/context/ProfileProvider";
import { Edit } from "lucide-react";
import InputImage from "@/components/input/InputImage";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ImageListType } from "react-images-uploading";
import { useAuth } from "@/context/AuthProvider";
import FormData from "form-data";
import api from "@/lib/api";

type Props = {};

const ProfileBackground = (props: Props) => {
    const { profile, isCurrentUser, loading } = useProfile();
    const [background, setBackground] = useState<string>("");
    const { account, updateAccount } = useAuth();

    const { toast } = useToast();

    useEffect(() => {
        if (!profile || !profile.background) return;
        setBackground(profile.background);
    }, [profile]);

    const handleUpdateBackground = async (images: ImageListType) => {
        if (!account) return;
        try {
            const avatar = images[0];
            if (!avatar) return;
            const formData = new FormData();
            formData.append("background", avatar.file || null);
            const { data } = await api({
                method: "PATCH",
                url: "/users/update/background",
                data: formData,
            });
            setBackground(data.url);
            updateAccount({
                ...account,
                user: {
                    ...account.user,
                    profile: {
                        ...account.user.profile,
                        background: data,
                    },
                },
            });
            toast({
                title: "Thành công",
                description: "Ảnh bìa đã được cập nhật",
            });
        } catch (error: any) {
            toast({
                title: "Cập nhật ảnh bìa thất bại",
                description: error,
            });
        }
    };

    return (
        <div className="relative w-full h-[240px] md:h-[300px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
            {!loading && (
                <div className="abs-center w-full h-full bg-black/50"></div>
            )}
            {!loading && (
                <img
                    className="w-full h-full object-cover rounded-[inherit]"
                    src={background}
                    alt="background"
                />
            )}
            {loading && <Skeleton className="w-full h-full"></Skeleton>}
            {isCurrentUser && (
                <div className="absolute bottom-5 right-5">
                    <InputImage
                        onSave={handleUpdateBackground}
                        multiple={false}
                    >
                        <Button variant="secondary" size="icon">
                            <Edit></Edit>
                        </Button>
                    </InputImage>
                </div>
            )}
        </div>
    );
};

export default ProfileBackground;
