import { AddFlightDto } from "../dtos/flights";
import flightsRepository from "../repositories/flights.repository";

export async function findAll() {
    const flights = await flightsRepository.findAll();

    return flights;
}

export async function findOne(id: string) {
    const flight = await flightsRepository.findOne(id);

    return flight;
}

export async function add(data: AddFlightDto) {
    const flight = await flightsRepository.add(data);

    return flight;
}

export async function update(id: string, data: AddFlightDto) {
    const flight = await flightsRepository.update(id, data);

    return flight;
}

export async function remove(id: string) {
    const flight = await flightsRepository.remove(id);

    return flight;
}
