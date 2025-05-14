import React from 'react'
import Image from 'next/image'



// Define the Complaint type
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
    console.log(complaint);


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <main className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4">
                    {/* <h1 className="text-2xl font-bold text-gray-800">
                        Complaint #{complaint._id}
                    </h1> */}
                    <button className="text-sm text-gray-600 hover:text-red-500 transition-colors">
                        Dismiss
                    </button>
                </div>

                {/* Status Timeline */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Status</h2>
                    <div className="space-y-4 border-l-4 border-blue-500 pl-4">
                        <StatusItem label="Submitted by user" date={complaint.statusTimestamps.submittedAt || complaint.createdAt} icon="🚨" />

                        <StatusItem label="In progress" date={complaint.statusTimestamps.inProgressAt || " - "} icon="🧑‍🔧" />
                        {complaint.statusTimestamps.resolvedAt === 'resolved' && (
                            <StatusItem label="Resolved" date={complaint.statusTimestamps.resolvedAt} icon="✔️" />
                        )}
                    </div>
                </section>

                {/* Complaint Details */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Details</h2>
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
                        <h3 className="font-semibold text-gray-700">Description</h3>
                        <p className="text-gray-800 mt-2 bg-gray-100 p-4 rounded-md border text-sm">
                            {complaint.description}
                        </p>
                    </div>

                    {(complaint.mediaFiles ?? []).length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-700 mb-2">Attachments</h3>
                            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2">
                                {(complaint.mediaFiles ?? []).map((file: { url: string }, index: number) => (
                                    <div
                                        key={index}
                                        className="min-w-[500px] h-[300px] bg-gray-100 rounded-md shadow overflow-hidden flex-shrink-0"
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
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Admin Comments</h2>
                    <div className="space-y-6">
                        <AdminComment
                            name="Alice Johnson"
                            date="2025-05-13 10:00"
                            message="We are sorry for the inconvenience. Your complaint is being processed."
                            likes={3}
                        />
                        <AdminComment
                            name="Bob Williams"
                            date="2025-05-13 12:30"
                            message="Your complaint is in progress and our team is working on it."
                            likes={2}
                        />
                    </div>

                    {/* Comment Input */}
                    <div className="mt-6 flex gap-3">
                        <input
                            type="text"
                            placeholder="Type your comment here..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition-colors">
                            Send
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}

// Sub-components

const StatusItem = ({ label, date, icon }: { label: string; date: string; icon: string }) => (
    <div className="flex items-start gap-3">
        <div className="text-xl">{icon}</div>
        <div>
            <div className="text-sm font-medium text-gray-800">{label}</div>
            <div className="text-xs text-gray-500">{formatDate(date)}</div>
        </div>
    </div>
)

const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <div className="text-xs text-gray-500 uppercase">{label}</div>
        <div className="text-sm font-medium text-gray-800">{value}</div>
    </div>
)

const AdminComment = ({
    name,
    date,
    message,
    likes,
}: {
    name: string
    date: string
    message: string
    likes: number
}) => (
    <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
        <div>
            <div className="text-sm font-semibold text-gray-800">{name}</div>
            <div className="text-xs text-gray-500">{date}</div>
            <p className="mt-1 text-sm text-gray-700">{message}</p>
            <div className="mt-2 text-xs text-gray-500">👍 {likes}</div>
        </div>
    </div>
)

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

export default ComplaintDetails
