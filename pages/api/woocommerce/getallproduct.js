import WooCommerc from "@/helper/woocommerce";
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
  const token = req.cookies.token;

  if (!token) {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
    return res.status(401).json({ status: "tokenerror", message: 'Token Missing!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const response = await WooCommerc.get("products");

    // console.log("Response:", response.data);

    if (!response || response.status !== 200) {
      return res.status(500).json({
        success: "error",
        message: "Failed to fetch products",
      });
    }else{
      return res.status(200).json({
        success: "success",
        message: "Products fetched successfully",
        data: response.data, 
      });
    }
    
  } catch (error) {
    console.error("Error:", error);
    if (error.name === 'TokenExpiredError') {
      res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
      return res.status(401).json({ status: "tokenerror", message: 'Token Expired!' });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.response?.data || "An unexpected error occurred",
    });

  }
}
