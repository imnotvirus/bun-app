import { Elysia, t } from "elysia";
import { findUserByEmail, register } from "../handlers/auth.handler";
import { z } from "zod";
import { registerDto } from "../dtos/auth/register.dto";
import ErrorRequest from "../aux/Error";
import RequestError from "../aux/Error";
import { LoginDto } from "../dtos/auth/login.dto";
import { jwt } from "@elysiajs/jwt";

export const authRoutes = (app: Elysia) => (
  app
    .use(
      jwt({
        secret: "secret",
        exp: "30min",
      })
    )
    .post("/auth/login", async ({ body, set, jwt }) => {
      const bodyParsed = LoginDto.safeParse(body);

      if (!bodyParsed.success) {
        set.status = 400;

        const errors = bodyParsed.error.errors.map((error) => {
          return {
            field: error.path.join("."),
            message: error.message,
          };
        });

        return {
          success: false,
          errors,
        };
      }
      const { email, password } = bodyParsed.data;

      const user = await findUserByEmail(email);

      if (!user) {
        set.status = 400;
        throw new RequestError("Invalid credetials", 400);
      }

      const passwordMatch = await Bun.password.verify(password, user.password);
      if (!passwordMatch) {
        set.status = 400;
        throw new RequestError("Invalid credetials", 400);
      }
      const { password: _, ...rest } = user;

      const token = await jwt.sign({
        ...rest,
      });

      return {
        token,
      };
    })
    .post("auth/revalidate-token", async ({ headers, jwt, set }) => {
      const token = headers.authorization?.split(" ")[1];

      if (!token) {
        set.status = 401;
        throw new RequestError("Unauthorized", 401);
      }

      try {
        const decodedToken = await jwt.verify(token);

        if (!decodedToken) {
          set.status = 401;
          throw new RequestError("Unauthorized", 401);
        }

        const newToken = await jwt.sign(decodedToken);

        return {
          token: newToken,
        };
      } catch (error) {
        set.status = 401;
        throw new RequestError("Invalid token", 401);
      }
    }),
  app.post("/auth/register", async ({ body, set }) => {
    const bodyParsed = registerDto.safeParse(body);

    if (!bodyParsed.success) {
      set.status = 400;

      const errors = bodyParsed.error.errors.map((error) => {
        return {
          field: error.path.join("."),
          message: error.message,
        };
      });

      return {
        success: false,
        errors,
      };
    }

    const { email, password, name } = bodyParsed.data;

    const userExist = await findUserByEmail(email);

    if (userExist) {
      set.status = 400;
      throw new RequestError("User already exists", 400);
    }

    const newUser = await register({ email, password, name });

    return newUser;
  })
);
