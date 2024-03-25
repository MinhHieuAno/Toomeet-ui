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
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
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
        // try {
        //     const { data } = await api({
        //         method: "POST",
        //         url: `/posts/${post.id}/comments`,
        //         data: value,
        //     });
        //     console.log({ data });
        // } catch (error) {
        //     console.log(error);
        //     toast({
        //         title: "",
        //         description: "",
        //     });
        // }

        setComments((comments) => [
            ...comments,
            {
                id: crypto.randomUUID(),
                content: value.content,
                level: 0,
                parentId: parent,
                author: {
                    id: 123,
                    avatar: "https://ik.imagekit.io/freeflo/production/24b2bc0e-6d28-4018-8a2d-fa9b34427864.png?tr=w-1920,q-75&alt=media&pr-true",
                    name: "John Doe",
                },
                likeCount: 10,
                reaction: {
                    emoji: 1, // Assuming emoji: 1 represents a thumbs up reaction
                    users: [456, 789],
                },
                replyCount: 2,
                createAt: "2024-03-22T00:00:00.000Z",
                updateAt: null,
            },
        ]);

        form.setValue("content", "");
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
