import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const criarComodo = async (req: Request, res: Response) => {
  const { imovelId, tipo, numero } = req.body;

  if (!imovelId || !tipo || !numero) {
    return res.status(422).json({
      mensagem: "Preencha todos os campos obrigatórios para criar o Comodo.",
    });
  } else {
    try {
      const comodo = await prisma.comodo.create({
        data: {
          imovelId,
          tipo,
          numero,
        },
      });

      return res.json(comodo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao criar Comodo." });
    }
  }
};

export const pegarComodos = async (req: Request, res: Response) => {
  const comodos = await prisma.comodo.findMany();
  return res.json(comodos);
};

export const pegarComodoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const comodo = await prisma.comodo.findUnique({
    where: { id },
  });

  if (!comodo) {
    return res.status(404).json({ mensagem: "Comodo não encontrado." });
  }

  return res.json(comodo);
};

export const excluirComodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.comodo.delete({
      where: { id },
    });

    return res.json({ mensagem: "Comodo excluído com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao excluir o Comodo." });
  }
};

const ComodoController = {
  criarComodo,
  pegarComodos,
  pegarComodoPorId,
  excluirComodo,
};
export default ComodoController;
