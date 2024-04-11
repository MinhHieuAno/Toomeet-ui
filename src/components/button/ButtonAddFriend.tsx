"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthProvider";
import api from "@/lib/api";
import { Friend } from "@/lib/friend.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ButtonProps } from "react-day-picker";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import TextArea from "@/components/ui/text-area";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
    receiverId: z.number(),
    message: z
        .string({
            required_error: "Vui lòng điền tin nhắn để gửi đến bạn của bạn!",
        })
        .min(5, { message: "Nội dung tin nhắn phải có đồ dài trên 5 kí tự" }),
});

type Props = {
    friend: Friend;
    onSendSucces?: (requestId: number) => void;
    onSendError?: (message: string) => void;
} & ButtonProps;

const ButtonAddFriend = ({
    children,
    friend,
    onSendSucces,
    onSendError,
}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const auth = useAuth();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            message: `Xin chào mình là ${auth?.account?.user.name}. Chúng ta kết bạn nhé!`,
            receiverId: friend.id,
        },
    });

    const handleSubmit = async (value: z.infer<typeof schema>) => {
        setLoading(true);
        try {
            const response = await api.post(
                "/users/friends/request/add",
                value
            );
            onSendSucces?.(response.data.requestId);
            setOpen(false);
            toast({
                title: "Gửi yêu cầu thành công",
                description: response.data.message,
            });
        } catch (error) {
            let message = "";
            if (typeof error === "string") message = error;
            else {
                message = "Đã có lỗi xảy ra";
            }
            onSendError?.(message);
            toast({
                variant: "destructive",
                title: "Gửi yêu cầu thất bại",
                description: message,
            });
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
                <Button className="overflow-hidden" disabled={loading}>
                    {children}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yêu cầu kết bạn</DialogTitle>
                    <DialogDescription>
                        Gửi lời mời kết bạn đến {friend.name}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="my-5">
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className="w-full h-80">
                                        <FormControl {...field}>
                                            <TextArea
                                                placeholder={`Xin chào mình là ${auth?.account?.user.name}. Chúng ta kết bạn nhé!`}
                                                className="w-full h-full max-h-80  text-lg p-5"
                                                {...field}
                                            ></TextArea>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                disabled={loading}
                                variant="secondary"
                                onClick={() => form.reset()}
                            >
                                làm mới
                            </Button>
                            <Button type="submit" disabled={loading}>
                                Gửi
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ButtonAddFriend;
