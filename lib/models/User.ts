// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone?: string;
    anonymous: boolean;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        anonymous: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
