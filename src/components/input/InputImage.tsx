"use client";

import { FC, ReactNode, forwardRef, useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button, buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
    children: ReactNode;
    multiple?: boolean;
    className?: string;
    onSave: (image: ImageListType) => Promise<void> | void;
};

const InputImage: FC<Props> = ({ children, multiple, className, onSave }) => {
    const [images, setImages] = useState<ImageListType>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const maxNumber = 69;

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex?: number[] | undefined
    ) => {
        setImages(imageList);
    };

    const handleSave = async () => {
        setLoading(true);
        await onSave(images);
        setLoading(false);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger className={className} asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tải ảnh lên</DialogTitle>
                    <DialogDescription>
                        Chọn ảnh bạn muốn tải lên
                    </DialogDescription>
                </DialogHeader>
                <div className="">
                    <ImageUploading
                        multiple={multiple}
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            <div>
                                <Button
                                    disabled={loading}
                                    variant="link"
                                    onClick={onImageRemoveAll}
                                >
                                    Xóa tất cả
                                </Button>
                                <ScrollArea className=" h-[300px] border border-dashed border-primary rounded-xl">
                                    <div className="grid grid-cols-4 gap-3 p-5">
                                        {imageList.map((image, index) => (
                                            <div
                                                key={index}
                                                className="image-item flex flex-col justify-start items-start"
                                            >
                                                <div className=" md:w-20 md:h-20 w-16 h-16 flex justify-center items-center">
                                                    <img
                                                        src={image["data_url"]}
                                                        alt=""
                                                        className="object-fill bg-center"
                                                    />
                                                </div>

                                                <div className="flex justify-center gap-2">
                                                    <Button
                                                        disabled={loading}
                                                        className="!p-0  text-[10px] font-semibold"
                                                        variant="link"
                                                        onClick={() =>
                                                            onImageUpdate(index)
                                                        }
                                                    >
                                                        Cập nhật
                                                    </Button>
                                                    <Button
                                                        disabled={loading}
                                                        className="!p-0  text-[10px] font-semibold"
                                                        variant="link"
                                                        onClick={() =>
                                                            onImageRemove(index)
                                                        }
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            disabled={loading}
                                            variant="link"
                                            className={cn(
                                                "bg-primary/5 flex justify-center items-center w-16 h-16  md:w-20 md:h-20",
                                                {
                                                    [`${isDragging}`]:
                                                        "text-destructive",
                                                }
                                            )}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <Plus></Plus>
                                        </Button>
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </ImageUploading>
                </div>
                <DialogFooter>
                    <Button
                        disabled={loading}
                        className={cn(buttonVariants())}
                        type="button"
                        onClick={handleSave}
                    >
                        {loading ? "Đang xử lý" : "Lưu"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InputImage;
