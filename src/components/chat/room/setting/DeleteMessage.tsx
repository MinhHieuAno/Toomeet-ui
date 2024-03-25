import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useChatRoom } from "@/context/ChatRoomProvider";
import api from "@/lib/api";
import { Trash } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const DeleteMessage = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { room } = useChatRoom();
    const { toast } = useToast();

    const handleDeleteMessage = async () => {
        try {
            setLoading(true);
            await api.delete(`/chats/${room?.id}/members/delete-message`);
            toast({
                title: "Đã xóa tất cả tin nhắn",
            });
            window.location.reload();
        } catch (error) {
            toast({
                title: "Không thể xóa tin nhắn trong cuộc trò chuyện này",
                description: JSON.stringify(error),
            });
        }
        setLoading(false);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={loading}
                    variant="ghost"
                    className="w-full gap-2 hover:bg-transparent !text-destructive font-semibold "
                >
                    <Trash size={20} />
                    {loading ? "Đang xóa tin nhắn" : " Xóa tin nhắn"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Bạn muốn xóa tất cả tin nhắn ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ xóa tất cả tin nhắn trong cuộc trò
                        chuyện này ở phía bạn, tuy nhiên những thành viên khác
                        trong cuộc trò chuyện vẫn có thể thấy được tin nhắn.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            onClick={handleDeleteMessage}
                            disabled={loading}
                            variant="destructive"
                            className="!bg-destructive"
                        >
                            {loading ? "Đang xóa" : "Xóa"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteMessage;
