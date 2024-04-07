import * as z from "zod";
import moment from "moment";

export const usernameSchema = z
    .string({
        required_error: "Tên không được bỏ trống!",
    })
    .min(5, { message: "Tên người dùng phải có ít nhất 5 kí tự" })
    .max(50, "Tên người dùng không được vượt quá 50 kí tự");

export const emailSchema = z
    .string({
        required_error: "Email không được bỏ trống!",
    })
    .email({
        message: "Định dạng email không hợp lệ!",
    });

export const passwordSchema = z
    .string({
        required_error: "Mật khẩu không được bỏ trống",
    })
    .min(8, { message: "Mật khẩu phải có ít nhất 8 kí tự" });

export const createAccoutSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
        name: usernameSchema,
        dateOfBirth: z.date({ required_error: "Vui lòng chọn ngày sinh" }),
        gender: z.enum(["MALE", "FEMALE", "OTHER"], {
            required_error: "Vui lòng chọn giới tính",
        }),
    })
    .refine(
        (data) => {
            return moment(data.dateOfBirth).get("year") > 16;
        },
        {
            message: "Tuổi phải lớn hơn 16",
        }
    );

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});
export const otpSchema = z.object({
    otp: z
        .string({
            required_error: "Vui lòng nhập OTP.",
        })
        .length(6, { message: "OTP không hợp lệ!" }),
});

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password.trim() === data.confirmPassword.trim(), {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });
