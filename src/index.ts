import { Elysia } from "elysia";
import { flightRoutes } from "./routes/flights.routes";
import swagger from "@elysiajs/swagger";
import { authRoutes } from "./routes/auth.routes";

const app = new Elysia()
  .use(swagger())
  .use(authRoutes)
  .use(flightRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
