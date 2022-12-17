// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "./user.class";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method === "GET") {
    const user = await User.findUserByName(req.query.name as string);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
    }
  } else if (req.method === "POST") {
    const user = await User.updateUser(req.body as User);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
    }
  } else if(req.method === "DELETE") {
    const user = await User.deleteUser(req.body as User);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
    }
  }
}
