"use client";
import api from "@/lib/api";
import { createChatRoomSchema } from "@/schema/chat.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/color-picker";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ChooseMember from "@/app/(main)/messages/components/ChooseMember";
type Props = {};

const CreatChatRoomForm = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const form = useFormContext<z.infer<typeof createChatRoomSchema>>();

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (value: z.infer<typeof createChatRoomSchema>) => {
        try {
            setLoading(true);
            const { data } = await api({
                method: "POST",
                url: "/chats/rooms",
                data: {
                    name: value.name,
                    type: value.type,
                    member: value.members.map((member) => member.id),
                    color: value.color,
                    icon: "LIKE",
                },
            });
            router.push("/messages/room/" + data.id);
        } catch (error: any) {
            toast({
                title: "Lỗi",
                description: error,
            });
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <Form {...form}>
            <form
                className="my-4 space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    name="name"
                    control={form.control}
                    defaultValue={`Nhóm ` + new Date().getTime()}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên nhóm</FormLabel>
                            <FormControl {...field}>
                                <Input {...field} placeholder="Tên nhóm" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="color"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Màu sắc</FormLabel>
                            <FormControl {...field}>
                                <ColorPicker
                                    value={form.getValues("color")}
                                    onChange={(color) =>
                                        form.setValue("color", color)
                                    }
                                ></ColorPicker>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                                        form.setValue("members", members);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} type="submit" className="w-full">
                    {loading ? "Đang tạo nhóm" : "Tạo nhóm"}
                </Button>
            </form>
        </Form>
    );
};

export default CreatChatRoomForm;
