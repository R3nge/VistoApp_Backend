import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const Alugar = async (req: Request, res: Response) => {
  const { inquilinoId, imovelId } = req.body;

  if (!inquilinoId || !imovelId) {
    return res.status(422).json({
      mensagem:
        "Para alugar um imóvel, forneça o ID do inquilino e o ID do imóvel.",
    });
  } else {
    try {
      const aluguel = await prisma.aluga.create({
        data: {
          imovelId: imovelId,
          inquilinoId: inquilinoId,
        },
      });
      return res.json(aluguel);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao alugar imóvel." });
    }
  }
};

export const pegarAlugueis = async (req: Request, res: Response) => {
  const aluguel = await prisma.aluga.findMany();

  return res.json(aluguel);
};

const AlugaController = {
  Alugar,
  pegarAlugueis,
};
export default AlugaController;
