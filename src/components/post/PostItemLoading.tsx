"use client";
import { Card, CardContent } from "@/components/ui/card";

import { FC } from "react";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

type Props = {};
const PostItemLoading: FC<Props> = (props) => {
    return (
        <Card className="my-5 p-5 mx-2">
            <div className="flex justify-between items-start">
                <div className="flex items-center justify-center gap-2">
                    <Skeleton className="w-12 h-12 rounded-full"></Skeleton>

                    <div className="flex flex-col justify-start items-start gap-2">
                        <h4 className="text-lg md:text-xl font-medium">
                            <Skeleton className="w-96 h-4 rounded-full"></Skeleton>
                        </h4>
                        <div className="flex justify-start items-center gap-2">
                            <Skeleton className="w-36 h-4 rounded-full"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>
            <CardContent className="my-3 space-y-1">
                <div className="my-4 space-y-1">
                    <Skeleton className="w-[80%] h-4 rounded-full"></Skeleton>
                    <Skeleton className="w-[50%] h-4 rounded-full"></Skeleton>
                </div>
                <div className="w-full aspect-square gap-2 grid grid-cols-2 grid-rows-2">
                    <Skeleton className="w-full aspect-square"></Skeleton>
                    <Skeleton className="w-full aspect-square"></Skeleton>
                    <Skeleton className="w-full aspect-square"></Skeleton>
                    <Skeleton className="w-full aspect-square"></Skeleton>
                </div>
            </CardContent>
            <div className="">
                <Separator className="my-3"></Separator>
                <div className="w-full flex justify-between items-center">
                    <Skeleton className="w-[20%] h-8"></Skeleton>
                    <Skeleton className="w-[20%] h-8"></Skeleton>
                    <Skeleton className="w-[20%] h-8"></Skeleton>
                </div>
            </div>
        </Card>
    );
};

export default PostItemLoading;
