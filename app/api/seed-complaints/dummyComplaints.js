// utils/dummyComplaints.ts
export const dummyComplaints = [
    {
        transportMode: 'Bus',
        issueType: 'bus-delay',
        vehicleNumber: 'MH01AB1234',
        location: 'Marine Lines, Mumbai',
        dateOfIncident: new Date('2023-01-15T08:30:00'),
        description: 'Bus was delayed by 45 minutes during morning commute',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Zaid Shaikh',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'resolved',
        statusTimestamps: {
            submittedAt: new Date('2023-01-15T10:00:00'),
            inProgressAt: new Date('2023-01-16T09:15:00'),
            resolvedAt: new Date('2023-01-18T14:30:00')
        }
    },
    {
        transportMode: 'Train',
        issueType: 'overcrowding',
        vehicleNumber: 'WR-4567',
        location: 'Churchgate Station',
        dateOfIncident: new Date('2023-02-03T18:15:00'),
        description: 'Extreme overcrowding in 6:15 PM local train',
        mediaFiles: [{
            url: 'https://example.com/train-crowd.jpg',
            publicId: 'train-crowd1'
        }],
        isAnonymous: false,
        contactName: 'Zaid Shaikh',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'in-progress',
        statusTimestamps: {
            submittedAt: new Date('2023-02-03T19:30:00'),
            inProgressAt: new Date('2023-02-05T11:20:00')
        }
    },
    {
        transportMode: 'Metro',
        issueType: 'unclean-vehicle',
        vehicleNumber: 'MET-789',
        location: 'Ghatkopar Metro Station',
        dateOfIncident: new Date('2023-03-12T12:45:00'),
        description: 'Food wrappers and spills on metro seats',
        mediaFiles: [
            {
                url: 'https://example.com/dirty-metro1.jpg',
                publicId: 'dirty-metro1'
            },
            {
                url: 'https://example.com/dirty-metro2.jpg',
                publicId: 'dirty-metro2'
            }
        ],
        isAnonymous: false,
        contactName: 'Zaid S',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'pending',
        statusTimestamps: {
            submittedAt: new Date('2023-03-12T13:20:00')
        }
    },
    {
        transportMode: 'Bus',
        issueType: 'rude-staff',
        vehicleNumber: 'MH02CD5678',
        location: 'Bandra Bus Depot',
        dateOfIncident: new Date('2023-04-05T09:00:00'),
        description: 'Conductor was rude when asked for change',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Zaid',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'resolved',
        statusTimestamps: {
            submittedAt: new Date('2023-04-05T11:30:00'),
            inProgressAt: new Date('2023-04-06T09:15:00'),
            resolvedAt: new Date('2023-04-08T16:45:00')
        }
    },
    {
        transportMode: 'Train',
        issueType: 'faulty-ac',
        vehicleNumber: 'CR-1234',
        location: 'Thane Station',
        dateOfIncident: new Date('2023-05-20T17:30:00'),
        description: 'AC not working in first-class compartment',
        mediaFiles: [{
            url: 'https://example.com/faulty-ac.jpg',
            publicId: 'faulty-ac1'
        }],
        isAnonymous: false,
        contactName: 'Zaid Shaikh',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'pending',
        statusTimestamps: {
            submittedAt: new Date('2023-05-20T19:00:00')
        }
    },
    {
        transportMode: 'Bus',
        issueType: 'other',
        vehicleNumber: 'MH03EF9012',
        location: 'Andheri East',
        dateOfIncident: new Date('2023-06-08T14:15:00'),
        description: 'Driver using mobile phone while driving',
        mediaFiles: [{
            url: 'https://example.com/driver-phone.jpg',
            publicId: 'driver-phone1'
        }],
        isAnonymous: false,
        contactName: 'Z. Shaikh',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'in-progress',
        statusTimestamps: {
            submittedAt: new Date('2023-06-08T15:30:00'),
            inProgressAt: new Date('2023-06-09T11:20:00')
        }
    },
    {
        transportMode: 'Metro',
        issueType: 'overcrowding',
        vehicleNumber: 'MET-456',
        location: 'Andheri Metro Station',
        dateOfIncident: new Date('2023-07-18T08:45:00'),
        description: 'Extreme rush during morning hours',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Zaid Shaikh',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'resolved',
        statusTimestamps: {
            submittedAt: new Date('2023-07-18T10:00:00'),
            inProgressAt: new Date('2023-07-19T09:30:00'),
            resolvedAt: new Date('2023-07-22T14:15:00')
        }
    },
    {
        transportMode: 'Train',
        issueType: 'bus-delay',
        vehicleNumber: 'HR-7890',
        location: 'Borivali Station',
        dateOfIncident: new Date('2023-08-22T19:30:00'),
        description: 'Train delayed by 1 hour with no announcements',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Zaid S.',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'pending',
        statusTimestamps: {
            submittedAt: new Date('2023-08-22T20:45:00')
        }
    },
    {
        transportMode: 'Bus',
        issueType: 'unclean-vehicle',
        vehicleNumber: 'MH04GH3456',
        location: 'Dadar TT',
        dateOfIncident: new Date('2023-09-10T16:20:00'),
        description: 'Torn seats with foul smell',
        mediaFiles: [{
            url: 'https://example.com/torn-seats.jpg',
            publicId: 'torn-seats1'
        }],
        isAnonymous: false,
        contactName: 'Zaid Shaikh',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'in-progress',
        statusTimestamps: {
            submittedAt: new Date('2023-09-10T17:30:00'),
            inProgressAt: new Date('2023-09-11T10:15:00')
        }
    },
    {
        transportMode: 'Other',
        issueType: 'other',
        vehicleNumber: 'AUTO-789',
        location: 'Malad West',
        dateOfIncident: new Date('2023-10-05T11:00:00'),
        description: 'Auto refused meter and demanded excess fare',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Zaid',
        contactInfo: 'zaidshaikh2811@gmail.com',
        status: 'resolved',
        statusTimestamps: {
            submittedAt: new Date('2023-10-05T12:30:00'),
            inProgressAt: new Date('2023-10-06T09:45:00'),
            resolvedAt: new Date('2023-10-09T15:20:00')
        }
    }
]
