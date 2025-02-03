import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';


export default function handler(req, res) {
    const token = req.cookies.token;

    if (!token) {
        res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
        return res.status(401).json({ status: "tokenerror", message: 'Token Missing!' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (req.method === 'GET') {
            res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
            res.status(200).json({status:"success", message: 'Logout successful' });
        }else{
            res.status(405).json({status:"error", message: 'Method not allowed' });
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
  