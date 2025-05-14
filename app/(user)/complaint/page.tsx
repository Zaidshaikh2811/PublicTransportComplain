
import { getAllComplaints } from '@/actions/complaint';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { toast } from 'sonner';
import { DataTableDemo } from '@/components/Created/DataTableDemo';
import { complaintColumns } from '@/components/Created/ComplainColoum';


type Complaint = {
    _id: string;
    transportMode: string;
    issueType: string;
    vehicleNumber: string;
    location: string;
    dateOfIncident: string;
    description: string;
    mediaFiles: { url: string }[];
    isAnonymous: boolean;
    contactName: string;
    contactInfo: string;
    status: string;
    createdAt: string;
};

export const metadata: Metadata = {
    title: 'Public Transport Complaints',
    description: "Report a problem. We'll get back to you.",
};

const page = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        return redirect('/login');
    }

    // 2. Decode and validate token
    let email: string | null = null;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

        if (typeof decodedToken !== 'string' && 'email' in decodedToken) {
            email = decodedToken.email;
        } else {
            toast.error('Invalid token');
            return redirect('/login');
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('JWT Error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
        console.error('JWT Error:', err instanceof Error ? err.message : err);
        return redirect('/login');
    }

    if (!email) {
        return redirect('/login');
    }

    const complaints = await getAllComplaints({ email });

    if (!complaints?.data || complaints.data.length === 0) {
        return (
            <div className="container mx-auto mt-12">
                <h1 className="text-2xl font-semibold mb-6">Your Complaints</h1>
                <p>No complaints found.</p>
            </div>
        );
    }

    // Transform the data to match what your table expects
    const formattedComplaints: (Complaint & { id: string })[] = complaints.data.map((complaint) => ({
        id: complaint?._id?.toString() || "", // 👈 add this line
        _id: complaint?._id?.toString() || "",
        transportMode: complaint.transportMode,
        issueType: complaint.issueType,
        vehicleNumber: complaint.vehicleNumber,
        location: complaint.location ?? "N/A",
        dateOfIncident: complaint.dateOfIncident,
        description: complaint.description ?? "No description",
        mediaFiles: (complaint.mediaFiles ?? []).map((url: string) => ({ url })), // assumes it's string[]
        isAnonymous: complaint.isAnonymous ?? false,
        contactName: complaint.contactName ?? "Anonymous",
        contactInfo: complaint.contactInfo ?? "N/A",
        status: complaint.status ?? "pending",
        createdAt: complaint.createdAt ?? new Date().toISOString(),
    }));



    return (
        <div className="container mx-auto mt-12">
            <h1 className="text-2xl font-semibold mb-6">Your Complaints</h1>
            <DataTableDemo
                columns={complaintColumns}
                data={formattedComplaints}
            />
        </div>
    );
};

export default page;