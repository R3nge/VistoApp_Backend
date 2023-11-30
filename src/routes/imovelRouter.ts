import { Router } from "express";
import { ImovelController } from "../controller";

const router = Router();

router.post(
  "/Imovel/CreateImovelAssociado",
  async (req, res) => {
    ImovelController.criarImovelEAssociarInquilino(req, res);
  }
);

router.get(
  "/Imovel/PegarImoveis",
  async (req, res) => {
    ImovelController.pegarImoveis(req, res);
  }
);

export default router;