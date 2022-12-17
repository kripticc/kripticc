import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "./user.class";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {

  if (req.method === "POST") {
    const user = await User.saveUser(req.body as User);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
    }
  }
}
