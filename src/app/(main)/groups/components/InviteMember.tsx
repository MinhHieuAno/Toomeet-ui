"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGroup } from "@/context/GroupProvider";
import React, { useState } from "react";
import ChooseMember from "../../messages/components/ChooseMember";
import { Friend } from "@/lib/friend.utils";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

type Props = {};

const inviteMemberSchema = z.object({
    members: z
        .array(z.any())
        .max(50, "Mỗi thành viên chỉ có thể thêm tối đa 50 người"),
});

const InviteMember = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { group } = useGroup();
    const form = useForm<z.infer<typeof inviteMemberSchema>>({
        resolver: zodResolver(inviteMemberSchema),
    });

    const onSubmit = async (value: z.infer<typeof inviteMemberSchema>) => {
        console.log({ value });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Mời</Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="members"
                            control={form.control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Mời bạn bè</FormLabel>
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

export default InviteMember;
