"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema } from "@/lib/validation/userSchema";
import { sendWelcomeEmail } from "@/lib/mail/welcomeEmail";
import { loginSchema } from "@/lib/validation/userSchema";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
import { cookies } from 'next/headers'
interface CreateUserFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    anonymous?: boolean;
}

export async function createUser(formData: CreateUserFormData) {
    try {
        await connectToDatabase();

        // ✅ Validate input
        const parsed = registerSchema.safeParse(formData);
        if (!parsed.success) {
            return { success: false, error: parsed.error.errors[0].message };
        }

        const { name, email, phone, password, anonymous } = parsed.data;

        // 🔍 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, error: "Email already in use" };
        }


        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            anonymous,
            password: hashedPassword
        });


        await newUser.save();

        await sendWelcomeEmail(email, name);

        return { success: true, message: "User created successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Server error" };
    }
}


interface LoginUserFormData {
    email: string;
    password: string;
}

export async function loginUser(formData: LoginUserFormData) {
    try {
        await connectToDatabase();

        const parsed = loginSchema.safeParse(formData);
        if (!parsed.success) {
            return { success: false, error: parsed.error.errors[0].message };
        }

        const { email, password } = parsed.data;

        const user = await User.findOne({ email });
        if (!user) return { success: false, error: "User not found" };
        console.log(email, password);
        console.log(user.password);

        const isPasswordValid = await bcrypt.compare(password, user.password || "");
        console.log(isPasswordValid);

        if (!isPasswordValid) return { success: false, error: "Invalid credentials" };

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        const Cookies = await cookies()

        Cookies.set({
            name: "auth",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 // 1 day
        });

        // Cookies.set("auth", token, {
        //     expires: 60 * 60 * 24,         // 1 day
        //     path: "/",          // Accessible across entire site
        //     sameSite: "strict",  // CSRF protection
        //     secure: process.env.NODE_ENV === "production" // HTTPS only in production
        // });

        return { success: true, message: "Logged in successfully", token, user: email };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Server error" };
    }
}


export const logoutUser = async () => {
    try {
        return { success: true, message: "Logged out successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Server error" };
    }
};


export async function checkCookies() {
    // const cookieStore = await cookies();
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;

    console.log(token);

    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        let email
        if (typeof decodedToken !== 'string' && 'email' in decodedToken) {
            email = decodedToken.email;
        } else {
            return { success: false, message: "Invalid token" };
        }
        return { success: true, email };
    } else {
        return { success: false, message: "User is not logged in" };
    }

}