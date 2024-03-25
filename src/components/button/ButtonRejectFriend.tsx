"use client";
import React, { useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import { Friend } from "@/lib/friend.utils";
import { useToast } from "../ui/use-toast";
import api from "@/lib/api";

type Props = {
    friend: Friend;
    requestId: number;
    onSuccess?: () => void;
    onError?: (message: string) => void;
} & ButtonProps;

const ButtonRejectFriend = ({
    friend,
    requestId,
    onSuccess,
    onError,
    children,
    ...props
}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();

    const handleAcceptFriend = async () => {
        setLoading(true);
        try {
            const response = await api.post("/users/friends/request/reply", {
                requestId,
                type: "REJECTED",
            });

            console.log(response);

            onSuccess?.();
            toast({
                title: `Đã từ chối kết bạn với ${friend.name}`,
                description: response.data,
            });
        } catch (error) {
            console.log(error);
            let message = "";
            if (typeof error === "string") message = error;
            else message = "Đã có lỗi xảy ra";
            toast({
                variant: "destructive",
                title: "Từ chối thất bại.",
                description: message,
            });
            onError?.(message);
        }
        setLoading(false);
    };

    return (
        <Button
            {...props}
            variant="secondary"
            disabled={loading}
            onClick={handleAcceptFriend}
        >
            {children}
        </Button>
    );
};

export default ButtonRejectFriend;
