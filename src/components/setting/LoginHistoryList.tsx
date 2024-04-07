"use client";
import moment from "moment";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "../ui/use-toast";
import api from "@/lib/api";
import { Page } from "@/lib/common.type";
import InfiniteScroll from "react-infinite-scroll-component";

type LoginHistory = {
    id: number;
    operatingSystem: string;
    browser: string;
    browserVersion: string;
    deviceType: string;
    timestamp: string;
};

type Props = {};

const LoginHistoryList = (props: Props) => {
    const [historyList, setHistoryList] = useState<LoginHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<Page>({
        last: false,
        index: -1,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const first = useRef<boolean>(true);

    const { toast } = useToast();

    useEffect(() => {
        if (!first.current) return;
        (async () => {
            await fetch();
        })();
        first.current = false;
    }, []);

    const fetch = async () => {
        try {
            setLoading(true);
            const { data } = await api("/users/account/login-history", {
                params: {
                    p: page.index + 1,
                    l: 10,
                },
            });
            setHistoryList((history) => [...history, ...data.content]);

            setPage({
                last: data.last,
                index: data.number,
                numberOfElements: data.numberOfElements,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        } catch (error: any) {
            toast({
                title: "Tải lịch sử đăng nhập thất bại",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <div
            id="history-login-wrapper"
            className="h-[400px] overflow-y-auto custom-scroll"
        >
            <InfiniteScroll
                className="w-full h-full"
                dataLength={historyList.length}
                next={() => fetch()}
                hasMore={!page.last}
                loader={<>loading....</>}
                scrollableTarget="history-login-wrapper"
            >
                {historyList.map((history, index) => (
                    <LoginHistoryItem
                        key={index}
                        {...history}
                    ></LoginHistoryItem>
                ))}
            </InfiniteScroll>
            {/* {loading && (
                <div className="w-full h-full flex justify-center items-center">
                    <span className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
                </div>
            )} */}
        </div>
    );
};

type LoginHistoryItemProps = {} & LoginHistory;

const LoginHistoryItem: FC<LoginHistoryItemProps> = (data) => {
    const deviceImage = useMemo(() => {
        const device = data.operatingSystem.toLowerCase();
        if (device.includes("windows")) return "/os/windows.png";
        else if (device.includes("mac")) return "/os/mac.png";
        else if (device.includes("iphone")) return "/os/ios.png";
        else if (device.includes("linux")) return "/os/linux.png";
        else if (device.includes("android")) return "/os/android.png";
        else return "/os/unknow.png";
    }, []);

    return (
        <div className="flex justify-start items-center gap-2 px-5 py-3">
            <div className="w-12 h-12 rounded-md overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={deviceImage}
                    alt={data.operatingSystem}
                />
            </div>
            <div className="">
                <h5 className="text-base font-medium">{data.browser}</h5>
                <div className="flex justify-start items-center gap-1 text-sm">
                    <p className="">{data.browser}</p>
                    <p>{moment(data.timestamp).fromNow()}</p>
                </div>
            </div>
        </div>
    );
};

export default LoginHistoryList;
