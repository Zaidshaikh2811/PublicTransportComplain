import { sendEmail } from "./sendEmail";

export async function sendWelcomeEmail(to: string, name: string) {
    const html = `<h2>Welcome, ${name}!</h2><p>Thank you for joining our platform.</p>`;
    await sendEmail(to, "Welcome to Our Service", html);
}