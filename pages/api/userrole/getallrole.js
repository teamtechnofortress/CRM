import { connectDb } from "@/helper/db";
import User from "@/models/User";
import Userrole from "@/models/userrole";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

  console.log('API Hit');
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
    return res.status(401).json({ status: "tokenerror", message: 'Token Missing!' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDb();
    // Handle GET requests
    if (req.method === "GET") {
        try {
            // Fetch all roles from the database
            const roles = await Userrole.find().populate("permissions", "permission");

            console.log('Role:', roles);
            return res.status(200).json({ status: "success", data: roles });

        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
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
    // For unsupported methods, return 405
    return res.status(405).json({ message: "Method not allowed" });
  }