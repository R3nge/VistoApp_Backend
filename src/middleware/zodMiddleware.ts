
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

//Realiza validações 
const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      return res.status(400).json(err);
    }
  };

export default validate;