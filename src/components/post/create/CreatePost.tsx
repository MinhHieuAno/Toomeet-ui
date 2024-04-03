"use client";
import CreatePostFrom from "@/components/form/CreatePostFrom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreatePostTrigger from "./CreatePostTrigger";
type Props = { className?: string };

const CreatePost = ({ className }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <CreatePostTrigger></CreatePostTrigger>
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-min ">
                <CreatePostFrom></CreatePostFrom>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;
