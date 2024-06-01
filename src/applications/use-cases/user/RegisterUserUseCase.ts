import { User } from "../../../domains/entities/User";
import { IUserRepository } from "../../../domains/repositories/user/IUserRepository";
import { RegisterUserDTO } from "../../data-transfer-objects/user/RegisterUserDTO";

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: RegisterUserDTO): Promise<User> {
    const user = new User(data.email, data.password);
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const registeredUser = await this.userRepository.save(user);

    return registeredUser;
  }
}
