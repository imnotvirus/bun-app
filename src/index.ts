import { Elysia } from "elysia";
import { flightRoutes } from "./routes/flights.routes";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
.use(swagger())
.use(flightRoutes)  
.get("/", () => ({
    message: "Hello World!",
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
