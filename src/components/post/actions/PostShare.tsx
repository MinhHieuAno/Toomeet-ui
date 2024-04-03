"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { usePost } from "@/context/PostProvider";
import { Share2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import PostActionItem from "./PostActionItem";
import api from "@/lib/api";
import { PostPrivacy } from "@/lib/post.utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {};

const PostShare = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [privacy, setPrivacy] = useState<PostPrivacy>(PostPrivacy.PUBLIC);
    const { post } = usePost();

    const { toast } = useToast();

    const handleSharePost = async () => {
        try {
            setLoading(true);
            await api({
                method: "POST",
                url: "/posts/share",
                data: {
                    postId: post.id,
                    privacy,
                },
            });
            toast({
                title: "Chia sẻ thành công",
                description: `Bài viết của ${post.author.name} đã được chia sẻ lên trang cá nhân của bạn`,
            });
        } catch (error: any) {
            toast({
                title: "Chia sẻ bài viết thất bại",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <PostActionItem>
                    <span className="hidden md:block">
                        <Share2 className="w-5 h-5" />
                    </span>
                    <span>Chia sẻ</span>
                </PostActionItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chia sẻ bài viết</DialogTitle>
                    <DialogDescription>
                        Chia sẻ bài viết của{" "}
                        <span className="font-semibold text-primary">
                            {post.author.name}
                        </span>{" "}
                        lên trang cá nhân của bạn.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="flex justify-start items-center gap-2">
                        <Avatar>
                            <AvatarImage src={post.author.avatar}></AvatarImage>
                        </Avatar>
                        <div>
                            <p>{post.author.name}</p>
                            <span className="text-xs text-muted-foreground font-semibold">
                                {moment(post.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                </div>
                <Select
                    onValueChange={(value) => {
                        setPrivacy(+value);
                    }}
                >
                    <SelectTrigger
                        defaultChecked
                        className="w-[100px] md:w-[180px] text-sm"
                    >
                        <SelectValue placeholder="Phạm vi" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            value={PostPrivacy.PUBLIC.toString()}
                            defaultChecked
                        >
                            Công khai
                        </SelectItem>
                        <SelectItem value={PostPrivacy.PRIVATE.toString()}>
                            Riêng tư
                        </SelectItem>
                        <SelectItem value={PostPrivacy.FRIEND.toString()}>
                            Bạn bè
                        </SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex justify-between items-center gap-2">
                    <Button
                        disabled={loading}
                        variant="secondary"
                        className="w-full"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSharePost}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "Đang xử lý" : "Đăng"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PostShare;
