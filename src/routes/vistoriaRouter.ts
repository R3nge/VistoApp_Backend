import { Router } from "express";
import { VistoriaController } from "../controller";

const router = Router();

router.post(
  "/Vistoria/CreateVistoria",
  async (req, res) => {
    VistoriaController.criarVistoria(req, res);
  }
);

router.get(
  "/Vistoria/PegarVistorias",
  async (req, res) => {
    VistoriaController.pegarVistorias(req, res);
  }
);

export default router;