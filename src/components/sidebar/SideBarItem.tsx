import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
    to: string;
    className?: string;
    children: ReactNode;
    active?: boolean;
};

const SideBarItem = (props: Props) => {
    return (
        <Link
            className={cn(
                "w-full flex justify-start items-start gap-2 hover:bg-muted px-4 py-2",
                { "bg-primary/5 text-primary": props.active },
                props.className
            )}
            href={props.to}
        >
            {props.children}
        </Link>
    );
};

export default SideBarItem;
