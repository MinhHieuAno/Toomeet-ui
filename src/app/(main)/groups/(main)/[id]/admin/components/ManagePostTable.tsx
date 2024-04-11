"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ManagePostAction from "./ManagePostAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { PostGroup, PostGroupStatus } from "@/lib/post.utils";
import moment from "moment";
import { useState } from "react";

type Props = {
    posts: PostGroup[];
    isLoading?: boolean;
    groupId: string;
};

export function ManagePostTable({ posts, isLoading, groupId }: Props) {
    return (
        <Table>
            <TableCaption>Danh sách cách bài viết trong nhóm.</TableCaption>
            <TableHeader>
                <TableRow className="text-center">
                    <TableHead className="w-[100px]">Mã bài viết</TableHead>
                    <TableHead className="w-[100px]">Tác giả</TableHead>
                    <TableHead className="w-[100px]">Nội dung</TableHead>
                    <TableHead className="w-[100px]">Trạng thái</TableHead>
                    <TableHead className="w-[100px]">Thời gian tạo</TableHead>
                    <TableHead className="w-[100px]">
                        Cập nhật gần nhất
                    </TableHead>
                    <TableHead className="w-[100px]">Hành động</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading &&
                    new Array(2).fill(0).map((_, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    <Skeleton className="w-[80%] h-5"></Skeleton>
                                </TableCell>
                                <TableCell className="flex justify-start items-center gap-3">
                                    <p>
                                        <Skeleton className="w-[80%] h-5"></Skeleton>
                                    </p>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Skeleton className="w-[80%] h-5"></Skeleton>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Skeleton className="w-[80%] h-5"></Skeleton>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Skeleton className="w-[80%] h-5"></Skeleton>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Skeleton className="w-[80%] h-5"></Skeleton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                {posts.map((post) => (
                    <ManagePostRow
                        key={post.postId}
                        post={post}
                        groupId={groupId}
                    ></ManagePostRow>
                ))}
            </TableBody>
        </Table>
    );
}

const ManagePostRow = ({
    post: data,
    groupId,
}: {
    post: PostGroup;
    groupId: string;
}) => {
    const [post, setPost] = useState<PostGroup>(data);

    return (
        <TableRow key={post.postId}>
            <TableCell className="font-medium">{post.postId}</TableCell>
            <TableCell className="flex justify-start items-center gap-3">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={post.author.avatar}></AvatarImage>
                    <AvatarFallback>{post.author.name}</AvatarFallback>
                </Avatar>
                <p>{post.author.name}</p>
            </TableCell>
            <TableCell className="font-medium">{post.content}</TableCell>
            <TableCell className="font-medium">{post.status}</TableCell>
            <TableCell className="font-medium">
                {moment(post.createdAt).toNow()}
            </TableCell>
            <TableCell className="font-medium">
                {moment(post.updatedAt).toNow()}
            </TableCell>
            <TableCell className="">
                {post.status !== PostGroupStatus.DELETED && (
                    <ManagePostAction
                        setPost={setPost}
                        groupId={groupId}
                        post={post}
                    ></ManagePostAction>
                )}
            </TableCell>
        </TableRow>
    );
};
