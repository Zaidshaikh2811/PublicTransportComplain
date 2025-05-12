// models/Feedback.js
import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
    transportMode: {
        type: String,
        enum: ['Bus', 'Train', 'Metro', 'Other'],
        required: true
    },
    issueType: {
        type: String,
        enum: ['bus-delay', 'overcrowding', 'rude-staff', 'unclean-vehicle', 'faulty-ac', 'other'],
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateOfIncident: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mediaFiles: [{
        url: String,
        publicId: String
    }],
    isAnonymous: {
        type: Boolean,
        default: false
    },
    contactName: {
        type: String,
        required: function (this: { isAnonymous: boolean }) { return !this.isAnonymous; }
    },
    contactInfo: {
        type: String,
        required: function (this: { isAnonymous: boolean }) { return !this.isAnonymous; }
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'resolved'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);
export default Complaint;