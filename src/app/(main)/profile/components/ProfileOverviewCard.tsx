"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/context/ProfileProvider";
import { Briefcase, GraduationCap, Home, LucideIcon } from "lucide-react";
import { FC, ReactNode } from "react";

type Props = {};

const ProfileOverviewCard = (props: Props) => {
    const { profile, loading, isCurrentUser } = useProfile();
    return (
        <Card className="col-span-3 h-max max-w-full mt-10 p-5">
            <h3 className="text-lg font-semibold text-muted-foreground mb-3">
                Giới thiệu
            </h3>

            <Separator></Separator>
            <div className="">
                <div className=" text-pretty line-clamp-5">
                    {profile?.description}
                </div>
                <div className="mt-4 space-y-2">
                    <OverviewItem
                        loading={loading}
                        label="Học vấn"
                        Icon={GraduationCap}
                    >
                        {profile?.education}
                    </OverviewItem>
                    <OverviewItem loading={loading} label="Địa chỉ" Icon={Home}>
                        {profile?.adress}
                    </OverviewItem>
                    <OverviewItem
                        loading={loading}
                        label="Nơi làm việc"
                        Icon={Briefcase}
                    >
                        {profile?.workplace}
                    </OverviewItem>
                </div>
            </div>
            {isCurrentUser && <Button className="w-full my-6">Cập nhật</Button>}
        </Card>
    );
};

type OverviewItemProps = {
    label: string;
    Icon: LucideIcon;
    children: ReactNode;
    loading?: boolean;
};

const OverviewItem: FC<OverviewItemProps> = ({
    label,
    Icon,
    children,
    loading = false,
}) => {
    return (
        <div className="flex justify-start items-center gap-3">
            <Icon size={25} className="flex-shrink-0" />
            <p className="line-clamp-1 text-sm">
                <span className="font-semibold">{label}: </span>
                {loading && (
                    <Skeleton className="w-32 h-3 rounded-full"></Skeleton>
                )}
                {!loading && (children || "Không có thông tin")}
            </p>
        </div>
    );
};

export default ProfileOverviewCard;
