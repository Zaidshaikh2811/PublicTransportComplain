import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendComplaintUpdateMail({
    to,
    subject,
    text,
    html,
}: {
    to: string;
    subject: string;
    text: string;
    html?: string;
}) {

    try {

        const mailOptions = {
            from: `"Support Team" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        };



        const info = await transporter.sendMail(mailOptions);

        return info;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
}


export async function sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
        from: `"Support Team" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    return transporter.sendMail(mailOptions);
}

