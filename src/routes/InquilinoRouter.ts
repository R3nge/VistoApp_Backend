import { Router } from "express";
import { InquilinoController } from "../controller";

const router = Router();

router.post(
  "/Inquilino/CreateInquilino",
  async (req, res) => {
    InquilinoController.criarInquilino(req, res);
  }
);

router.get(
  "/Inquilino/PegarInquilinos",
  async (req, res) => {
    InquilinoController.pegarInquilinos(req, res);
  }
);
export default router;