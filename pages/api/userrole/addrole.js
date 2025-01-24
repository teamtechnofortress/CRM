import { connectDb } from "@/helper/db";
import Userrole from "@/models/userrole";

export default async function handler(req, res) {
  await connectDb();

  // Handle POST requests
  if (req.method === "POST") {
    try {
        const { role, permission } = req.body;

        // Ensure that role and permission are provided
        if (!role || !permission || permission.length === 0) {
            return res.status(400).json({ status: "error", message: "Role and permissions are required" });
        }

        // Create a new Userrole document with the received data
        const newRole = new Userrole({
            role,
            permissions: permission // This assumes 'permission' is an array of permission IDs
        });

        // Save the new role to the database
        await newRole.save();

        // Send a success response
        return res.status(200).json({ status: "success" });
        // return res.status(200).json({ status: "success", data: newRole });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  // For unsupported methods, return 405
  return res.status(405).json({ message: "Method not allowed" });
}
