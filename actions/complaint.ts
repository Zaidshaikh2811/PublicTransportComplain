import { connectToDatabase } from '@/lib/mongodb';
import Complaint from '@/lib/models/Complaint';
import { v2 as cloudinary } from 'cloudinary';

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
    await connectToDatabase();

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
        mediaFiles,
        isAnonymous: payload.isAnonymous,
        contactName: payload.isAnonymous ? undefined : payload.contactName,
        contactInfo: payload.isAnonymous ? undefined : payload.contactInfo,
        status: 'pending',
    });

    await complaint.save();
    return complaint;
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
