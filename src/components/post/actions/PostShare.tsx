"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCheck, Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PostActionItem from "./PostActionItem";

type Props = {};

const PostShare = (props: Props) => {
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        if (!copied) return;

        const timer = setTimeout(() => {
            setCopied(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <PostActionItem>
                    <span>
                        <Share2 className="w-5 h-5" />
                    </span>
                    <span>Chia sẻ</span>
                </PostActionItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chia sẻ</DialogTitle>
                    <DialogDescription>
                        Chia sẻ bài viết này với bạn bè của bạn
                    </DialogDescription>
                </DialogHeader>
                <div className="flex  gap-2 justify-center">
                    <Input
                        className="select-all"
                        id="link"
                        inputMode="url"
                        readOnly
                        value="http://localhost:3000"
                        autoFocus
                    ></Input>
                    <CopyToClipboard
                        onCopy={() => setCopied(true)}
                        text="http://localhost:8080/alloooo"
                    >
                        <Button variant="secondary">
                            {copied ? (
                                <CheckCheck className="w-5 h-5" />
                            ) : (
                                <Copy className="w-5 h-5" />
                            )}
                        </Button>
                    </CopyToClipboard>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PostShare;
