"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import * as z from "zod";
import { emailSchema, forgotPasswordSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import api from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Link from "next/link";

type Props = {};

const ForgotPasswordForm = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | undefined>();
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const { toast } = useToast();

    const onSubmit = async (value: z.infer<typeof forgotPasswordSchema>) => {
        setLoading(true);
        try {
            const { data } = await api({
                method: "POST",
                url: "/auth/forgot-password",
                data: value,
            });
            setSuccessMessage(data);
        } catch (error: any) {
            form.setError("email", {
                message: error,
            });
            toast({
                title: "Lỗi",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <Form {...form}>
            {successMessage && (
                <Alert>
                    <AlertTitle>Gửi thành công</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Địa chỉ email đã đăng ký</FormLabel>
                            <FormControl {...field}>
                                <Input
                                    placeholder="abc@gmail.com"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <div className="flex justify-end mt-3">
                    <Link
                        href="/auth/login"
                        className="text-sm text-primary underline font-medium"
                    >
                        Đăng nhập
                    </Link>
                </div>
                <Button
                    disabled={loading}
                    type="submit"
                    className="md:w-auto w-full mt-5"
                >
                    {loading ? "Đang xử lý" : "Xác nhận"}
                </Button>
            </form>
        </Form>
    );
};

export default ForgotPasswordForm;
