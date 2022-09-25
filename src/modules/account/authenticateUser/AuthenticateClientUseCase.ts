import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  // receive username and password
  async execute({ username, password }: IAuthenticateClient) {
    // verify if username is registered
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    // verify if password match username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    //generate token
    const token = sign({ username }, "e10adc3949ba59abbe56e057f20f883e", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
