import { connectDb } from "@/helper/db";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
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
    if (req.method === "POST") {
      try {
          const {firstname,lastname,email,password,phone,role} = req.body;
          if (!password) {
              return res.status(400).json({ status: 'error', message: 'Password is required' });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
              firstname,
              lastname,
              email,
              password:hashedPassword,
              phone,
              role
          });
          await newUser.save();
          return res.status(200).json({ status: "success" });
      } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
      }
    }
  } catch (error) {
    console.error('Error during token verification:', error.message);
    if (error.name === 'TokenExpiredError') {
      res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
      return res.status(401).json({ status: "tokenerror", message: 'Token Expired!' });
    }
    return res.status(401).json({ status: "error", message: 'Invalid Token!' });
  }
}
