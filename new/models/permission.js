import mongoose from "mongoose";

const { Schema } = mongoose; 

const permissionSchema = new Schema({
    
    permission: { type: String, required: true },
 
}, { timestamps: true });

export default mongoose.models.Permission || mongoose.model("Permission", permissionSchema);