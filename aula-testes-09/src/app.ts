import express, { json, Request, Response } from "express";
import bcrypt from "bcrypt";

import { UserInput, getUsers, createUser, getUserById, deleteUser, updateUser, getUserByEmail } from "./repository";


const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK!");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) return res.sendStatus(400);

  try {
    const user = await getUserById(id);
    if (!user) return res.sendStatus(404);

    return res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) return res.sendStatus(400);

  try {
    const user = await getUserById(id);
    if (!user) return res.sendStatus(404);

    await deleteUser(id);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) return res.sendStatus(400);

  const body = req.body as UserInput;

  try {
    const user = await getUserById(id);
    if (!user) return res.sendStatus(404);

    await updateUser(id, {
      ...body,
      password: bcrypt.hashSync(body.password, 10)
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  const data = req.body as UserInput;

  const user = await getUserByEmail(data.email);
  if (user) {
    return res.sendStatus(409);
  }

  try {
    const user = await createUser({
      ...data,
      password: bcrypt.hashSync(data.password, 10)
    });
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default app;