"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGroup } from "@/context/GroupProvider";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

const GroupOverview = ({ className }: Props) => {
    const { group, loading } = useGroup();

    return (
        <Card className={cn("min-h-[200px]", className)}>
            <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">
                Tổng quan
            </h2>
            <Separator className="mb-4"></Separator>
            <div>
                {!loading && (
                    <div>
                        <p>
                            <span className="font-semibold ">Mô tả: </span>
                            <span>{group?.description}</span>
                        </p>
                        <p>
                            <span className="font-semibold ">
                                Số thành viên:{" "}
                            </span>
                            <span>{group?.quantityMember} thành viên</span>
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default GroupOverview;
