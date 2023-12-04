// EnderecoController.ts
import { Request, Response } from "express";
import { prisma } from "../database/prisma";

const criarEndereco = async (req: Request, res: Response) => {
  try {
    const { rua, complemento, numero, bairro, cidade, estado, cep } = req.body;

    console.log("Recebendo dados para criar endereço:", req.body);

    if (
      !rua ||
      !complemento ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado ||
      !cep
    ) {
      return res.status(422).json({
        mensagem: "Para cadastrar um Endereço preencha todos os campos!",
      });
    } else {
      const endereco = await prisma.endereco.create({
        data: {
          rua,
          complemento,
          numero,
          bairro,
          cidade,
          estado,
          cep,
        },
      });

      console.log("Endereço criado com sucesso:", endereco);

      res.json(endereco);
    }
  } catch (error) {
    console.error("Erro ao criar endereço:", error);
    res.status(500).json({ error: "Erro interno ao criar endereço" });
  }
};

export const pegarEnderecos = async (req: Request, res: Response) => {
  try {
    console.log("Buscando endereços...");

    const enderecos = await prisma.endereco.findMany();

    console.log("Endereços encontrados:", enderecos);

    res.json(enderecos);
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    res.status(500).json({ error: "Erro interno ao buscar endereços" });
  }
};

const EnderecoController = {
  criarEndereco,
  pegarEnderecos,
};

export default EnderecoController;
