"use client";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import React, { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ChooseMember from "../../ChooseMember";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useChatRoom } from "@/context/ChatRoomProvider";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    children: ReactNode;
};

const addMemberSchema = z.object({
    members: z
        .array(z.any())
        .min(1, "Không có thành viên nào được thêm.")
        .max(50, "Mỗi thành viên chỉ có thể thêm tối đa 50 người"),
});

const AddMemberDialog = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof addMemberSchema>>({
        resolver: zodResolver(addMemberSchema),
        defaultValues: { members: [] },
    });

    const { room } = useChatRoom();
    const { toast } = useToast();

    const onSubmit = async (value: z.infer<typeof addMemberSchema>) => {
        try {
            setLoading(true);
            await api({
                method: "POST",
                url: `/chats/rooms/${room?.id}/add-member`,
                data: {
                    members: value.members.map((member) => member.id),
                },
            });
            toast({
                title: "Thành công",
                description: "Thêm thành viên thành công",
            });
        } catch (e: any) {
            toast({
                title: "Lỗi",
                description: e,
            });
        }
        setLoading(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm Thành viên</DialogTitle>
                    <DialogDescription>
                        Mời những người khác vào cuộc trò chuyện
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="members"
                            control={form.control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thêm thành viên</FormLabel>
                                    <FormControl {...field}>
                                        <ChooseMember
                                            members={field.value}
                                            onChange={(members) => {
                                                form.setValue(
                                                    "members",
                                                    members
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={loading}
                            className="w-full"
                            type="submit"
                        >
                            {loading ? "Đang xử lý" : "Xác nhận"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberDialog;
