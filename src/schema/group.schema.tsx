import { ImageListType } from "react-images-uploading";
import * as z from "zod";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const createGroupSchema = z.object({
    name: z
        .string({ required_error: "Tên nhóm là bắt buộc" })
        .min(20, { message: "Tên nhóm phải có ít nhất 20 kí tự" })
        .max(120, { message: "Tên nhóm không dài quá 120 kí tự" }),
    // members: z.optional(z.array(z.number())),
    description: z
        .string({ required_error: "Mô tả không được bỏ trống" })
        .min(5, { message: "Mô tả phải có ít nhất 5 kí tự" }),
    privacy: z.number(), // 0: private, 1: public
    background: z.any().refine(
        (images: ImageListType) => {
            if (!images || images.length === 0) return false;
            return images.some((image) => {
                return (
                    (ACCEPTED_IMAGE_TYPES.includes(image.file?.type!) &&
                        image.file?.size) ||
                    0 < MAX_FILE_SIZE
                );
            });
        },
        { message: "Ảnh nền không hợp lệ" }
    ),
});
