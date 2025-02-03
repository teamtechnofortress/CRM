// Correct import
import { connectDb } from '@/helper/db';
import User from '@/models/User';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { serialize } from 'cookie';


export default async function handler(req, res) {

    try{
    // let hex = require('crypto').randomBytes(64).toString('hex');
    // console.log(hex);
    await connectDb(); 
    if (req.method === "POST") {
        const { email,password } = req.body; 
        if (!email) {
            return res.status(400).json({ status: 'error', message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ status: 'error', message: 'Password is required' });
        }
        
        let user = await User.findOne({ "email": req.body.email }); 
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        } 
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        }); 
        res.setHeader('Set-Cookie', serialize('token', token, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 }));
        // Handle the POST request logic here
       return res.status(200).json({status:'Success', token: token });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }

    }catch(error){
        return res.status(401).json({ status: "error", message: error });
    }
}
