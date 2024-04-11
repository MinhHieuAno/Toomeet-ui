"use client";
import React, { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { resetPasswordSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/components/ui/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type Props = {
    resetToken: string;
};

const ResetPasswordForm = ({ resetToken }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (value: z.infer<typeof resetPasswordSchema>) => {
        try {
            setLoading(true);
            const { data } = await api({
                method: "POST",
                url: "/auth/reset-password",
                data: {
                    password: value.password,
                    resetToken: resetToken,
                },
            });
            toast({
                title: "Đặt lại mật khẩu thành công",
                description: data,
            });
            router.replace("/auth/login");
        } catch (error: any) {
            toast({
                title: "Đặt lại mật khẩu thất bại",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl {...field}>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Xác nhận mật khẩu</FormLabel>
                            <FormControl {...field}>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <Button disabled={loading} className="md:w-auto w-full">
                    {loading ? "Đang xử lý" : "Xác nhận"}
                </Button>
            </form>
        </Form>
    );
};

export default ResetPasswordForm;
