import * as z from "zod";

export const createChatRoomSchema = z.object({
    name: z.string({ required_error: "Hãy đặt tên cho nhóm" }),
    type: z.string(),
    members: z
        .array(z.any())
        .min(2, "Nhóm phải có ít nhất 3 thành viên")
        .max(500, "Số thành viên trong nhóm không vượt quá 500 thành viên"),
    color: z.string(),
});
