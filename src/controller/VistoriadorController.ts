import { Request, Response } from "express";
import { prisma } from "../database/prisma";

// Criar um único Vistoriador
export const criarVistoriador = async (req: Request, res: Response) => {
  // Extrai os dados necessários do corpo da requisição
  const { cpf, nome, tel, email, enderecoId } = req.body;

  // Verifica se algum dos campos essenciais está ausente
  if (!cpf || !nome || !tel || !email || !enderecoId) {
    return res.status(422).json({
      mensagem:
        "Preencha todos os campos obrigatórios para criar o Vistoriador.",
    });
  } else {
    try {
      // Cria o Vistoriador no banco de dados
      const vistoriador = await prisma.vistoriador.create({
        data: {
          cpf,
          nome,
          tel,
          email,
          enderecoId,
        },
      });

      // Retorna o Vistoriador criado como resposta
      return res.json(vistoriador);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao criar Vistoriador." });
    }
  }
};

// Obter todos os Vistoriadores
export const pegarVistoriadores = async (req: Request, res: Response) => {
  // Busca todos os Vistoriadores no banco de dados usando o Prisma
  const vistoriadores = await prisma.vistoriador.findMany();

  // Retorna a lista de Vistoriadores como resposta
  return res.json(vistoriadores);
};

const VistoriadorController = {
  criarVistoriador,
  pegarVistoriadores,
}
export default VistoriadorController;

