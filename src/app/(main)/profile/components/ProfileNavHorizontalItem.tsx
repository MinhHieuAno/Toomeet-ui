import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
    isActive?: boolean;
    label: string;
    to: string;
};

const ProfileNavHorizontalItem = ({ isActive, to, label }: Props) => {
    return (
        <Link
            className={cn(
                "text-muted-foreground block border-b-[4px] border-b-transparent px-3 md:px-5 md:py-3 py-2 transition-all hover:text-primary hover:border-b-primary",
                {
                    "text-primary border-b-primary": isActive,
                }
            )}
            href={to}
        >
            {label}
        </Link>
    );
};

export default ProfileNavHorizontalItem;
