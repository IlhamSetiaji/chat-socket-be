import { UserController } from "../applications/controllers/UserController";
import { LoginUserUseCase } from "../applications/use-cases/user/LoginUseCase";
import { RegisterUserUseCase } from "../applications/use-cases/user/RegisterUserUseCase";
import { UserRepositoryImpl } from "../domains/repositories/user/UserRepositoryImpl";

export class UserFactory {
  static makeUserController(): UserController {
    // repositories
    const userRepository = new UserRepositoryImpl();

    // use cases
    const registerUserUseCase = new RegisterUserUseCase(userRepository);
    const loginUserUseCase = new LoginUserUseCase(userRepository);

    // controllers
    const userController = new UserController(
      registerUserUseCase,
      loginUserUseCase
    );
    return userController;
  }
}
