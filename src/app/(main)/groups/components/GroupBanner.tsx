"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGroup } from "@/context/GroupProvider";
import { cn } from "@/lib/utils";
import { Globe2, Settings } from "lucide-react";
import Link from "next/link";
import InviteMember from "./InviteMember";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { useState } from "react";
import { Group } from "@/lib/group.utils";

type Props = {};

const GroupBanner = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        loading: loadingGroupLoading,
        group,
        isAdmin,
        setGroup,
    } = useGroup();

    const { toast } = useToast();

    const handleJoinGroup = async () => {
        if (!group || !group.groupId) return;
        setLoading(true);
        try {
            await api.post(`/group/member/${group?.groupId}`, {
                data: {
                    groupId: group.groupId,
                    role: "USER",
                },
            });
            toast({
                title: "Thành công",
                description: "Tham gia nhóm thành công",
            });
            setGroup((group) => ({ ...group, member: true } as Group));
        } catch (error: any) {
            toast({
                title: "Tham gia nhóm thất bại",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <div className="w-full">
            <div className="relative w-full h-full flex justify-center items-center">
                <div className={cn(" w-full h-full transition-all", {})}>
                    <Card className="w-full overflow-hidden p-5">
                        <div className="w-full h-[200px] md:h-[300px] rounded-xl  backdrop-blur-md bg-opacity-30">
                            {(!loadingGroupLoading || group?.avatar) && (
                                <img
                                    className="h-full w-full object-cover object-center rounded-[inherit]"
                                    src={group?.avatar}
                                    alt={group?.name}
                                />
                            )}
                            {loadingGroupLoading && (
                                <Skeleton className="w-full h-full"></Skeleton>
                            )}
                        </div>
                        <div className="my-5 space-y-3">
                            {!loadingGroupLoading && (
                                <h3
                                    className={cn(
                                        "text-xl md:text-2xl font-semibold text-muted-foreground text-pretty ",
                                        {}
                                    )}
                                >
                                    {group?.name}
                                </h3>
                            )}
                            {loadingGroupLoading && (
                                <Skeleton className="w-[60%] h-4 rounded-full"></Skeleton>
                            )}
                            <span className="flex justify-start items-center gap-2 text-muted-foreground font-semibold text-xs">
                                <Globe2 className="w-4 h-4" /> nhóm công khai -{" "}
                                {group?.quantityMember} thành viên
                            </span>
                        </div>

                        <Separator></Separator>
                        <div className="flex  justify-between items-center mt-5">
                            <div className="flex justify-start items-center">
                                {/* <Button variant="ghost">Giới thiệu</Button>
                                <Button variant="ghost">Bài viết</Button>
                                <Button variant="ghost">Thành viên</Button>
                                <Button variant="ghost">Sự kiện</Button> */}
                            </div>
                            <div className="flex justify-end items-center gap-3">
                                {!group?.member && (
                                    <Button
                                        disabled={loading}
                                        onClick={handleJoinGroup}
                                    >
                                        {loading ? "Đang xử lý" : "Tham gia"}
                                    </Button>
                                )}
                                {group?.member && <InviteMember></InviteMember>}
                                {isAdmin && (
                                    <Link
                                        href={`/groups/${group?.groupId}/admin`}
                                        className={cn(
                                            buttonVariants({
                                                variant: "secondary",
                                                size: "icon",
                                            })
                                        )}
                                    >
                                        <Settings></Settings>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default GroupBanner;
