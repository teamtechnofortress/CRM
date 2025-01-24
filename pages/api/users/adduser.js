import { connectDb } from "@/helper/db";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
  await connectDb();



//   const data = req.body;
//   console.log(data);

    if (req.method === "POST") {
        try {
            const {firstname,lastname,email,password,phone,role} = req.body;

            if (!password) {
                return res.status(400).json({ status: 'error', message: 'Password is required' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new User document with the received data
            const newUser = new User({
                firstname,
                lastname,
                email,
                password:hashedPassword,
                phone,
                role
            });
    
            // Save the new role to the database
            await newUser.save();
    
            // Send a success response
            return res.status(200).json({ status: "success" });
            // return res.status(200).json({ status: "success", data: newRole });
        } catch (error) {
          return res.status(500).json({ status: "error", message: error.message });
        }
      }
    
      // For unsupported methods, return 405
      return res.status(405).json({ message: "Method not allowed" });


    res.status(200).json({ status: "success" });
}
