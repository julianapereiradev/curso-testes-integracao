import { UserInput } from "repository";

export function createUser(): UserInput {
  return {
    email: "teste@teste.com.br",
    password: "teste"
  };
}
