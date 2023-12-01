import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import {
  userRouter,
  permissionRouter,
  alugaRouter,
  comodoRouter,
  enderecoRouter,
  imovelRouter,
  inquilinoRouter,
  PropietarioRouter,
  vinculoRouter,
  vistoriadorRouter,
  // vistoriaRouter,
} from "../routes";
import { userCreateSchema, userLoginSchema } from "../schemas/userSchema";
import validate from "../middleware/zodMiddleware";
import EnderecoController from "../controller/EnderecoController";
const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(permissionRouter);
app.use(alugaRouter);
app.use(enderecoRouter);
app.use(imovelRouter);
app.use(comodoRouter);
app.use(inquilinoRouter);
app.use(PropietarioRouter);
app.use(vinculoRouter);
app.use(vistoriadorRouter);
// app.use(vistoriaRouter);

const port = process.env.PORT || 3308;
// // Rota padrão para a raiz
// app.get("/", (req, res) => {
//   res.send("Hello, world!"); // INSERIR LOGICA PARA ROTA RAIZ
// });

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
// Rota padrao usuario
app.get("/Endereco/PegarEnderecos", async (req, res) => {
  await EnderecoController.pegarEnderecos(req, res);
});

const start = (): void => {
  try {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
