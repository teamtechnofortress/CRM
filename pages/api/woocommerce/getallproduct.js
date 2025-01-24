import WooCommerc from "@/helper/woocommerce";


export default async function handler(req, res) {
  try {
    const response = await WooCommerc.get("products");

    // console.log("Response:", response.data);
    
    // Send the data with a 200 status code
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: response.data, 
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.response?.data || "An unexpected error occurred",
    });

  }
}
