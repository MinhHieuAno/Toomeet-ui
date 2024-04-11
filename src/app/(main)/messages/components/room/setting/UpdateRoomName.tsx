"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useChatRoom } from "@/context/ChatRoomProvider";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const updateRoomNameSchema = z.object({
    name: z.string(),
});

type Props = {};

const UpdateRoomName = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const { room } = useChatRoom();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateRoomNameSchema>>({
        resolver: zodResolver(updateRoomNameSchema),
        defaultValues: {
            name: room?.name,
        },
    });

    const onSubmit = async ({
        name: newName,
    }: z.infer<typeof updateRoomNameSchema>) => {
        if (!newName.trim() || newName === room?.name) {
            setOpen(false);
        }

        try {
            setLoading(true);
            await api({
                method: "PATCH",
                url: `/chats/rooms/${room?.id}/update/name`,
                data: {
                    newName,
                },
            });
            setOpen(false);
        } catch (error: any) {
            toast({
                title: "Lỗi:",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-start items-center gap-2">
            <h3 className="text-xl font-semibold text-center line-clamp-1 text-nowrap max-w-[200px]">
                {room?.name}
            </h3>
            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                <DialogTrigger>
                    <Button disabled={loading} size="icon" variant="ghost">
                        <Edit size={20} />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cập nhật tên phòng</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl {...field}>
                                            <Input
                                                className="py-6"
                                                placeholder="Nhập tên mới "
                                                {...field}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={loading} className="w-full my-8">
                                {loading ? "Đang cập nhật" : "Cập nhật"}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateRoomName;
