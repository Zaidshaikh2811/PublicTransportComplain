// models/Remark.ts
import mongoose, { Schema, Document, Types } from 'mongoose'

interface RemarkDocument extends Document {
    complaintId: Types.ObjectId
    text: string
    createdAt: Date
    addedBy: string
}

const RemarkSchema = new Schema<RemarkDocument>({
    complaintId: { type: Schema.Types.ObjectId, ref: 'Complaint', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    addedBy: { type: String, required: true },
})

export default mongoose.models.Remark ||
    mongoose.model<RemarkDocument>('Remark', RemarkSchema)
