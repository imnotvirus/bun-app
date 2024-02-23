import { Static, t } from "elysia";

const ListFlightsDto = t.Array(
  t.Object({
    origin: t.String(),
    destination: t.String(),
    departure: t.String(),
    airline: t.String(),
    price: t.Number(),
    bookings: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        email: t.String(),
        phone: t.String(),
        seat: t.String(),
      })
    ),
  })
);

type ListFlightsDto = Static<typeof ListFlightsDto>;

export { ListFlightsDto };
