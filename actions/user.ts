import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';



export async function createUser(formData: { name: string; email: string; phone: string; anonymous: boolean }) {
    try {

        await connectToDatabase();

        const newUser = await User.create({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            anonymous: formData.anonymous,
        });

        return { success: true, data: newUser };
    } catch (error) {
        return { success: false, error };
    }
}

export async function loginUser(formData: { email: string; password: string }) {
    try {

        await connectToDatabase();
        const user = await User.findOne({ email: formData.email });
        if (!user) throw new Error("User not found");


        return { success: true, data: user };
    } catch (error) {
        return { success: false, error };
    }
}
