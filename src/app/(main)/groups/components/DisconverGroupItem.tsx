"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { Group } from "@/lib/group.utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
    group: Group;
};

const DisconverGroupItem = ({ group }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const router = useRouter();

    const handleJoinGroup = async () => {
        try {
            setLoading(true);
            const { data } = await api(`/group/member/${group.groupId}`, {
                method: "POST",
                data: {
                    groupId: group.groupId,
                    role: "USER",
                },
            });
            router.push(`/groups/${group.groupId}`);
        } catch (error: any) {
            toast({
                title: "Tham gia nhóm thất bại",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <Card className="">
            <div className="w-full h-52 rounded-[inherit] overflow-hidden">
                <img
                    className="w-full h-full object-contain"
                    src={group.avatar}
                    alt={`group-image-${group.groupId}`}
                />
            </div>
            <div className="p-5 space-y-4">
                <div className="min-h-20">
                    <h3 className="line-clamp-2 font-semibold">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        {group.quantityMember} thành viên
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <Button
                        disabled={loading}
                        onClick={handleJoinGroup}
                        className="w-full"
                    >
                        {loading ? "Đang xử lý" : "Tham gia nhóm"}
                    </Button>
                    <Link
                        href={`/groups/${group.groupId}`}
                        className={cn(
                            buttonVariants({
                                variant: "secondary",
                            }),
                            "w-full"
                        )}
                    >
                        Xem nhóm
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default DisconverGroupItem;
