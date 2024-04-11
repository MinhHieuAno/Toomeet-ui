"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Friend } from "@/lib/friend.utils";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

type Props = {
    friend: Friend;
    onSuccess?: () => void;
    onError?: (message: string) => void;
    requestId: number;
} & ButtonProps;

const ButtonAcceptFriend = ({
    friend,
    onSuccess,
    onError,
    requestId,
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
                type: "ACCEPTED",
            });

            console.log(response);

            onSuccess?.();
            toast({
                title: "Kết bạn thành công.",
                description: response.data,
            });
        } catch (error) {
            console.log(error);
            let message = "";
            if (typeof error === "string") message = error;
            else message = "Đã có lỗi xảy ra";
            toast({
                variant: "destructive",
                title: "Kết bạn thất bại.",
                description: message,
            });
            onError?.(message);
        }
        setLoading(false);
    };

    return (
        <Button {...props} disabled={loading} onClick={handleAcceptFriend}>
            {children}
        </Button>
    );
};

export default ButtonAcceptFriend;
