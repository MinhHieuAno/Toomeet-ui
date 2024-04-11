"use client";
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FormData from "form-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useAuth } from "@/context/AuthProvider";
import api from "@/lib/api";
import { PostPrivacy } from "@/lib/post.utils";
import { getUsername } from "@/lib/utils";
import { createPostSchema } from "@/schema/createPost.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageListType, ImageType } from "react-images-uploading";
import * as z from "zod";
import TextArea from "@/components/ui/text-area";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import CreatePostAction from "../post/create/CreatePostAction";

type Props = {
    url?: string;
};

const CreatePostFrom = ({ url }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { account } = useAuth();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createPostSchema>>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            privacy: PostPrivacy.PUBLIC,
        },
    });

    const onSubmit = async (value: z.infer<typeof createPostSchema>) => {
        const formData = new FormData();

        formData.append("content", value.content || null);
        formData.append("privacy", value.privacy as any);

        const images: ImageListType = value.images;
        if (images && images.length) {
            images.forEach((image: ImageType) => {
                formData.append("images", image.file || null);
            });
        }

        try {
            setLoading(true);

            // await Promise.all(
            //     new Array(20).fill(0).map(async () => {
            //         return api({
            //             url: "/posts",
            //             method: "POST",
            //             data: formData,
            //         });
            //     })
            // );

            await api({
                url: url || "/posts",
                method: "POST",
                data: formData,
            });
            form.reset({ content: "", images: undefined });
            toast({
                title: "Đăng bài thành công",
                description: "Chúc bạn một ngày vui vẻ.",
            });
        } catch (error) {
            console.log({ error });
            toast({
                title: "Lỗi",
                description: "Đăng bài thất bại.",
            });
        }
        setLoading(false);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start w-[90svw] md:w-[600px]  h-full"
            >
                <div className="flex justify-between items-start gap-5 md:p-3">
                    <DialogHeader>
                        <DialogTitle>Tạo bài viết</DialogTitle>
                        <DialogDescription className="hidden md:block">
                            Tạo và chia sẻ khoảnh khắc với bạn bè
                        </DialogDescription>
                    </DialogHeader>
                    {/* privacy */}
                    <FormField
                        control={form.control}
                        name="privacy"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl {...field}>
                                    <Select
                                        onValueChange={(value) =>
                                            form.setValue("privacy", +value)
                                        }
                                        {...field}
                                        value={field.value.toString()}
                                    >
                                        <SelectTrigger
                                            defaultChecked
                                            className="w-[100px] md:w-[180px] text-sm"
                                        >
                                            <SelectValue placeholder="Phạm vi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                value={PostPrivacy.PUBLIC.toString()}
                                                defaultChecked
                                            >
                                                Công khai
                                            </SelectItem>
                                            <SelectItem
                                                value={PostPrivacy.PRIVATE.toString()}
                                            >
                                                Riêng tư
                                            </SelectItem>
                                            <SelectItem
                                                value={PostPrivacy.FRIEND.toString()}
                                            >
                                                Bạn bè
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between items-start gap-2 w-full">
                    <div className="flex-1 flex justify-start gap-3">
                        <Avatar className="hidden w-8 h-8 md:w-10 md:h-10">
                            <AvatarImage
                                loading={"lazy"}
                                src={
                                    account?.user?.profile?.avatar?.url ||
                                    undefined
                                }
                            ></AvatarImage>
                            <AvatarFallback>
                                {account && getUsername(account.user.name)[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="w-full max-h-100 space-y-5">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl {...field}>
                                            <TextArea
                                                autoFocus
                                                className="max-w-[90svw] min-h-[150px] md:min-h-[200px] max-h-[500px] md:max-h-[600px] py-5 placeholder:text-lg text-lg "
                                                placeholder={
                                                    account
                                                        ? ` ${getUsername(
                                                              account.user.name
                                                          )} ơi, bạn đang nghĩ gì thế?`
                                                        : "Bạn đang nghĩ gì thế?"
                                                }
                                                {...field}
                                            ></TextArea>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />

                            <CreatePostAction form={form}></CreatePostAction>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Đang xử lý" : "Đăng"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default CreatePostFrom;
