"use server";
import { connectToDatabase } from '@/lib/mongodb';
import Complaint from '@/lib/models/Complaint';
import { v2 as cloudinary } from 'cloudinary';
import { sendComplaintRegisteredEmail } from '@/lib/mail/complaintRegisteredEmail';


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface ComplaintPayload {
    transportMode: string;
    issueType: string;
    vehicleNumber: string;
    location: string;
    dateOfIncident: string;
    description: string;
    isAnonymous: boolean;
    contactName?: string;
    contactInfo?: string;
    mediaFiles?: File[];
}

// Upload a file to Cloudinary
export async function uploadToCloudinary(file: File): Promise<{ url: string; publicId: string }> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'complaints',
                resource_type: file.type.startsWith('video') ? 'video' : 'image',
            },
            (error, result) => {
                if (error) reject(error);
                else resolve({
                    url: result!.secure_url,
                    publicId: result!.public_id,
                });
            }
        );
        uploadStream.end(buffer);
    });
}

// Save a complaint in MongoDB
export async function saveComplaint(payload: ComplaintPayload) {
    try {
        await connectToDatabase();
        console.log(
            payload);

        // Basic validation
        if (!payload.transportMode || !payload.vehicleNumber || !payload.location || !payload.dateOfIncident || !payload.description) {
            throw new Error("Missing required complaint fields");
        }

        if (!payload.isAnonymous) {
            if (!payload.contactName || !payload.contactInfo) {
                throw new Error("Contact name and info are required for non-anonymous complaints");
            }

            // Simple email/phone validation (adjust as needed)
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.contactInfo);
            const isValidPhone = /^\d{10}$/.test(payload.contactInfo);

            if (!isValidEmail && !isValidPhone) {
                throw new Error("Contact info must be a valid email or 10-digit phone number");
            }
        }

        const mediaFiles = [];

        if (payload.mediaFiles && payload.mediaFiles.length > 0) {
            for (const file of payload.mediaFiles) {
                if (file.size > 0) {
                    const uploaded = await uploadToCloudinary(file);
                    mediaFiles.push(uploaded);
                }
            }
        }

        const complaint = new Complaint({
            transportMode: payload.transportMode,
            issueType: payload.issueType,
            vehicleNumber: payload.vehicleNumber,
            location: payload.location,
            dateOfIncident: new Date(payload.dateOfIncident),
            description: payload.description,
            isAnonymous: payload.isAnonymous,
            contactName: payload.contactName,
            contactInfo: payload.contactInfo,
            mediaFiles,
            status: "pending",
        });

        await complaint.save();

        // Send mail only if not anonymous
        if (!payload.isAnonymous && payload.contactInfo) {
            await sendComplaintRegisteredEmail(payload.contactInfo, complaint._id.toString());
        }

        return { success: true };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error saving complaint:", error);
            return { success: false, error: error.message || "Internal Server Error" };
        } else {
            console.error("Unknown error:", error);
            return { success: false, error: "Internal Server Error" };
        }
    }
}


// Fetch all complaints
export async function getAllComplaints() {
    try {

        await connectToDatabase();
        const resp = await Complaint.find({}).sort({ dateOfIncident: -1 });
        return { success: true, data: resp };
    } catch (error) {
        return { success: false, error };
    }
}
