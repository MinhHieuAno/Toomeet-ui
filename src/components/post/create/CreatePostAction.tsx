"use client";
import InputImage from "@/components/input/InputImage";
import { ImagePlus, MapPin, SmilePlus, Tag } from "lucide-react";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { createPostSchema } from "@/schema/createPost.schema";
import { ImageListType } from "react-images-uploading";
import CreatePostActionButton from "./CreatePostActionButton";

type Props = {
    form: UseFormReturn<z.infer<typeof createPostSchema>>;
};

const CreatePostAction: FC<Props> = ({ form }) => {
    return (
        <div className="flex justify-start items-center ">
            <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                    <FormItem>
                        <FormControl {...field}>
                            <InputImage
                                multiple
                                onSave={(image: ImageListType) => {
                                    form.setValue("images", image);
                                }}
                            >
                                <CreatePostActionButton
                                    className="relative"
                                    title={`Hình ảnh ${
                                        field.value && field.value.length !== 0
                                            ? `(${field.value.length})`
                                            : ""
                                    }`}
                                    onClick={() => {}}
                                >
                                    <span className="block md:hidden absolute top-0 right-0 text-primary font-semibold">
                                        {field.value && field.value.length !== 0
                                            ? `(${field.value.length})`
                                            : ""}
                                    </span>
                                    <ImagePlus className="w-5 h-5 text-blue-500" />
                                </CreatePostActionButton>
                            </InputImage>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <CreatePostActionButton title="Cảm xúc" onClick={() => {}}>
                <SmilePlus className="w-5 h-5 text-yellow-500" />
            </CreatePostActionButton>
            <CreatePostActionButton title="Gắn thẻ" onClick={() => {}}>
                <Tag className="w-5 h-5 text-green-500" />
            </CreatePostActionButton>
            <CreatePostActionButton title="Vị trí" onClick={() => {}}>
                <MapPin className="w-5 h-5 text-red-500" />
            </CreatePostActionButton>
        </div>
    );
};

export default CreatePostAction;
