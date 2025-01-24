import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ valid: false, error: 'Token is invalid' });
    }
    return res.status(200).json({ valid: true, decoded });
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ valid: false, error: error.message });
  }
}
