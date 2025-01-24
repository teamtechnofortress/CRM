import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema({

    role: { type: String, required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
 
}, { timestamps: true });   

export default mongoose.models.Role || mongoose.model("Role", roleSchema);