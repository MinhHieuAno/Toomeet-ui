"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { Page } from "@/lib/common.type";
import { Group } from "@/lib/group.utils";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GroupItem from "./GroupItem";
import { useAuth } from "@/context/AuthProvider";

type Props = {};

const GroupList = (props: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);

    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const { toast } = useToast();
    const { account } = useAuth();

    const frist = useRef<boolean>(true);

    useEffect(() => {
        if (!account || !account.user.id) return;
        if (!frist.current) return;
        (async () => {
            await fetch();
        })();
        frist.current = false;
    }, [account?.user.id]);

    const fetch = async () => {
        if (!account || !account.user.id) return;
        try {
            const response = await api(`/group/${account.user.id}/groups`, {
                method: "GET",
                params: {
                    page: page.index + 1,
                    limit: 6,
                },
            });
            const data = response.data;
            setGroups((groups: any) => [...groups, ...data.content]);
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
        <div className="py-2">
            <div className="w-full flex justify-between items-center px-4">
                <h4 className="text-sm text-muted-foreground">
                    Nhóm đã tham gia
                </h4>
            </div>{" "}
            <div
                id="my-group-list"
                className="my-1 md:h-[460px] h-[360px] overflow-y-auto custom-scroll space-y-5"
            >
                <InfiniteScroll
                    dataLength={groups.length}
                    next={fetch}
                    hasMore={!page.last}
                    loader={new Array(5).fill(0).map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-full flex justify-start items-start my-2 gap-2 px-5 py-2"
                        >
                            <Skeleton className="md:w-16 md:h-16 w-12 h-12 rounded-md"></Skeleton>
                            <div className="flex flex-col gap-2 justify-start items-start">
                                <Skeleton className="w-48 h-3 rounded-md"></Skeleton>
                                <Skeleton className="w-48 h-3 rounded-md"></Skeleton>
                                <Skeleton className="w-48 h-3 rounded-md"></Skeleton>
                            </div>
                        </div>
                    ))}
                    className="hidden-scroll"
                    scrollableTarget={`my-group-list`}
                >
                    {groups.map((group, index) => (
                        <GroupItem key={index} group={group}></GroupItem>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default GroupList;
