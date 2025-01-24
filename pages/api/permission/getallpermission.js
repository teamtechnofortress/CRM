import { connectDb } from "@/helper/db";
import Permission from "@/models/permission";

export default async function handler(req, res) {

    await connectDb();

    // Handle GET request to fetch all permissions
    if (req.method === "GET") {
        try {
            const permissions = await Permission.find(); // Retrieve all permissions
            return res.status(200).json({ status: "success", data: permissions });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    // Return 405 for other HTTP methods
    return res.status(405).json({ message: "Method not allowed" });
}
