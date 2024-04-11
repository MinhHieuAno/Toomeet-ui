"use client";
import { useToast } from "@/components/ui/use-toast";
import { usePost } from "@/context/PostProvider";
import api from "@/lib/api";
import { Page } from "@/lib/common.type";
import { CommentType } from "@/lib/post.utils";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentItem from "./CommentItem";
import CommentItemLoading from "./CommentItemLoading";
import { useSocket } from "@/context/SocketProvider";

type Props = {
    parent?: string;
    numberOfComment?: number;
};

const CommentList = ({ parent, numberOfComment }: Props) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [realTimeComments, setRealTimeComments] = useState<CommentType[]>([]);
    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const { toast } = useToast();
    const { post } = usePost();
    const { getConnection, client } = useSocket();

    const frist = useRef<boolean>(true);

    useEffect(() => {
        if (!frist.current) return;
        (async () => {
            await fetch();
        })();
        frist.current = false;
    }, []);

    const fetch = async () => {
        try {
            const { data } = await api(`/posts/${post.id}/comments`, {
                params: {
                    page: page.index + 1,
                    limit: 10,
                    parentId: parent,
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

    useEffect(() => {
        const client = getConnection();
        if (!client || !client.connected) return;

        const subscription = client.subscribe(
            `/post/new-comment/${parent || post.id}`,
            (message) => {
                const data = JSON.parse(message.body);
                setRealTimeComments((comments) => [
                    ...comments,
                    {
                        id: data.comment.commentId,
                        author: data.comment.author,
                        content: data.comment.content,
                        emoji: -1,
                        level: 0,
                        likeCount: 0,
                        parentId: data.parentId,
                        reactions: null,
                        replyCount: 0,
                        createdAt: data.timestamp,
                        updatedAt: data.timestamp,
                    },
                ]);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div
            id={`comment-list-wrapper-${parent || "root"}`}
            className="relative w-full h-min max-h-[60svh] flex-1 overflow-y-auto custom-scroll p-2 flex flex-col-reverse"
        >
            <div className="flex flex-col">
                {realTimeComments.map((comment) => (
                    <CommentItem
                        canScrollIntoView
                        key={comment.id}
                        data={comment}
                        isChildren={!!parent}
                    ></CommentItem>
                ))}
            </div>
            <InfiniteScroll
                className="custom-scroll !overflow-hidden w-full space-y-2 flex flex-col-reverse"
                dataLength={comments.length}
                next={fetch}
                hasMore={!page.last}
                loader={new Array(numberOfComment || 4)
                    .fill(0)
                    .map((_, index) => (
                        <CommentItemLoading key={index} />
                    ))}
                // loader={<div>loading</div>}
                scrollableTarget={`comment-list-wrapper-${parent || "root"}`}
                inverse
            >
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        data={comment}
                        isChildren={!!parent}
                    ></CommentItem>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default CommentList;
