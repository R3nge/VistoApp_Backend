import { Router } from "express";
import { PropietarioController } from "../controller";

const router = Router();

router.post(
  "/Propietario/CreatePropietario",
  async (req, res) => {
    PropietarioController.criarProprietario(req, res);
  }
);

router.get(
  "/Propietario/PegarPropietario",
  async (req, res) => {
    PropietarioController.pegarProprietarios(req, res);
  }
);

router.get(
  "/Propietario/PegarPropietarioPorId",
  async (req, res) => {
    PropietarioController.pegarUnicoProprietario(req, res);
  }
);

export default router;