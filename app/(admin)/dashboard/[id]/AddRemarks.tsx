"use client"

import { addRemark } from '@/actions/admin'

import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { toast } from 'sonner'

const AddRemarks = ({ complaintId }: { complaintId: string }) => {

    const [formState, setFormState] = useState({ loading: false })

    async function handleFormAction(formData: FormData) {
        setFormState({ loading: true })
        const result = await addRemark(formData)
        setFormState({ loading: false })

        if (result?.success) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }
    return (
        <div>
            <div className="mt-10 space-y-4">
                <Label className="text-muted-foreground text-sm">Add Remark</Label>
                <form className="space-y-2" action={handleFormAction}>
                    <input type="hidden" name="complaintId" value={JSON.parse(complaintId)} />
                    <input type="hidden" name="addedBy" value="Admin" />
                    <textarea
                        name="text"
                        className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                        placeholder="Write your remark here..."
                        required
                    />
                    <button
                        type="submit"
                        disabled={formState.loading}
                        className="bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50"
                    >
                        {formState.loading ? 'Submitting...' : 'Submit Remark'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddRemarks
