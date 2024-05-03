"use client";
import { useToast } from "@/components/ui/use-toast";
import { PostProvider } from "@/context/PostProvider";
import api from "@/lib/api";
import { Page } from "@/lib/common.type";
import { Post } from "@/lib/post.utils";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "../post/PostItem";
import PostItemLoading from "../post/PostItemLoading";
import { useSocket } from "@/context/SocketProvider";
import { useAuth } from "@/context/AuthProvider";

type Props = { className?: string };

const NewsFeed = ({ className }: Props) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [realtimeNewsfeed, setRealtimeNewsfeed] = useState<Post[]>([]);

    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const { getConnection } = useSocket();
    const { account } = useAuth();
    const { toast } = useToast();
    const first = useRef<boolean>(true);

    useEffect(() => {
        if (!first.current) return;
        (async () => {
            await fetch();
        })();
        first.current = false;
    }, []);

    // useEffect(() => {
    //     const client = getConnection();
    //     if (!client || !client.connected || !account || !account.user.id)
    //         return;

    //     const subscription = client.subscribe(
    //         `/post-newsfeed/${account?.user.id}`,
    //         (message) => {
    //             const data = JSON.parse(message.body);
    //             setRealtimeNewsfeed((posts) => [...posts, data.post]);
    //         }
    //     );

    //     return () => {
    //         subscription.unsubscribe();
    //     };
    // }, [account?.user.id]);

    const fetch = async () => {
        try {
            const response = await api("/posts", {
                params: {
                    page: page.index + 1,
                    limit: 10,
                },
            });
            const data = response.data;

            setPosts((posts) => [...posts, ...data.content]);
            setPage({
                last: data.last,
                index: data.number,
                numberOfElements: data.numberOfElements,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        } catch (error) {
            toast({
                title: "Lỗi: ",
                description: JSON.stringify(error),
            });
            console.log(error);
        }
    };

    return (
        <div className={cn("my-5 w-full h-full", className)}>
            {/* {   <div className="w-full h-full flex justify-center items-center flex-col">
                <h3 className="text-lg">
                    Không tìm thấy bài viết nào để hiển thị
                </h3>
                <Button variant="link">Đăng bài ngay</Button>
            </div>} */}

            <InfiniteScroll
                className="w-full h-full"
                dataLength={posts.length}
                next={() => fetch()}
                hasMore={!page.last}
                loader={new Array(20).fill(0).map((_, index) => (
                    <PostItemLoading key={index} />
                ))}
            >
                {posts.map((post, index) => {
                    return (
                        <PostProvider key={index} data={post}>
                            <PostItem></PostItem>
                        </PostProvider>
                    );
                })}
            </InfiniteScroll>
            {/* {realtimeNewsfeed.map((post, index) => {
                return (
                    <PostProvider key={index} data={post}>
                        <PostItem></PostItem>
                    </PostProvider>
                );
            })} */}
        </div>
    );
};

export default NewsFeed;
