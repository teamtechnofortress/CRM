import { connectDb } from "@/helper/db";
import Permission from "@/models/permission";

export default async function handler(req, res) {

    await connectDb();
    
    // let permission="deletecoustomer";

    // const u = new Permission({permission});
    // await u.save();

    res.status(200).json({ status:"success", msg: "Your permission has been created!" });

}