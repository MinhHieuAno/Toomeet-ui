import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

const Role = ({ children, className }: Props) => {
    return (
        <span
            className={cn(
                "text-xs bg-primary/20 text-primary font-semibold px-3 py-1 rounded-md",
                className
            )}
        >
            {children}
        </span>
    );
};

export default Role;
