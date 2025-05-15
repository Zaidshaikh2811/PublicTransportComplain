
import { getAllComplaints } from '@/actions/complaint';

import { redirect } from 'next/navigation';
import { Metadata } from 'next';

import { DataTableDemo } from '@/components/Created/DataTableDemo';
import { complaintColumns } from '@/components/Created/ComplainColoum';
import Link from 'next/link';
import { checkCookies } from '@/actions/user';



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


const page = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {



    const resp = await checkCookies();
    if (!resp.success) {


        return redirect('/login');
    }
    const { email } = resp


    const queries = await searchParams


    const pageNum = parseInt(queries.page || '1');
    const { data, totalPages } = await getAllComplaints({ email, page: pageNum, limit: 10 });


    if (!data || data.length === 0) {
        return (
            <div className="container mx-auto mt-12">
                <h1 className="text-2xl font-semibold mb-6">Your Complaints</h1>
                <p>No complaints found.</p>
            </div>
        );
    }

    // Transform the data to match what your table expects
    const formattedComplaints: (Complaint & { id: string })[] = data.map((complaint) => ({
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
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Link
                        key={i}
                        href={`?page=${i + 1}`}
                        className={`px-4 py-2 border rounded ${i + 1 === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'
                            }`}
                    >
                        {i + 1}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default page;