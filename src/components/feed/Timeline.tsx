"use client";
import { useAuth } from "@/context/AuthProvider";
import { PostProvider } from "@/context/PostProvider";
import api from "@/lib/api";
import { Page } from "@/lib/common.type";
import { Post } from "@/lib/post.utils";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "../post/PostItem";
import PostItemLoading from "../post/PostItemLoading";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    profileId: number;
};

const Timeline = ({ profileId }: Props) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const { account } = useAuth();
    const { toast } = useToast();

    const first = useRef<boolean>(true);

    useEffect(() => {
        if (!first.current || !profileId) return;
        (async () => {
            await fetch();
        })();
        first.current = false;
    }, [profileId]);

    const fetch = async () => {
        try {
            const response = await api("/posts/timeline", {
                params: {
                    page: page.index + 1,
                    limit: 10,
                    profile: profileId,
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
        <div className="my-5 w-full h-full">
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
                {posts.map((post, index) => (
                    <PostProvider key={index} data={post}>
                        <PostItem></PostItem>
                    </PostProvider>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default Timeline;
