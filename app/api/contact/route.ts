// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail/sendEmail";

export async function POST(req: Request) {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const html = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br />${message}</p>
    `;

    try {
        if (!process.env.EMAIL_USER) {
            return NextResponse.json({ error: "Email configuration is missing" }, { status: 500 });
        }
        await sendEmail(process.env.EMAIL_USER, subject, html); // Your support email
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }
}
