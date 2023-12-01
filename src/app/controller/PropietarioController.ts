import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const criarProprietario = async (req: Request, res: Response) => {
  try {
    const { cpf, name, tel, email, enderecoId } = req.body;
    const errors = [];

    if (!cpf) {
      errors.push("O campo 'cpf' é obrigatório.");
    }

    if (!name) {
      errors.push("O campo 'name' é obrigatório.");
    }

    if (!tel) {
      errors.push("O campo 'tel' é obrigatório.");
    }

    if (!email) {
      errors.push("O campo 'email' é obrigatório.");
    }

    if (!enderecoId) {
      errors.push("O campo 'enderecoId' é obrigatório.");
    }

    if (errors.length > 0) {
      return res.status(422).json({
        mensagem: "Por favor, corrija os seguintes erros:",
        errors,
      });
    }

    const endereco = await prisma.endereco.findUnique({
      where: {
        id: enderecoId,
      },
    });

    if (!endereco) {
      return res.status(404).json({ mensagem: "Endereço não encontrado" });
    }

    const proprietario = await prisma.proprietario.create({
      data: {
        cpf,
        name,
        tel,
        email,
        endereco: {
          connect: {
            id: enderecoId,
          },
        },
      },
    });

    return res.json(proprietario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  } finally {
    await prisma.$disconnect();
  }
};

export const pegarProprietarios = async (req: Request, res: Response) => {
  try {
    const proprietarios = await prisma.proprietario.findMany();

    return res.json(proprietarios);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  } finally {
    await prisma.$disconnect();
  }
};

export const pegarUnicoProprietario = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;

    const proprietario = await prisma.proprietario.findUnique({
      where: {
        cpf,
      },
      include: {
        endereco: true,
      },
    });

    if (!proprietario) {
      return res.status(404).json({ mensagem: "Proprietário não encontrado" });
    }

    return res.status(200).json(proprietario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  } finally {
    await prisma.$disconnect();
  }
};

const PropietarioController = {
  criarProprietario,
  pegarProprietarios,
  pegarUnicoProprietario,
}
export default PropietarioController;


