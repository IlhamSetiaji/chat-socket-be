import { IUserRepository } from "../../../domains/repositories/user/IUserRepository";
import { comparePassword, generateToken } from "../../../utils/auth";
import { LoginUserDTO } from "../../data-transfer-objects/user/LoginUserDTO";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginUserDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id as string);
    return token;
  }
}
