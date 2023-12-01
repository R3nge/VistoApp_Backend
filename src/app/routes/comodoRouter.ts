import { Router } from "express";
import { ComodoController } from "../controller";

const router = Router();

router.post("/Comodo/CreateComodo", async (req, res) => {
  ComodoController.criarComodo(req, res);
});

router.get("/Comodo/PegarComodos", async (req, res) => {
  ComodoController.pegarComodos(req, res);
});

router.get("/Comodo/PegarComodoPorId", async (req, res) => {
  ComodoController.pegarComodoPorId(req, res);
});

router.delete("/Comodo/ExcluiComodo", async (req, res) => {
  ComodoController.excluirComodo(req, res);
});
export default router;
