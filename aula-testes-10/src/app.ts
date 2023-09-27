import express, { json, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import { getAccesses, registerAccess } from "./repository";


const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK!");
});

app.post("/accesses", async (req: Request, res: Response) => {
  try {
    const body = req.body as { username: string };
    if (!body.username) return res.send(400);

    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (Array.isArray(ip)) {
      ip = ip.join(" ");
    }

    const token = uuidv4();
    await registerAccess(ip, body.username, token);

    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.get("/accesses", async (req: Request, res: Response) => {
  try {
    const accesses = await getAccesses();
    res.send(accesses);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default app;