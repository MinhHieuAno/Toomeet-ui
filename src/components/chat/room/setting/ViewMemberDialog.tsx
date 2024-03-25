"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthProvider";
import { useChatRoom } from "@/context/ChatRoomProvider";
import { ChatMemberType } from "@/lib/chat.utils";
import { getUsername } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const ViewMemberDialog = ({ children }: Props) => {
    const { members } = useChatRoom();

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thành viên</DialogTitle>
                    <DialogDescription>
                        Danh sách các thành viên trong nhóm
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[50svh]">
                    {members.map((member) => (
                        <MemberItem key={member.id} {...member}></MemberItem>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

const MemberItem = (member: ChatMemberType) => {
    const { account } = useAuth();
    return (
        <div className="justify-start px-5 py-4 flex items-center gap-2 w-full hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer">
            <Avatar className="relative">
                <AvatarImage src={member?.avatar || undefined}></AvatarImage>
                <AvatarFallback>
                    {getUsername(member?.name || "")?.[0]}
                </AvatarFallback>
            </Avatar>
            {member.id === account?.user.id ? "Bạn" : member.name}
        </div>
    );
};

export default ViewMemberDialog;
