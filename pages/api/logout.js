import { serialize } from 'cookie';


export default function handler(req, res) {

    if (req.method === 'GET') {
        res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
        res.status(200).json({status:"success", message: 'Logout successful' });
    }else{
        res.status(405).json({status:"error", message: 'Method not allowed' });
    }
  }
  