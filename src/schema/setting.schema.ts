import * as z from "zod";
import { usernameSchema } from "./auth.schema";

export const generalSettingSchema = z.object({});

export const accoutSettingSchema = z.object({
    name: usernameSchema,
});

export const securitySettingSchema = z.object({
    is2fa: z.boolean(),
});
