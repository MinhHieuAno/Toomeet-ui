import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

type CreatePostActionButtonProps = {
    children: ReactNode;
    title: string;
    onClick: () => void;
    className?: string;
};

const CreatePostActionButton: FC<CreatePostActionButtonProps> = (props) => {
    return (
        <Button
            type="button"
            className={cn("space-x-2 ", props.className)}
            variant="ghost"
            onClick={props.onClick}
        >
            <span>{props.children}</span>
            <span className="hidden md:block">{props.title}</span>
        </Button>
    );
};

export default CreatePostActionButton;
