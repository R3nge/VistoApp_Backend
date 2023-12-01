import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarInquilino = async (req: Request, res: Response) => {
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
    } else {
      // Verifique se o endereço com o ID fornecido existe
      const endereco = await prisma.endereco.findUnique({
        where: {
          id: enderecoId,
        },
      });

      if (!endereco) {
        errors.push("Endereço não encontrado para o ID fornecido: " + enderecoId);
      }
    }

    if (errors.length > 0) {
      return res.status(422).json({
        mensagem: "Por favor, corrija os seguintes erros:",
        errors,
      });
    }

    const inquilino = await prisma.inquilino.create({
      data: {
        cpf,
        name,
        tel,
        email,
        enderecoId,
      },
    });

    return res.json(inquilino);
  } catch (error) {
    console.error("Erro ao criar Inquilino", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Erro Prisma:", error.message, error.code);
    }

    return res.status(500).json({ mensagem: "Erro ao criar Inquilino." });
  } finally {
    await prisma.$disconnect();
  }
};

//PARA CRIAR UM INQUILINO COM UM IMOVEL JÁ ALUGADO DESCOMENTE

// export const criarInquilinoAlugado = async (req: Request, res: Response) => {
//   const { cpf, name, tel, email, enderecoId, imovelId } = req.body;

//   if (!cpf || !name || !tel || !email || !enderecoId || !imovelId) {
//     return res.status(422).json({
//       mensagem: "Para cadastrar um Inquilino, preencha todos os campos!",
//     });
//   } else {
//     try {
//       const inquilino = await prisma.inquilino.create({
//         data: {
//           cpf,
//           name,
//           tel,
//           email,
//           enderecoId,
//           aluga: {
//             create: {
//               imovelId,
//             },
//           },
//         },
// //       });

//       return res.json(inquilino);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ mensagem: "Erro ao criar inquilino." });
//     }
//   }
// };

// Obter todos os inquilinos
export const pegarInquilinos = async (req: Request, res: Response) => {
  // Busca todos os inquilinos no banco de dados usando o Prisma
  const inquilinos = await prisma.inquilino.findMany();

  // Retorna a lista de inquilinos como resposta
  return res.json(inquilinos);
};
function push(arg0: string) {
  throw new Error("Function not implemented.");
}


const InquilinoController = {
  criarInquilino,
  pegarInquilinos,
}
export default InquilinoController;





