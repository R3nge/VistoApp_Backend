require("dotenv").config();
import express from "express";
import cors from "cors";
import {
  managerRouter,
  userRouter,
  permissionRouter,
  memberRouter,
  alugaRouter,
  comodoRouter,
  enderecoRouter,
  imovelRouter,
  inquilinoRouter,
  PropietarioRouter,
  vinculoRouter,
  vistoriadorRouter,
  vistoriaRouter,
} from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(managerRouter);
app.use(userRouter);
app.use(permissionRouter);
app.use(memberRouter);
app.use(alugaRouter);
app.use(enderecoRouter);
app.use(imovelRouter);
app.use(comodoRouter);
app.use(inquilinoRouter);
app.use(PropietarioRouter);
app.use(vinculoRouter);
app.use(vistoriadorRouter);
app.use(vistoriaRouter);

const port = process.env.PORT || 3308;

// Rota padrão para a raiz
app.get("/User", (req, res) => {
  res.send("Hello, world!"); // INSERIR LOGICA PARA ROTA RAIZ
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
