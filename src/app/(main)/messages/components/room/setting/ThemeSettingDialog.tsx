"use client";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/color-picker";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useChatRoom } from "@/context/ChatRoomProvider";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
    children: ReactNode;
};

const themeSettingSchema = z.object({
    color: z.string(),
});

const ThemeSettingDialog = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { setting, room } = useChatRoom();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof themeSettingSchema>>({
        resolver: zodResolver(themeSettingSchema),
        defaultValues: {
            color: setting?.color,
        },
    });

    const onSubmit = async (value: z.infer<typeof themeSettingSchema>) => {
        try {
            setLoading(true);
            await api({
                method: "PATCH",
                url: `/chats/rooms/${room?.id}/update/setting`,
                data: value,
            });

            toast({
                title: "Cập nhật thành công",
                description: `Màu sắc cuộc trò chuyện đã được đổi thành ${value.color}`,
            });
        } catch (error: any) {
            toast({
                title: "Cập nhật thất bại",
                description: JSON.stringify(error),
            });
        }
        setLoading(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cài đặt giao diện</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Màu sắc cuộc trò chuyện:
                                    </FormLabel>
                                    <ColorPicker
                                        value={field.value}
                                        onChange={(color) =>
                                            form.setValue("color", color)
                                        }
                                    />
                                </FormItem>
                            )}
                        />
                        <Button className="mt-6 w-full" disabled={loading}>
                            {loading ? "Đang cập nhật" : "Cập nhật"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ThemeSettingDialog;
