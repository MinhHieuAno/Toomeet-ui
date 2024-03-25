import { PostPrivacy } from "@/lib/post.utils";
import { ImageListType } from "react-images-uploading";
import * as z from "zod";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const createPostSchema = z.object({
    content: z.optional(
        z.string().max(1000, "Nội dung bài đăng không quá 1000 kí tự")
    ),
    privacy: z.nativeEnum(PostPrivacy),
    images: z.any().refine((images: ImageListType) => {
        if (!images || images.length === 0) return true;
        return images.some((image) => {
            return (
                (ACCEPTED_IMAGE_TYPES.includes(image.file?.type!) &&
                    image.file?.size) ||
                0 < MAX_FILE_SIZE
            );
        });
    }),
});
