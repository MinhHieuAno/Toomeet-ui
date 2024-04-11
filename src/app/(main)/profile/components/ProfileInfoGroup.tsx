import React, { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    title?: string;
    children?: ReactNode;
    loading?: boolean;
};

const ProfileInfoGroup = ({ children, title, loading = false }: Props) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold text-muted-foreground">
                {title}
            </h3>
            <div className="mt-4">
                {!loading && children}
                {loading &&
                    new Array(5).fill(0).map((_, index) => (
                        <div className="flex justify-start items-center gap-3 mb-4">
                            <Skeleton className="w-[20%] h-5 rounded-full"></Skeleton>
                            <Skeleton className="w-[60%] h-5 rounded-full"></Skeleton>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProfileInfoGroup;
