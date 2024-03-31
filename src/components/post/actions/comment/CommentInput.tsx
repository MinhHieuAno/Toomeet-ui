"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import TextArea from "@/components/ui/text-area";
import { useToast } from "@/components/ui/use-toast";
import { usePost } from "@/context/PostProvider";
import api from "@/lib/api";
import { CommentType } from "@/lib/post.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
type Props = {
    parent: string;
    setComments: Dispatch<SetStateAction<CommentType[]>>;
};

const commentSchema = z.object({
    content: z.string().max(1000, { message: "Không thế bình luận quá dài" }),
    parentId: z.string(),
});

const CommentInput = ({ parent, setComments }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            parentId: parent,
        },
    });
    const { post } = usePost();
    const { toast } = useToast();
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            inputRef.current.focus();
        }
    }, []);

    const handleSubmit = async (value: z.infer<typeof commentSchema>) => {
        try {
            setLoading(true);
            const { data } = await api({
                method: "POST",
                url: `/posts/${post.id}/comments`,
                data: value,
            });
            setComments((comments) => [...comments, data]);
            form.setValue("content", "");
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
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="my-3 px-3 w-full flex justify-between items-center  gap-2"
            >
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="w-full ">
                            <FormControl {...field}>
                                <TextArea
                                    ref={inputRef}
                                    placeholder="Nhập bình luận của bạn"
                                    className="max-h-16 w-full py-2"
                                ></TextArea>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button>
                    <SendHorizontal size={20} className="dark:text-white" />
                </Button>
            </form>
        </Form>
    );
};

export default CommentInput;
