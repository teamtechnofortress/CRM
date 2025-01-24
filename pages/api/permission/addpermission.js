import { connectDb } from "@/helper/db";
import Permission from "@/models/permission";

export default async function handler(req, res) {
  await connectDb();

  try {
    const permission = "vieworder";

    const u = new Permission({ permission });
    await u.save();

    res.status(200).json({ status: "success", msg: "Your permission has been created!" });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
}
