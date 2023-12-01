import { prisma } from "../../database/prisma";
import { Request, Response } from "express";

export const changePermission = async (req: Request, res: Response) => {
  try {
    const { userId, type } = req.body ?? {};
    await prisma.user.update({
      where: { id: userId },
      data: {
        type: type,
      },
    });
    res
      .status(200)
      .json({ success: true, message: `Change Permission successfully.` });
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: "Failed to change permission." });
  }
};

const PermissionController = {
  changePermission,
};
export default PermissionController;
