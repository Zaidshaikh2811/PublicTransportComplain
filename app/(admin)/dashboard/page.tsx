// app/page.tsx
import { DataTableDemo } from "@/components/Created/AdminTable";
import { getPaginatedComplaints } from "@/actions/admin"

// Define the Complaint type
type Complaint = {
    _id: string;
    transportMode: string;
    issueType: string;
    vehicleNumber: string;
    location: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    dateOfIncident: string;
    mediaFiles: string[];
    isAnonymous: boolean;
    contactName: string;
    contactInfo: string;
};

export default async function ComplaintsPage() {
    const page = parseInt("1")
    const limit = parseInt("10")

    const result = await getPaginatedComplaints(page, limit)

    if (!result.success) {
        return <div>Error loading complaints: {result.error}</div>
    }

    const complaints: Complaint[] = (((result.data as unknown) as Complaint[]) ?? []).map((item) => ({
        _id: item._id,
        transportMode: item.transportMode,
        issueType: item.issueType,
        vehicleNumber: item.vehicleNumber,
        location: item.location, // ✅ include this
        description: item.description, // ✅ include this
        status: item.status, // ✅ include this
        createdAt: item.createdAt, // ✅ include this
        dateOfIncident: item.dateOfIncident,
        mediaFiles: item.mediaFiles.map((url) => url), // ✅ match type string[]
        updatedAt: item.updatedAt, // ✅ include this
        isAnonymous: item.isAnonymous,
        contactName: item.contactName,
        contactInfo: item.contactInfo,
    }));



    return (
        <div className="container mx-auto py-10">
            <DataTableDemo data={complaints || []} />
        </div>
    )
}