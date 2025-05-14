import { getComplaintRemarks } from '@/actions/admin'
import React from 'react'


const AdminComment = ({
    name,
    date,
    message,

}: {
    name: string
    date: string
    message: string

}) => (
    <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
        <div>
            <div className="text-sm font-semibold text-gray-800">{name}</div>
            <div className="text-xs text-gray-500">{date}</div>
            <p className="mt-1 text-sm text-gray-700">{message}</p>
        </div>
    </div>
)


const Comments = async ({ complaintId }: { complaintId: string }) => {


    const complaint = await getComplaintRemarks(complaintId)
    console.log(complaint);


    return (
        <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Admin Comments</h2>
            <div className="space-y-6">
                {

                    complaint?.data?.map((comment) => {
                        return < AdminComment
                            key={comment._id}
                            name={comment.addedBy}
                            date={new Date(comment.createdAt).toLocaleString()}
                            message={comment.text}

                        />
                    })
                }
            </div>


        </section>
    )
}

export default Comments
