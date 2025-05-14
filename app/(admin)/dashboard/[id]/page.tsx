// app/complaints/[id]/page.tsx
import { getComplaintRemarks, getIndividualComplain } from '@/actions/admin'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Label } from "@/components/ui/label"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format } from 'date-fns'
import StatusUpdateForm from "./StatusUpdateForm"
import Image from 'next/image'
import AddRemarks from './AddRemarks'

interface MediaFile {
    _id: string;
    url: string;
}

export default async function ComplaintDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { data: complaint, error } = await getIndividualComplain(id)
    const { data: remarks } = await getComplaintRemarks(id)
    console.log(complaint);


    if (error || !complaint) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Complaint Not Found</h1>
                    <p className="text-muted-foreground mb-4">
                        {error?.toString() || "The complaint you're looking for doesn't exist."}
                    </p>
                    <Link href="/complaints">
                        <Button>Back to Complaints</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Complaint Details</h1>
                <Link href="/complaints">
                    <Button variant="outline">Back to List</Button>
                </Link>
            </div>

            {/* Complaint Information Card */}
            <Card>
                <CardHeader className="border-b">
                    <div className="flex justify-between items-center">
                        <CardTitle>Complaint #{JSON.stringify(complaint._id)}</CardTitle>
                        <Badge variant={
                            complaint.status === "resolved" ? "default" :
                                complaint.status === "in-progress" ? "secondary" : "destructive"
                        }>
                            {complaint.status.replace("-", " ")}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Transport Mode</Label>
                                <p className="font-medium">{complaint.transportMode}</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Issue Type</Label>
                                <p className="font-medium capitalize">{complaint.issueType.replace("-", " ")}</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Vehicle Number</Label>
                                <p className="font-medium">{complaint.vehicleNumber}</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Location</Label>
                                <p className="font-medium">{complaint.location}</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Date of Incident</Label>
                                <p className="font-medium">
                                    {format(new Date(complaint.dateOfIncident), 'PPP')}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Submitted On</Label>
                                <p className="font-medium">
                                    {format(new Date(complaint.createdAt), 'PPPp')}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Contact Name</Label>
                                <p className="font-medium">
                                    {complaint.isAnonymous ? "Anonymous" : complaint.contactName}
                                </p>
                            </div>

                            {!complaint.isAnonymous && (
                                <div className="space-y-2">
                                    <Label className="text-muted-foreground">Contact Email</Label>
                                    <p className="font-medium">{complaint.contactInfo}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mt-6 space-y-2">
                        <Label className="text-muted-foreground text-sm">Description</Label>
                        <div className="bg-background border border-muted rounded-xl p-5 shadow-sm">
                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                {complaint.description}
                            </p>
                        </div>
                    </div>

                    {/* Media Files Section */}
                    {complaint.mediaFiles.length > 0 && (
                        <div className="mt-6 space-y-2">
                            <Label className="text-muted-foreground">Attachments ({complaint.mediaFiles.length})</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {complaint.mediaFiles.map((file: MediaFile) => (
                                    <div
                                        key={file._id}
                                        className="relative aspect-square w-full h-48 bg-muted rounded-lg overflow-hidden border group"
                                    >
                                        <Link
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full h-full"
                                        >
                                            <Image
                                                fill
                                                src={file.url}
                                                alt="Complaint evidence"
                                                className="object-cover group-hover:scale-105 transition-transform duration-200"
                                                sizes="(max-width: 640px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className='mt-10  '>

                        <StatusUpdateForm
                            email={complaint.contactInfo}
                            complaintId={JSON.stringify(complaint._id)}
                            currentStatus={complaint.status}
                        />
                    </div>
                </CardContent>
            </Card>


            <AddRemarks complaintId={JSON.stringify(complaint._id)} />

            {/* Previous Remarks Section */}
            {(remarks && remarks.length > 0) && (
                <div className="mt-10 space-y-5">
                    <div className="flex items-center justify-between">
                        <Label className="text-muted-foreground text-sm font-medium">
                            Previous Remarks ({remarks?.length ?? 0})
                        </Label>
                    </div>

                    <div className="space-y-4">
                        {(remarks || []).map((remark, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl p-4 bg-gray-50 dark:bg-gray-900/30 shadow-sm"
                            >
                                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                    {remark.text}
                                </p>

                                <div className="mt-3 text-xs text-gray-500 text-right italic">
                                    — {remark.addedBy || 'Unknown'}, {format(new Date(remark.createdAt), 'PPPp')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    )
}