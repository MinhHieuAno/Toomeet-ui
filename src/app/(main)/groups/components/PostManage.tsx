"use client";
import { useToast } from "@/components/ui/use-toast";
import { Page } from "@/lib/common.type";
import { PostGroup } from "@/lib/post.utils";
import { useEffect, useState } from "react";
import { ManagePostTable } from "../(main)/[id]/admin/components/ManagePostTable";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/lib/api";

type Props = {
    groupId: string;
};

const PostManage = ({ groupId }: Props) => {
    const [posts, setPosts] = useState<PostGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const { toast } = useToast();

    useEffect(() => {
        (async () => {
            await fetch();
        })();
    }, []);

    const fetch = async (pageIndex?: number) => {
        setLoading(true);
        try {
            const { data } = await api(`/posts/group/${groupId}`, {
                params: {
                    page: pageIndex || page.index + 1,
                    limit: 10,
                },
            });
            setPosts(data.content);
            setPage({
                last: data.last,
                index: data.number,
                numberOfElements: data.numberOfElements,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        } catch (error: any) {
            toast({
                title: "Tải bài viết thất bại",
                description: error,
            });
        }
        setLoading(false);
    };

    const nextPage = async () => {
        fetch(page.index + 1);
    };

    const prevPage = async () => {
        if (page.index > 0) fetch(page.index - 1);
    };

    return (
        <div className="px-4">
            <ManagePostTable
                groupId={groupId}
                isLoading={loading}
                posts={posts}
            ></ManagePostTable>
            <div className="mt-5 flex justify-end items-center gap-2">
                <Button
                    onClick={nextPage}
                    size="icon"
                    variant={page.index <= 0 ? "secondary" : "default"}
                    disabled={page.index <= 0}
                >
                    <ChevronLeft />
                </Button>

                <Button
                    onClick={prevPage}
                    size="icon"
                    variant={page.last ? "secondary" : "default"}
                    disabled={page.last}
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    );
};

export default PostManage;
