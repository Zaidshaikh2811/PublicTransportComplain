import { getSpecificComplain } from '@/actions/complaint'
import ComplaintDetails from '@/components/Created/ComplaintDetails'

import React from 'react'

const ComplaintDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    const { data } = await getSpecificComplain(id)


    return (
        <ComplaintDetails complaint={data} />
    )
}





export default ComplaintDetailsPage
