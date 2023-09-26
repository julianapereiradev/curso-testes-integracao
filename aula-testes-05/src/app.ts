import express, { Request, Response } from "express";

const app = express();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK!");
});

app.get("/fibonacci", (req: Request, res: Response) => {
  const elements = Number(req.query.elements);
  if (isNaN(elements) || (elements < 1 || elements > Number.MAX_VALUE)) {
    return res.sendStatus(400);
  }

  const sequence = fibonacciSequence(elements);
  res.send(sequence);
});

function fibonacciSequence(numberOfElements: number) {
  const sequence = [0, 1];
  for (let i = 2; i < numberOfElements; i++) {
    const nextNumber = sequence[i - 1] + sequence[i - 2];
    sequence.push(nextNumber);
  }

  return sequence;
}

export default app;