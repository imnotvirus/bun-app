import { Static, t } from "elysia";
import { z } from "zod";

const registerDto = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    email: z.string({
        required_error: "Email is required",
    }).email('Invalid email address'),
    password: z.string({
        required_error: "Password is required",
    }),
})

type registerDto = z.infer<typeof registerDto>;

export { registerDto };