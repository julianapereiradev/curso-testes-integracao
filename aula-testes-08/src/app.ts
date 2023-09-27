import express, { json, Request, Response } from "express";
import { ReservationInput, getReservations, createReservation } from "./repository";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK!");
});

app.get("/reservations", async (req: Request, res: Response) => {
  try {
    const reservations = await getReservations();
    res.send(reservations);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/reservations", async (req: Request, res: Response) => {
  const data = req.body as ReservationInput;
  try {
    const reservation = await createReservation(data);
    res.status(201).send(reservation);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default app;