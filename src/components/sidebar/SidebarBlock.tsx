import React, { FC, ReactNode } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
    children?: ReactNode;
    title?: string;
    description?: string;
    className?: string;
    fullScreen?: boolean;
    header?: ReactNode;
};

const SidebarBlock: FC<Props> = (props) => {
    return (
        <Card
            className={cn({
                "min-h-[calc(100svh-150px)]": props.fullScreen,
            })}
        >
            {!props.header && (props.title || props.description) && (
                <>
                    <CardHeader>
                        {props.title && (
                            <CardTitle className="xl:text-lg text-primary">
                                {props.title}
                            </CardTitle>
                        )}
                        {props.description && (
                            <CardDescription>
                                {props.description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <Separator />
                </>
            )}
            {props.header && (
                <>
                    {props.header}
                    <Separator />
                </>
            )}
            <CardContent className={cn(props.className)}>
                {props.children}
            </CardContent>
        </Card>
    );
};

export default SidebarBlock;
