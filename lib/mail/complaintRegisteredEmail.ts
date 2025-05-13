import { sendEmail } from "./sendEmail";

export async function sendComplaintRegisteredEmail(to: string, complaintId: string) {

    const html = `<p>Your complaint with ID <strong>${complaintId}</strong> has been successfully registered. We'll keep you updated.</p>`;
    await sendEmail(to, "Complaint Registered", html);
}