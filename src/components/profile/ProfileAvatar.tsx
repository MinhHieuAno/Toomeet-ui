"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import InputImage from "../input/InputImage";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

type Props = {};

const ProfileAvatar = (props: Props) => {
    const { account } = useAuth();
    return (
        <div className="relative group">
            <Avatar className="mt-4 h-[120px] w-[120px] md:h-[150px] md:w-[150px] xl:h-[180px] xl:w-[180px] md:border-[6px] border-[4px] border-white dark:border-slate-900 m-2">
                <AvatarImage
                    src={account?.user?.profile?.avatar?.url}
                ></AvatarImage>
                <AvatarFallback>Minh Hieu</AvatarFallback>
            </Avatar>
            <InputImage onSave={() => {}} multiple={false}>
                <Button
                    size="icon"
                    variant="secondary"
                    className="abs-center group-hover:flex hidden transition-all"
                >
                    <Edit></Edit>
                </Button>
            </InputImage>
        </div>
    );
};

export default ProfileAvatar;
