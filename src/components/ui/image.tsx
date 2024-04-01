import { cn } from "@/lib/utils";
import { ImageProps } from "next/image";
import React, { HtmlHTMLAttributes } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";

type Props = {
    className?: string;
    imgClassName?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Image = ({ className, imgClassName, ...props }: Props) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className={cn("", className)}>
                    <img className={cn(imgClassName)} {...props} />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-svw max-h-svh overflow-auto custom-scroll">
                <img
                    className={cn("w-full h-full object-contain", imgClassName)}
                    {...props}
                />
            </DialogContent>
        </Dialog>
    );
};

export default Image;
