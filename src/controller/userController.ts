/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const criarUsuario = async (req: Request, res: Response) => {
  const { email, password, fullName, birthDate, type, Role } = req.body || {};

  try {
    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Usuário já existe." });
    }

    // Gera o hash da senha
    const hash = await bcrypt.hash(password, saltRounds);

    // Divide o nome completo em partes
    const [firstName, middleName, lastName] = fullName.split(" ");

    console.log("birthDate antes:", birthDate);

    // Cria o usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        firstName,
        middleName,
        lastName,
        birthDate: new Date(birthDate).toISOString(),
        type: type || Role.User,
      },
    });

    console.log("Usuário criado:", user);

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Erro ao criar usuário." });
  } finally {
    await prisma.$disconnect();
  }
};

export const fazerLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  try {
    // Busca o usuário no banco de dados
    const login = await prisma.user.findUnique({
      where: { email },
      select: { email: true, password: true, type: true },
    });

    // Compara as senhas
    const match = await bcrypt.compare(password, String(login?.password));

    if (!login || !match) {
      return res.status(400).json({
        success: false,
        message: "Usuário não encontrado ou senha incorreta.",
      });
    }

    // Gera o token JWT
    const token = jwt.sign({ email, type: login?.type }, "senha_secreta");

    res.status(200).json({ jwt: `Bearer ${token}` });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Usuário incorreto." });
  } finally {
    await prisma.$disconnect();
  }
};

const userController = {
  criarUsuario,
  fazerLogin,
};

export default userController;
