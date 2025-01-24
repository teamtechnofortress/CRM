import { connectDb } from "@/helper/db";
import User from "@/models/User";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
    return res.status(401).json({ status: "tokenerror", message: 'Token Missing!' });
  }

  // Verify token and handle expiration errors
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is valid, connect to the database
    await connectDb();

    if (req.method === "GET") {
      try {
        const users = await User.find().populate('role', 'role');
        return res.status(200).json({ status: "success", data: users });
      } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
      }
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error('Error during token verification:', error.message);

    // Check if the error is a TokenExpiredError
    if (error.name === 'TokenExpiredError') {
      res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
      return res.status(401).json({ status: "tokenerror", message: 'Token Expired!' });
    }

    // Handle other errors (invalid token, etc.)
    return res.status(401).json({ status: "error", message: 'Invalid Token!' });
  }
}
