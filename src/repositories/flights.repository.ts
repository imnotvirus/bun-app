import prisma from "../database/prisma";
import { AddFlightDto } from "../dtos/flights";

class FlightRepository {
  async findAll() {
    return await prisma.flight.findMany({
      orderBy: {
        departure: "desc",
      },
      include: {
        bookings: true,
      },
    });
  }

  async findOne(id: string) {
    const flight = await prisma.flight.findUnique({
      where: {
        id,
      },
      include: {
        bookings: true,
      },
    });

    return flight;
  }

  async add(data: AddFlightDto) {
    const { departure, ...rest } = data;
    return await prisma.flight.create({
      data: {
        departure: new Date(departure),
        ...rest,
      },
    });
  }

  async update(id: string, data: AddFlightDto) {
    const { departure, ...rest } = data;
    return await prisma.flight.update({
      where: {
        id,
      },
      data: {
        departure: new Date(departure),
        ...rest,
      },
    });
  }

  async remove(id: string) {
    return await prisma.flight.delete({
      where: {
        id,
      },
    });
  }
}

export default new FlightRepository();
