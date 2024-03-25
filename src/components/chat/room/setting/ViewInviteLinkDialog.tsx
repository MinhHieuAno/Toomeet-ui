"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useChatRoom } from "@/context/ChatRoomProvider";
import api from "@/lib/api";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Copy } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

type Props = {
    children: ReactNode;
};

const ViewInviteLinkDialog = ({ children }: Props) => {
    const [inviteLink, setInviteLink] = useState<string>("");
    const { room } = useChatRoom();
    const { toast } = useToast();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api(
                    `/chats/rooms/${room?.id}/join-token`
                );
                setInviteLink(
                    `${window.location.origin}/messages/join-room?token=${data.token}&room=${room?.id}&avatar=${room?.avatar}&name=${room?.name}`
                );
            } catch (error) {
                toast({
                    title: "Lỗi",
                    description: "Lấy liên kết thất bại",
                });
                console.log(error);
            }
        })();
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Mời thành viên</DialogTitle>
                    <DialogDescription>
                        Chia sẻ liên kết với bạn bè của bạn (Chú ý: liên kết sẽ
                        hết hạn trong 2 ngày.)
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <Input
                        defaultValue={inviteLink}
                        readOnly
                        className="my-6"
                    ></Input>
                    <CopyToClipboard
                        text={inviteLink}
                        onCopy={() => {
                            toast({
                                title: "Thànhh công",
                                description:
                                    "Liên kết tham gia phòng đã được lưu vào bọ nhớ đệm.",
                            });
                        }}
                    >
                        <Button variant="secondary">
                            <Copy />
                        </Button>
                    </CopyToClipboard>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>Đồng ý</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ViewInviteLinkDialog;
