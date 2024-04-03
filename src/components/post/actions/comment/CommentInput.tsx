"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import TextArea from "@/components/ui/text-area";
import { useToast } from "@/components/ui/use-toast";
import { useComment } from "@/context/CommentProvider";
import { usePost } from "@/context/PostProvider";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
type Props = {};

const commentSchema = z.object({
    content: z
        .string()
        .max(1000, { message: "Không thế bình luận quá dài" })
        .min(1, { message: "Vui lòng nhập bình luận" }),
    parentId: z.string(),
});

const CommentInput = ({}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { post } = usePost();
    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            parentId: post.id,
        },
    });
    const { toast } = useToast();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { replyComment, setReplyComment } = useComment();

    useEffect(() => {
        if (replyComment === null) return;
        form.setValue("parentId", replyComment.id);
        if (inputRef.current) {
            containerRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            inputRef.current.focus();
        }
    }, [replyComment]);

    // useEffect(() => {
    //     const resizeEvent = () => {
    //         containerRef.current?.scrollIntoView({
    //             behavior: "smooth",
    //             block: "start",
    //         });
    //     };
    //     window.addEventListener("resize", resizeEvent);
    //     return () => window.removeEventListener("resize", resizeEvent);
    // }, []);

    const handleSubmit = async (value: z.infer<typeof commentSchema>) => {
        try {
            setLoading(true);
            let url = `/posts/${post.id}/comments`;
            if (replyComment && value.parentId) url += "/reply";
            await api({
                method: "POST",
                url,
                data: value,
            });
            form.setValue("content", "");
            setReplyComment(null);
        } catch (error) {
            console.log(error);
            toast({
                title: "",
                description: "",
            });
        }

        setLoading(false);
    };

    return (
        <Form {...form}>
            {replyComment && (
                <div
                    ref={containerRef}
                    className="flex flex-col justify-start  items-start relative transition-all bg-white bg-opacity-80 backdrop:blur-md"
                >
                    <span
                        onClick={() => setReplyComment(null)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full cursor-pointer shadow-slate-500"
                    >
                        <X size={16}></X>
                    </span>
                    <p className="font-semibold text-base">
                        {replyComment.author.name}
                    </p>
                    <p className=" line-clamp-1 max-w-full text-sm text-muted-foreground">
                        {replyComment.content}
                    </p>
                </div>
            )}
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="my-3 w-full flex justify-between items-center  gap-2"
            >
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="w-full h-full flex justify-start items-center">
                            <FormControl {...field}>
                                <TextArea
                                    disabled={loading}
                                    ref={inputRef}
                                    placeholder="Nhập bình luận của bạn"
                                    className="max-h-24 h-full w-full py-2"
                                ></TextArea>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button disabled={loading}>
                    <SendHorizontal size={20} className="dark:text-white" />
                </Button>
            </form>
        </Form>
    );
};

export default CommentInput;
