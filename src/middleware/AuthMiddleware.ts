import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader) {
    return res.status(400).json({ success: false, message: "Token inválido." });
  }

  const [prefix, token] = tokenHeader.split(" ");

  if (prefix !== "Bearer")
    return res
      .status(401)
      .json({ success: false, message: "Formato do token inválido." });

  if (!token) {
    return res.status(401).json({ success: false, message: "Token ausente." });
  }

  jwt.verify(token, "password", (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Não autorizado." });
    }
    req.user = user;
    next();
  });
}

export default authenticateJWT;
