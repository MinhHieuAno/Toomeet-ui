"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { PostGroup, PostGroupStatus } from "@/lib/post.utils";
import { MoreHorizontal } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
    disable?: boolean;
    groupId: string;
    post: PostGroup;
    setPost: Dispatch<SetStateAction<PostGroup>>;
};

const ManagePostAction = ({ groupId, disable, post, setPost }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();

    const handleAccept = async () => {
        setLoading(true);
        try {
            await api(`/group/${post.postId}`, {
                method: "POST",
                params: {
                    groupId: groupId,
                },
            });
            setPost((post) => ({ ...post, status: PostGroupStatus.ACCEPTED }));
        } catch (error: any) {
            toast({
                title: "Duyệt bài viết thất bại",
                description: error,
            });
        }
        setLoading(false);
    };
    const handleDelete = async () => {
        setLoading(true);
        try {
            const { data } = await api("/posts/groupPost", {
                method: "DELETE",
                params: {
                    postId: post.postId,
                    groupId: groupId,
                },
            });

            toast({
                title: "Thành công",
                description: data,
            });
            setPost((post) => ({ ...post, status: PostGroupStatus.DELETED }));
        } catch (error: any) {
            toast({
                title: "Xóa bài viết thất bại",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={disable}>
                <Button disabled={disable} size="icon" variant="secondary">
                    <MoreHorizontal size={20}></MoreHorizontal>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem>Xem bài viết</DropdownMenuItem>
                {post.status === PostGroupStatus.PENDING && (
                    <DropdownMenuItem onClick={handleAccept} disabled={loading}>
                        Duyệt bài viết
                    </DropdownMenuItem>
                )}
                {
                    <DropdownMenuItem onClick={handleDelete} disabled={loading}>
                        Xóa bài
                    </DropdownMenuItem>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ManagePostAction;
