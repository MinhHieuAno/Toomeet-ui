"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { accoutSettingSchema } from "@/schema/setting.schema";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthProvider";
import api from "@/lib/api";
type Props = {};

const AccountSettingForm = (props: Props) => {
    const [editName, setEditName] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { account, updateAccount } = useAuth();

    const form = useForm<z.infer<typeof accoutSettingSchema>>({
        resolver: zodResolver(accoutSettingSchema),
        defaultValues: {
            name: account?.user.name || "",
        },
    });

    useEffect(() => {
        if (!account) return;
        form.setValue("name", account.user.name);
    }, [account]);

    const { toast } = useToast();

    const onSubmit = async (value: z.infer<typeof accoutSettingSchema>) => {
        if (!account) return;
        try {
            setLoading(true);
            const { data } = await api({
                method: "PATCH",
                url: "/users/update/name",
                data: {
                    name: value.name,
                },
            });
            updateAccount({
                ...account,
                user: { ...account.user, name: data },
            });
            form.setValue("name", data);
            setEditName(false);
        } catch (error: any) {
            toast({
                title: "Cập nhật thất bại",
                description: error,
            });
        }

        setLoading(false);
    };

    const handleCancel = () => {
        form.setValue("name", "minhhieu");
        setEditName(false);
        form.clearErrors();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormControl {...field}>
                                <div className="flex justify-start items-center gap-2 w-full">
                                    <Input
                                        readOnly={!editName}
                                        {...field}
                                    ></Input>
                                    {!editName && (
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            onClick={() => {
                                                setEditName(true);
                                                form.setFocus("name");
                                            }}
                                        >
                                            <Edit size={20}></Edit>
                                        </Button>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                {editName && (
                    <div className="my-3 flex justify-end items-center gap-2">
                        <Button
                            disabled={loading}
                            onClick={handleCancel}
                            type="button"
                            variant="secondary"
                        >
                            Hủy
                        </Button>
                        <Button disabled={loading} type="submit">
                            {loading ? "Đang lưu" : "Lưu"}
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    );
};

export default AccountSettingForm;
