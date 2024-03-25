"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthProvider";
import { cn, getUsername } from "@/lib/utils";
import CreatePostFrom from "@/components/form/CreatePostFrom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePlus, MapPin, SmilePlus, Tag } from "lucide-react";
import CreatePostActionButton from "./CreatePostActionButton";
import CreatePostTrigger from "./CreatePostTrigger";
type Props = { className?: string };

const CreatePost = ({ className }: Props) => {
    const { account } = useAuth();

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
