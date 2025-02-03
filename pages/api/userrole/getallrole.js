import { connectDb } from "@/helper/db";
import Userrole from "@/models/userrole";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

  const token = req.cookies.token;

  if (!token) {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
    return res.status(401).json({ status: "tokenerror", message: 'Token Missing!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDb();
    if (req.method === "GET") {
        try {
            const roles = await Userrole.find().populate("permissions", "permission");
            return res.status(200).json({ status: "success", data: roles });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }
    return res.status(405).json({ message: "Method not allowed" });
    
  } catch (error) {
    console.error('Error during token verification:', error.message);
    if (error.name === 'TokenExpiredError') {
      res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
      return res.status(401).json({ status: "tokenerror", message: 'Token Expired!' });
    }
    return res.status(401).json({ status: "error", message: 'Invalid Token!' });
  }
  }