// controllers/imovel.controller.ts

import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const criarImovelEAssociarInquilino = async (req: Request, res: Response) => {
  const { icm, tipo, enderecoId } = req.body;

  if (!icm || !tipo || !enderecoId ) {
    return res.status(422).json({
      mensagem:
        "Preencha todos os campos obrigatórios para criar o Imóvel.",
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

      // Cria o Imóvel no banco de dados e associa ao Endereco existente
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

      // // Associa o Imóvel a um Inquilino usando o CPF do Inquilino
      // const inquilino = await prisma.inquilino.update({
      //   where: { cpf: inquilinoCpf },
      //   data: {
      //     aluga: {
      //       create: {
      //         imovel: {
      //           connect: {
      //             id: imovel.id,
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      // Retorna o Imóvel criado e associado como resposta
      return res.json({ imovel });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ mensagem: "Erro ao criar Imóvel" });
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
  criarImovelEAssociarInquilino,
  pegarImoveis,
};

export default ImovelController;
