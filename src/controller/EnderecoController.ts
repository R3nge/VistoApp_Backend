import { Request, Response } from "express";
import { prisma } from "../database/prisma";

const criarEndereco = async (req: Request, res: Response) => {
  const { rua, complemento, numero, bairro, cidade, estado, cep } = req.body;

  if (
    !rua ||
    !complemento ||
    !numero || // "numero" é tratado como uma string
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
        numero, // "numero" continua sendo uma string
        bairro,
        cidade,
        estado,
        cep,
      },
    });
    return res.json(endereco);
  }
};

export const pegarEnderecos = async (req: Request, res: Response) => {
  const enderecos = await prisma.endereco.findMany();
  return res.json(enderecos);
};


const EnderecoController = {
  criarEndereco,
  pegarEnderecos,
}
export default EnderecoController;

