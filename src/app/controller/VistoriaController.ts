import { Request, Response } from "express";
import { prisma } from "../../database/prisma";

// Criar uma Vistoria
export const criarVistoria = async (req: Request, res: Response) => {
  // Extrai os dados necessários do corpo da requisição
  const { vistoriadorId, imovelId, componenteId } = req.body;

  // Verifica se algum dos campos essenciais está ausente
  if (!vistoriadorId || !imovelId || !componenteId) {
    return res.status(422).json({
      mensagem: "Preencha todos os campos obrigatórios para criar a Vistoria.",
    });
  } else {
    try {
      // Cria a Vistoria no banco de dados
      const vistoria = await prisma.vistoria.create({
        data: {
          vistoria: {
            connect: {
              id: vistoriadorId,
            },
          },
          imovel: {
            connect: {
              id: imovelId,
            },
          },
          componente: {
            connect: {
              id: componenteId,
            },
          },
        },
      });

      // Retorna a Vistoria criada como resposta
      return res.json(vistoria);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao criar a Vistoria." });
    }
  }
};

// Obter todas as Vistorias
export const pegarVistorias = async (req: Request, res: Response) => {
  // Busca todas as Vistorias no banco de dados usando o Prisma
  const vistorias = await prisma.vistoria.findMany();

  // Retorna a lista de Vistorias como resposta
  return res.json(vistorias);
};

const VistoriaController = {
  criarVistoria,
  pegarVistorias,
};
export default VistoriaController;
