// app/page.tsx
import { DataTableDemo } from "@/components/Created/AdminTable";
import { getPaginatedComplaints } from "@/actions/admin"

export default async function ComplaintsPage({
    searchParams,
}: {
    searchParams: { page?: string; limit?: string }
}) {
    const page = parseInt(searchParams.page || "1")
    const limit = parseInt(searchParams.limit || "10")

    const result = await getPaginatedComplaints(page, limit)

    if (!result.success) {
        return <div>Error loading complaints: {result.error}</div>
    }

    // Ensure we're passing plain objects, not Mongoose documents
    return (
        <div className="container mx-auto py-10">
            <DataTableDemo data={result.data || []} />
        </div>
    )
}