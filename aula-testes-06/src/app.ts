import express, { Request, Response } from "express";

const app = express();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK!");
});

app.get("/event", (req: Request, res: Response) => {
  res.send({
    id: 1,
    title: "Super Event!",
    image: "https://img.freepik.com/fotos-gratis/publico-animado-assistindo-fogos-de-artificio-de-confete-e-se-divertindo-no-festival-de-musica-a-noite-copiar-espaco_637285-559.jpg",
    date: "2023-07-21T00:00:00.000Z"
  });
});

export default app;