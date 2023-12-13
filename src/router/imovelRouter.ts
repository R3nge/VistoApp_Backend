import { Router } from "express";
import { ImovelController } from "../controller";

const router = Router();

router.post("/Imovel/createImovel", async (req, res) => {
  ImovelController.criarImovel(req, res);
});

router.get("/Imovel/PegarImoveis", async (req, res) => {
  ImovelController.pegarImoveis(req, res);
});

export default router;
