import { Request, Response } from "express";
import { RegisterUserUseCase } from "../use-cases/user/RegisterUserUseCase";
import { LoginUserUseCase } from "../use-cases/user/LoginUseCase";

export class UserController {
  constructor(private registerUserUseCase: RegisterUserUseCase, private loginUserUseCase: LoginUserUseCase) {}

  handleRegisterUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { email, password, name } = request.body;

    try {
      const user = await this.registerUserUseCase.execute({
        email,
        password,
        name,
      });
      return response.status(201).send({
        message: "User created successfully",
        data: {
          email: user.email,
          name: user.name,
        },
      });
    } catch (err) {
      return response.status(400).json({ message: (err as any).message });
    }
  };

  async handleUserLogin(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const token = await this.loginUserUseCase.execute({ email, password });
      return response.json({ token });
    } catch (err) {
      return response.status(401).json({ message: (err as any).message });
    }
  }
}
