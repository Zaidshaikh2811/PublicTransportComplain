import { getSpecificComplain } from '@/actions/complaint'
import ComplaintDetails from '@/components/Created/ComplaintDetails'

import React from 'react'

const ComplaintDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const { data } = await getSpecificComplain(id)

    console.log(data);

    return (
        <ComplaintDetails complaint={data} />
    )
}





export default ComplaintDetailsPage
