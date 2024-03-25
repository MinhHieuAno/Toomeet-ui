import { ButtonProps, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {} & ButtonProps;

const PostActionItem = (props: Props) => {
    return (
        <Button
            variant="ghost"
            {...props}
            className={cn(
                " w-full justify-center items-center gap-2 ",
                props.className
            )}
        >
            {props.children}
        </Button>
    );
};

export default PostActionItem;
