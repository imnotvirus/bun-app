import { type Static, t } from "elysia";

const AddFlightDto = t.Object({
  origin: t.String(),
  destination: t.String(),
  departure: t.String(),
  airline: t.String(),
  price: t.Number(),
})

type AddFlightDto = Static<typeof AddFlightDto>;

export { AddFlightDto };
