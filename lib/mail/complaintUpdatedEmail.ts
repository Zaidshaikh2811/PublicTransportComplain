import { sendEmail } from "./sendEmail";

export async function sendComplaintUpdatedEmail(to: string, complaintId: string, status: string) {
    const html = `<p>The status of your complaint (ID: <strong>${complaintId}</strong>) has been updated to: <strong>${status}</strong>.</p>`;
    await sendEmail(to, "Complaint Update", html);
}