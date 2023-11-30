import { Router } from "express";
import {
  criarUsuario,
  pegarUsuarios,
  deletarUsuarios,
  pegarUnicoUsuario,
} from "./controller/userController";
import { criarAcesso, pegarAcessos } from "./controller/AcessoController";
import { logar } from "./controller/PermissionController";
import { autenticaMiddleware } from "./middleware/AuthMiddleware";
import {
  criarProprietario,
  pegarProprietarios,
  pegarUnicoProprietario,
} from "./controller/PropietarioController";
import { Alugar, pegarInquilinos } from "./controller/AlugaController";
import { criarEndereco, pegarEnderecos } from "./controller/EnderecoController";
import {
  criarImovelEAssociarInquilino,
  pegarImoveis,
} from "./controller/ImovelController";
import { criarInquilino } from "./controller/InquilinoController";
import {
  criarVistoriador,
  pegarVistoriadores,
} from "./controller/VistoriadorController";
import {
  criarComodo,
  pegarComodos,
  pegarComodoPorId,
  excluirComodo,
} from "./controller/ComodoController";
import { criarVinculo, pegarVinculos } from "./controller/VinculoController";

export const rotas = Router();

rotas.get("/", (req, res) => {
  // rota inicial
  res.render("cadastro/usuario");
});

// //ROTA USUARIO DESPROTEGIDA PARA TESTE
rotas.post("/cadastrar_usuario", criarUsuario);
rotas.delete("/deletar_todos_usuarios", deletarUsuarios);
rotas.get("/buscar_usuarios", pegarUsuarios);
rotas.post("/buscar_usuario_logado", pegarUnicoUsuario);

//ATUTTENTICACAO
rotas.post("/logar", logar);

//USUARIO Protegida
// rotas.post("/cadastrar_usuario", autenticaMiddleware([""]), criarUsuario);
// rotas.delete(
//   "/deletar_todos_usuarios",
//   autenticaMiddleware(["Adm"]),
//   deletarUsuarios
// );
// rotas.get("/buscar_usuarios", autenticaMiddleware(["Adm"]), pegarUsuarios);
// rotas.post(
//   "/buscar_usuario_logado",
//   autenticaMiddleware(["Adm", "Vendedor", "Comprador"]),
//   pegarUnicoUsuario
// );

//ACESSOs
rotas.post("/cadastrar_acesso", autenticaMiddleware(["", "", ""]), criarAcesso);
rotas.get("/buscar_acessos", autenticaMiddleware(["", ""]), pegarAcessos);
//Proprietario
rotas.post(
  "/cadastrar_proprietario",

  criarProprietario
);
rotas.get("/buscar_proprietarios", pegarProprietarios);
rotas.post("/buscar_proprietario_logado", pegarUnicoProprietario);

// ENDERECO

rotas.post("/cadastrar_endereco", criarEndereco);
rotas.get("/buscar_endereco", pegarEnderecos);

// IMOVEL

rotas.post(
  "/cadastrar_imovelassociado",
  autenticaMiddleware([""]),
  criarImovelEAssociarInquilino
);
rotas.get("/buscar_imovel", autenticaMiddleware([""]), pegarImoveis);

//Inquilino

rotas.post("/cadastrar_inquilino", criarInquilino);
// rotas.post("/cadastrar_inquilinoalugado", criarInquilinoAlugado);
rotas.get("/buscar_inquilinos", pegarInquilinos);

//VISTORIADOR

rotas.post(
  "/cadastrar_vistoriador",
  autenticaMiddleware([""]),
  criarVistoriador
);
rotas.get(
  "/buscar_vistoriadores",
  autenticaMiddleware([""]),
  pegarVistoriadores
);

//COMODO/
rotas.post("/cadastrar_comodo", autenticaMiddleware([""]), criarComodo);
rotas.get("/buscar_comodos", autenticaMiddleware([""]), pegarComodos);
rotas.get("/buscar_comodo", autenticaMiddleware([""]), pegarComodoPorId);
rotas.delete("/deletar_comodos", autenticaMiddleware([""]), excluirComodo);

//Vinculo

rotas.post("/cadastrar_vinculo", criarVinculo);
rotas.get("/buscar_vinculos", pegarVinculos);
