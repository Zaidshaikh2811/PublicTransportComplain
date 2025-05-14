import React from 'react'
import Image from 'next/image'
import Comments from '@/app/(user)/complaint/[id]/Comments'

// Complaint type (same as before)
type Complaint = {
    _id: string;
    status: string;
    statusTimestamps: {
        submittedAt?: string;
        inProgressAt?: string;
        resolvedAt?: string;
    };
    createdAt: string;
    updatedAt: string;
    contactName?: string;
    transportMode: string;
    vehicleNumber: string;
    location: string;
    issueType: string;
    dateOfIncident: string;
    isAnonymous: boolean;
    contactInfo?: string;
    description: string;
    mediaFiles?: { url: string }[];
};

const ComplaintDetails = ({ complaint }: { complaint: Complaint }) => {
    return (
        <div className="min-h-screen bg-background p-6">
            <main className="max-w-5xl mx-auto bg-card text-foreground rounded-xl shadow-lg p-6 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 border-border">
                    <button className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                        Dismiss
                    </button>
                </div>

                {/* Status Timeline */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Status</h2>
                    <div className="space-y-4 border-l-4 border-primary pl-4">
                        <StatusItem label="Submitted by user" date={complaint.statusTimestamps.submittedAt || complaint.createdAt} icon="🚨" />
                        <StatusItem label="In progress" date={complaint.statusTimestamps.inProgressAt || " - "} icon="🧑‍🔧" />
                        {complaint.statusTimestamps.resolvedAt && (
                            <StatusItem label="Resolved" date={complaint.statusTimestamps.resolvedAt} icon="✔️" />
                        )}
                    </div>
                </section>

                {/* Complaint Details */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Details</h2>
                    <div className="grid sm:grid-cols-2 gap-6 text-sm">
                        <DetailItem label="User" value={complaint.contactName || 'Anonymous'} />
                        <DetailItem label="Transport Mode" value={complaint.transportMode} />
                        <DetailItem label="Vehicle Number" value={complaint.vehicleNumber} />
                        <DetailItem label="Location" value={complaint.location} />
                        <DetailItem label="Issue Type" value={complaint.issueType} />
                        <DetailItem label="Date of Incident" value={formatDate(complaint.dateOfIncident)} />
                        <DetailItem
                            label="Contact Info"
                            value={complaint.isAnonymous ? 'Hidden' : complaint.contactInfo || ''}
                        />
                    </div>
                    <div className="mt-6">
                        <h3 className="font-semibold">Description</h3>
                        <p className="mt-2 bg-muted p-4 rounded-md border border-border text-sm">
                            {complaint.description}
                        </p>
                    </div>

                    {(complaint.mediaFiles ?? []).length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Attachments</h3>
                            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted p-2">
                                {(complaint.mediaFiles ?? []).map((file: { url: string }, index: number) => (
                                    <div
                                        key={index}
                                        className="min-w-[500px] h-[300px] bg-muted rounded-md shadow overflow-hidden flex-shrink-0"
                                    >
                                        <Image
                                            src={file.url}
                                            alt={`Attachment ${index + 1}`}
                                            width={500}
                                            height={300}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Admin Comments */}
                <Comments complaintId={complaint._id} />
            </main>
        </div>

    );
}

// Sub-components

const StatusItem = ({ label, date, icon }: { label: string; date: string; icon: string }) => (
    <div className="flex items-start gap-3">
        <div className="text-xl">{icon}</div>
        <div>
            <div className="text-sm font-medium">{label}</div>
            <div className="text-xs text-muted-foreground">{formatDate(date)}</div>
        </div>
    </div>
)

const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <div className="text-xs text-muted-foreground uppercase">{label}</div>
        <div className="text-sm font-medium">{value}</div>
    </div>
)

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

export default ComplaintDetails
