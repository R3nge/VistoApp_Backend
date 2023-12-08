import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const criarImovel = async (req: Request, res: Response) => {
  const { icm, tipo, enderecoId } = req.body;

  if (!icm || !tipo || !enderecoId) {
    return res.status(422).json({
      mensagem: "Preencha todos os campos obrigatórios para criar o Imóvel.",
    });
  } else {
    try {
      // Verifica se o endereço com o ID fornecido existe
      const endereco = await prisma.endereco.findUnique({
        where: {
          id: enderecoId,
        },
      });

      if (!endereco) {
        return res.status(404).json({ mensagem: "Endereço não encontrado" });
      }

      // Cria o Imóvel no banco de dados e associa ao Endereço existente
      const imovel = await prisma.imovel.create({
        data: {
          icm,
          tipo,
          endereco: {
            connect: {
              id: enderecoId,
            },
          },
        },
      });

      // Retorna o Imóvel criado como resposta
      return res.json({ imovel });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao criar Imóvel" });
    }
  }
};

export const pegarImoveis = async (req: Request, res: Response) => {
  // Busca todos os Imóveis no banco de dados usando o Prisma
  const imoveis = await prisma.imovel.findMany();

  // Retorna a lista de Imóveis como resposta
  return res.json(imoveis);
};

const ImovelController = {
  criarImovel,
  pegarImoveis,
};

export default ImovelController;
