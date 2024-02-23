import { Static, t } from "elysia";
import { infer, z } from "zod";

const LoginDto = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginDto = z.infer<typeof LoginDto>;
export { LoginDto };
