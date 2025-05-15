import { getSpecificComplain } from '@/actions/complaint'
import ComplaintDetails from '@/components/Created/ComplaintDetails'
import { Metadata } from 'next'

import React from 'react'

export const metadata: Metadata = {
    title: 'Public Transport Complaints',
    description: "Report a problem. We'll get back to you.",

}

const ComplaintDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const { data } = await getSpecificComplain(id)



    return (
        <ComplaintDetails complaint={data} />
    )
}





export default ComplaintDetailsPage
