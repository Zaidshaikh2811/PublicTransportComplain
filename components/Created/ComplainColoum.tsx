'use client';

export const complaintColumns = [
    {
        accessorKey: 'transportMode',
        header: 'Transport Mode',
    },
    {
        accessorKey: 'issueType',
        header: 'Issue Type',
    },
    {
        accessorKey: 'vehicleNumber',
        header: 'Vehicle Number',
    },
    {
        accessorKey: 'dateOfIncident',
        header: 'Date of Incident',
        cell: ({ row }: { row: { original: { dateOfIncident: string } } }) => new Date(row.original.dateOfIncident).toLocaleDateString(),
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: { row: { original: { status: string } } }) => (
            <span
                className={`px-2 py-1 rounded text-sm ${row.original.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : row.original.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
            >
                {row.original.status}
            </span>
        ),
    },
];
