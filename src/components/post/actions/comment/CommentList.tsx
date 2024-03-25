"use client";
import { useToast } from "@/components/ui/use-toast";
import { usePost } from "@/context/PostProvider";
import api from "@/lib/api";
import { Page } from "@/lib/common.type";
import { CommentType, commentsMock } from "@/lib/post.utils";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

type Props = {
    parent?: string;
};

const CommentList = ({ parent }: Props) => {
    const [comments, setComments] = useState<CommentType[]>([...commentsMock]);
    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const { toast } = useToast();
    const { post } = usePost();

    const frist = useRef<boolean>(true);

    useEffect(() => {
        if (!frist.current) return;
        (async () => {
            await fetch(3);
        })();
        frist.current = false;
    }, []);

    const fetch = async (limit?: number) => {
        try {
            const { data } = await api(`/posts/${post.id}/comments`, {
                params: {
                    page: page.index + 1,
                    limit: limit || 10,
                },
            });
            setComments((comments) => [...comments, ...data.content]);
            setPage({
                last: data.last,
                index: data.number,
                numberOfElements: data.numberOfElements,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        } catch (error: any) {
            toast({
                title: "Tải bình luận thất bại",
                description: error,
            });
            console.log(error);
        }
    };

    return (
        <div className="relative w-full max-h-[80svh] h-min flex-1 flex flex-col justify-start  mt-4 overflow-y-auto custom-scroll">
            {!frist.current && comments.length === 0 && (
                <div className="abs-center text-muted-foreground font-medium">
                    Hãy là người đầu tiên bình luận bài viết này
                </div>
            )}
            <InfiniteScroll
                className="w-full h-full space-y-5 p-2"
                dataLength={comments.length}
                next={fetch}
                hasMore={!page.last}
                // loader={new Array(3).fill(0).map((_, index) => (
                //     <ChatItemLoading key={index} />
                // ))}
                loader={<div>loading</div>}
            >
                {comments.map((comment, index) => (
                    <CommentItem
                        key={comment.id}
                        data={comment}
                        isChildren={!!parent}
                    ></CommentItem>
                ))}
            </InfiniteScroll>
            <CommentInput
                setComments={setComments}
                parent={parent || post.id}
            ></CommentInput>
        </div>
    );
};

export default CommentList;
