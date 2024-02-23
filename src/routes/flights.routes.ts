import { Elysia, t } from "elysia";
import { add, findAll, findOne, remove, update } from "../handlers/flight.handler";
import { AddFlightDto } from "../dtos/flights";
import { ListFlightsDto } from "../dtos/flights/list.dto";

export const flightRoutes = (app: Elysia) => (
    app.get("/flights", async () => {
        const result = await findAll();
        return result;
    }),
    app.get("/flights/:id", async (req) => {
        const flightId = req.params.id;
        const result = await findOne(flightId);
        
        if (!result) {
            return "Flight not found";
        }
        
        return result;
    }),
    app.post("/flights", async (req) => {
        const result = await add(req.body);
        return result;
    }, {
        body: AddFlightDto
    }),
    app.put("/flights/:id", async (req) => {
        const result = await update(req.params.id, req.body);
        return result;
    },{
        body: AddFlightDto
    
    }),
    app.delete("/flights/:id", async (req) => {
        const result = await remove(req.params.id);
        return result;
    })

)