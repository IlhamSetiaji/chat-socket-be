import { prisma } from "../../../infrastructures/database/prisma-client";
import { User } from "../../entities/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepositoryImpl implements IUserRepository {
  async save(user: User): Promise<User> {
    const registeredUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });

    return new User(
      registeredUser.id,
      registeredUser.email,
      registeredUser.password,
      registeredUser.name ?? undefined
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    return new User(user.id, user.email, user.password, user.name ?? undefined);
  }
}
