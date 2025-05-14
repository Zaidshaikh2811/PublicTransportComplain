// actions/admin.ts
"use server"

import Complaint from "@/lib/models/Complaint"
import { z } from 'zod'
const remarkSchema = z.object({
    complaintId: z.string().min(1, 'Complaint ID is required'),
    text: z.string().min(3, 'Remark must be at least 3 characters long'),
    addedBy: z.string().min(1, 'Added by is required'),
})

import { connectToDatabase } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"
import Remarks from "@/lib/models/Remarks"
import { sendComplaintUpdatedEmail } from "@/lib/mail/complaintUpdatedEmail"

export async function getPaginatedComplaints(page = 1, limit = 10) {
    try {
        await connectToDatabase()
        const skip = (page - 1) * limit

        const complaints = await Complaint.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()

        const totalCount = await Complaint.countDocuments({})

        return {
            success: true,
            data: complaints,
            pagination: {
                totalItems: totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                pageSize: limit,
            },
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }
    }
}


export const getIndividualComplain = async (id: string) => {
    try {
        await connectToDatabase();
        const resp = await Complaint.findById(id);
        return { success: true, data: resp };
    } catch (error) {
        return { success: false, error };
    }
}



interface UpdateStatusResult {
    success: boolean
    message: string
}

export async function updateComplaintStatus(formData: FormData): Promise<UpdateStatusResult> {
    try {
        await connectToDatabase();

        const complaintId = formData.get("complaintId") as string;
        const status = formData.get("status") as string;
        const email = formData.get("email") as string;

        if (!complaintId || !status) {
            return { success: false, message: "Missing complaint ID or status" };
        }



        const timestampField =
            status === "in-progress"
                ? { "statusTimestamps.inProgressAt": new Date() }
                : status === "resolved"
                    ? { "statusTimestamps.resolvedAt": new Date() }
                    : {};



        await sendComplaintUpdatedEmail(email, complaintId, status);
        const updateData = {
            status,
            updatedAt: new Date(),
            ...timestampField,
        };

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { $set: updateData },
            { new: true }
        );

        if (!updatedComplaint) {
            return { success: false, message: "Complaint not found" };
        }

        revalidatePath(`/complaints/${complaintId}`);
        return { success: true, message: "Status updated successfully" };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to update status",
        };
    }
}




export async function addRemark(formData: FormData) {
    try {

        const raw = {
            complaintId: formData.get('complaintId')?.toString() || '',
            text: formData.get('text')?.toString() || '',
            addedBy: formData.get('addedBy')?.toString() || 'Admin',
        }


        // Validate input
        const parsed = remarkSchema.safeParse(raw)
        if (!parsed.success) {
            const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ')
            throw new Error(`Validation failed: ${errorMessages}`)
        }

        const { complaintId, text, addedBy } = parsed.data

        await connectToDatabase();

        // Create Remark
        await Remarks.create({
            complaintId,
            text,
            addedBy,
            createdAt: new Date(),
        })

        // Optionally revalidate path if needed
        revalidatePath(`/complaints/${complaintId}`)

        return { success: true, message: 'Remark added successfully' }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('[addRemark Error]', error.message)
            return { success: false, message: error.message || 'Something went wrong' }
        }
        console.error('[addRemark Error]', 'Unknown error occurred')
        return { success: false, message: 'Something went wrong' }
    }
}



export const getComplaintRemarks = async (id: string) => {
    try {
        await connectToDatabase();
        const resp = await Remarks.find({ complaintId: id });
        return { success: true, data: resp };
    } catch (error) {
        return { success: false, error };
    }
}


export const chartData = async () => {
    try {
        await connectToDatabase();
        const resp = await Complaint.find({});
        return { success: true, data: resp };

    } catch (error) {
        return { success: false, error };
    }
}