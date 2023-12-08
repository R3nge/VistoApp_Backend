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

app.get("/", (req, res) => {
  res.send("Ta rodandooo!");
});

// Rota padrao usuario
app.get("/Endereco/PegarEnderecos", async (req, res) => {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  await EnderecoController.pegarEnderecos(req, res);
});

const PORT = 3001;

const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT}`)
);

export default app;
