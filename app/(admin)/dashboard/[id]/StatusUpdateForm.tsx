"use client"

import { updateComplaintStatus } from '@/actions/admin'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormStatus } from "react-dom"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

interface StatusUpdateFormProps {
    email: string;
    complaintId: string;
    currentStatus: string;
}

interface ActionState {
    success: boolean;
    message: string;
}

const action = async (_prevState: ActionState, formData: FormData): Promise<ActionState> => {
    return await updateComplaintStatus(formData)
}

export default function StatusUpdateForm({
    email,
    complaintId,
    currentStatus
}: StatusUpdateFormProps) {


    const [state, formAction] = useActionState<ActionState, FormData>(action, {
        success: false,
        message: "",
    })

    useEffect(() => {
        if (state.message) {
            toast[state.success ? "success" : "error"](state.message)
        }
    }, [state])

    return (
        <form action={formAction} className="w-full">
            <input type="hidden" name="complaintId" value={JSON.parse(complaintId)} />
            <input type="hidden" name="email" value={email} />

            <div className="flex justify-end flex-col sm:flex-row gap-4 items-end">
                <div className="w-full sm:w-2/3 space-y-2">
                    <Label className="text-sm justify-end font-medium text-muted-foreground">Update Complaint Status</Label>
                    <div className="flex gap-2 justify-end mt-4">
                        <Select name="status" defaultValue={currentStatus}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                                        Pending
                                    </div>
                                </SelectItem>
                                <SelectItem value="in-progress">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                                        In Progress
                                    </div>
                                </SelectItem>
                                <SelectItem value="resolved">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-green-500" />
                                        Resolved
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <SubmitButton />
                    </div>
                </div>
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button
            type="submit"
            className="whitespace-nowrap"
            variant={pending ? "ghost" : "default"}
            disabled={pending}
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                </div>
            ) : "Update"}
        </Button>
    )
}
