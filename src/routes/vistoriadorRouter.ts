import { Router } from "express";
import { VistoriadorController } from "../controller";

const router = Router();

router.post(
  "/Vistoriador/CreateVistoriador",
  async (req, res) => {
    VistoriadorController.criarVistoriador(req, res);
  }
);

router.get(
  "/Vistoriador/PegarVistoriadores",
  async (req, res) => {
    VistoriadorController.pegarVistoriadores(req, res);
  }
);

export default router;