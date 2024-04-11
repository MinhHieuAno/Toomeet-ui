"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useChatRoom } from "@/context/ChatRoomProvider";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

const LeaveRoom = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { room } = useChatRoom();
    const { toast } = useToast();

    const router = useRouter();

    const handleLeaveRoom = async () => {
        try {
            setLoading(true);
            await api({
                method: "DELETE",
                url: `/chats/rooms/${room?.id}/leave`,
            });
            router.replace("/messages/dashboard");
            window.location.reload();
        } catch (error: any) {
            toast({
                title: "Lỗi",
                description: error,
            });
        }
        setLoading(false);
    };
    return (
        <Button
            onClick={handleLeaveRoom}
            disabled={loading}
            variant="ghost"
            className="w-full bg-destructive/20 hover:bg-destructive/20 text-destructive font-semibold hover:text-destructive"
        >
            {loading ? "Đang rời nhóm" : " Rời nhóm"}
        </Button>
    );
};

export default LeaveRoom;
