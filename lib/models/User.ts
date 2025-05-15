// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone?: string;
    anonymous: boolean;
    password: string;
    role: string;

}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        role: { type: String, default: "user" },
        anonymous: { type: Boolean, default: false },
        password: { type: String },
    },
    { timestamps: true }
);



export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
