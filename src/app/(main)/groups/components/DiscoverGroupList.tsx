"use client";
import React, { useEffect, useRef, useState } from "react";
import DisconverGroupItem from "./DisconverGroupItem";
import { Group } from "@/lib/group.utils";
import { Page } from "@/lib/common.type";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import InfiniteScroll from "react-infinite-scroll-component";
import DisconverGroupItemLoading from "./DisconverGroupItemLoading";

type Props = {};

const DiscoverGroupList = (props: Props) => {
    const [groups, setGroup] = useState<Group[]>([]);

    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const { toast } = useToast();

    const first = useRef<boolean>(true);

    useEffect(() => {
        if (!first.current) return;
        (async () => {
            await fetch();
        })();
        first.current = false;
    }, []);

    const fetch = async () => {
        try {
            const { data } = await api("/group", {
                params: {
                    page: page.index + 1,
                    limit: 10,
                },
            });
            setGroup((groups) => [...groups, ...data.content]);
            setPage({
                last: data.last,
                index: data.number,
                numberOfElements: data.numberOfElements,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        } catch (error: any) {
            toast({
                title: "Lỗi",
                description: error,
            });
            console.log(error);
        }
    };

    return (
        <InfiniteScroll
            dataLength={groups.length}
            next={fetch}
            hasMore={!page.last}
            loader={new Array(10).fill(0).map((_, index) => (
                <DisconverGroupItemLoading />
            ))}
            className="w-full h-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5 p-2 md:p-4"
        >
            {groups.map((group, index) => (
                <DisconverGroupItem
                    key={index}
                    group={group}
                ></DisconverGroupItem>
            ))}
        </InfiniteScroll>
    );
};

export default DiscoverGroupList;
