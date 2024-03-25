"use client";
import React from "react";
import CreatePostActionButton from "./CreatePostActionButton";
import { cn, getUsername } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, MapPin, SmilePlus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    className?: string;
};

const CreatePostTrigger = ({ className }: Props) => {
    const { account } = useAuth();

    return (
        <Card className={cn("p-5", className)}>
            <div className="flex justify-start items-center gap-2 md:gap-5 mb-5">
                <Avatar className="w-10 h-10 md:w-14 md:h-14">
                    <AvatarImage
                        loading={"lazy"}
                        src={account?.user?.profile?.avatar?.url || undefined}
                    ></AvatarImage>
                    <AvatarFallback>
                        {account && getUsername(account.user.name)[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="text-slate-600 px-5 py-2 flex-1 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 rounded-md outline-primary border border-transparent text-sm md:text-lg">
                    {account ? `${getUsername(account.user.name)} ơi, ` : ""}{" "}
                    bạn đang nghĩ gì thế?
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <CreatePostActionButton
                        title={`Hình ảnh`}
                        onClick={() => {}}
                    >
                        <ImagePlus className="w-5 h-5 text-blue-500" />
                    </CreatePostActionButton>
                    <CreatePostActionButton title="Cảm xúc" onClick={() => {}}>
                        <SmilePlus className="w-5 h-5 text-yellow-500" />
                    </CreatePostActionButton>
                    <CreatePostActionButton title="Gắn thẻ" onClick={() => {}}>
                        <Tag className="w-5 h-5 text-green-500" />
                    </CreatePostActionButton>
                    <CreatePostActionButton title="Vị trí" onClick={() => {}}>
                        <MapPin className="w-5 h-5 text-red-500" />
                    </CreatePostActionButton>
                </div>
                <Button>Đăng</Button>
            </div>
        </Card>
    );
};

export default CreatePostTrigger;
