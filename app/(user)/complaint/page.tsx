import { getAllComplaints } from '@/actions/complaint'
import { DataTableDemo } from '@/components/Created/Datatable'

import React from 'react'

const page = async () => {
    const { data } = await getAllComplaints();
    console.log(data);

    return (
        <div className='container mx-auto mt-12'>
            <h1>View Complaint</h1>
            <DataTableDemo data={JSON.parse(JSON.stringify(data))} />
        </div>
    )
}

export default page
