import { Router } from "express";
import { EnderecoController } from "../controller";

const router = Router();

router.post("/Endereco/CreateEndereco", async (req, res) => {
  EnderecoController.criarEndereco(req, res);
});

router.get("/Endereco/PegarEnderecos", async (req, res) => {
  EnderecoController.pegarEnderecos(req, res);
});

export default router;
