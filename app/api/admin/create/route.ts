// app/api/admin/create/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { name, email, password, phone } = body;

        if (!email || !password) {
            return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, error: "Email already in use" }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const adminUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role: "admin",
            anonymous: false,
        });

        await adminUser.save();

        return NextResponse.json({ success: true, message: "Admin created successfully" });
    } catch (error) {
        console.error("Error creating admin:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
