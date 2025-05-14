// app/page.tsx

import { getPaginatedComplaints } from "@/actions/admin"
import Chart from "@/components/Created/AdminChart/Chart"
import { DataTableDemo } from "@/components/Created/AdminTable"
import { Metadata } from "next"

// Type definition for a complaint
type Complaint = {
    _id: string
    transportMode: string
    issueType: string
    vehicleNumber: string
    location: string
    description: string
    status: string
    createdAt: string
    updatedAt: string
    dateOfIncident: string
    mediaFiles: string[]
    isAnonymous: boolean
    contactName: string
    contactInfo: string
}

export const metadata: Metadata = {
    title: "Dashboard - Public Transport Complaints",
    description: "Report a problem. We'll get back to you.",
};



interface Props {
    searchParams?: {
        page?: string;
        limit?: string;
    };
}

export default async function ComplaintsPage({ searchParams }: Props) {
    const page = parseInt(searchParams?.page ?? "1")
    const limit = parseInt(searchParams?.limit ?? "10")

    const result = await getPaginatedComplaints(page, limit)

    if (!result.success) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600">
                Error loading complaints: {result.error}
            </div>
        )
    }


    const pagination = result.pagination

    const complaints: Complaint[] =
        ((result.data as unknown) as Complaint[])?.map((item) => ({
            _id: item._id,
            transportMode: item.transportMode,
            issueType: item.issueType,
            vehicleNumber: item.vehicleNumber,
            location: item.location,
            description: item.description,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            dateOfIncident: item.dateOfIncident,
            mediaFiles: item.mediaFiles,
            isAnonymous: item.isAnonymous,
            contactName: item.contactName,
            contactInfo: item.contactInfo,
        })) ?? []

    return (
        <div className="container mx-auto max-w-7xl px-4 py-10 space-y-10">
            <section >
                <h2 className="text-2xl font-semibold mb-4">Complaint Status Overview</h2>
                <Chart />
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">All Complaints</h2>
                {pagination && <DataTableDemo data={complaints} pagination={pagination} />}
            </section>
        </div>
    )
}
