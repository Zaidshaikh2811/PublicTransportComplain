// models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';
export interface IUser extends Document {
    name: string;
    email: string;
    phone?: string;
    anonymous: boolean;
    password: string;

}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        anonymous: { type: Boolean, default: false },
        password: { type: String },
    },
    { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password!, salt);
        next();
    } catch (err) {
        next(err as Error);
    }
});

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
