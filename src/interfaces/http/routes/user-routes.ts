import { Request, Response, Router } from "express";
import { UserFactory } from "../../../factories/UserFactory";
import { authMiddleware } from "../../../middlewares/AuthMiddleware";

const userRoutes = Router();
const userController = UserFactory.makeUserController();

userRoutes.post("/register", (req: Request, res: Response) =>
  userController.handleRegisterUser(req, res)
);
userRoutes.post("/login", (req: Request, res: Response) =>
  userController.handleUserLogin(req, res)
);
userRoutes.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.json({ message: `Hello user ${(req as any).userId}` });
});

export { userRoutes };
