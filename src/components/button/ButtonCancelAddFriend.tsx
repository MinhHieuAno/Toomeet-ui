"use client";
import React, { useEffect, useState } from "react";
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

const ButtonCancelAddFriend = ({
    onSuccess,
    onError,
    friend,
    children,
    requestId,
    ...props
}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();

    const handleClick = async () => {
        setLoading(true);
        try {
            const response = await api.delete(
                `/users/friends/request/cancel/${requestId}`
            );
            onSuccess?.();
            toast({
                title: "Hủy thành công.",
                description: response.data,
            });
        } catch (error) {
            let message = "";
            if (typeof error === "string") message = error;
            else message = "Đã có lỗi xảy ra";
            toast({
                variant: "destructive",
                title: "Hủy thất bại.",
                description: message,
            });
            onError?.(message);
        }
        setLoading(false);
    };

    return (
        <Button
            disabled={loading}
            onClick={handleClick}
            variant="secondary"
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonCancelAddFriend;
