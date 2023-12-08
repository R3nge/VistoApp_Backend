import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

function checkPermission(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.header("Authorization");

  if (tokenHeader === undefined) {
    return res.json({ status: 403, message: "Acesso negado." });
  }

  const [prefix, token] = tokenHeader.split(" ");

  const permission = jwt.decode(token) as JwtPayload;

  if (permission?.type === "Member") {
    res.json({ status: 403, message: "Acesso negado." });
  }

  next();
}

export default checkPermission;
