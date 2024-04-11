import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    className?: string;
    children: ReactNode;
};

const Sidebar: FC<Props> = ({ className, children }) => {
    return (
        <div
            className={cn(
                "w-full h-[calc(100svh-90px)] sticky md:top-[90px]  md:p-3 ",
                className
            )}
        >
            <ScrollArea className="h-full w-full hidden-scroll custom-scroll overflow-hidden">
                <div className=" space-y-4 p-3">{children}</div>
            </ScrollArea>
        </div>
    );
};

export default Sidebar;
