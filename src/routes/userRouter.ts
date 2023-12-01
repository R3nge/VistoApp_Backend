import userController from "../controller/userController";
import { Router } from "express";
import { userCreateSchema, userLoginSchema } from "../schemas";
import { validate } from "../middleware";

const router = Router();

router.post(
  "/User/CreateUser",
  validate(userCreateSchema),
  async (req, res) => {
    userController.criarUsuario(req, res);
  }
);

router.post("/User/Login", validate(userLoginSchema), async (req, res) => {
  userController.fazerLogin(req, res);
});

export default router;
