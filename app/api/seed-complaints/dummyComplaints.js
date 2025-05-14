// utils/dummyComplaints.ts
export const dummyComplaints = [
    {
        transportMode: "Bus",
        issueType: "bus-delay",
        vehicleNumber: "MH12AB1234",
        location: "Pune Station",
        dateOfIncident: new Date("2024-12-10"),
        description: "Bus was late by 45 minutes.",
        isAnonymous: false,
        contactName: "John Doe",
        contactInfo: "john@example.com",
        status: "pending",
        mediaFiles: [],
    },
    {
        transportMode: "Metro",
        issueType: "overcrowding",
        vehicleNumber: "M4567",
        location: "Delhi Central Metro",
        dateOfIncident: new Date("2025-01-15"),
        description: "Extremely overcrowded during peak hours.",
        isAnonymous: true,
        status: "in-progress",
        statusTimestamps: {
            inProgressAt: new Date("2025-01-16"),
        },
        mediaFiles: [],
    },
    {
        transportMode: "Train",
        issueType: "rude-staff",
        vehicleNumber: "12345",
        location: "Howrah Junction",
        dateOfIncident: new Date("2025-03-05"),
        description: "Conductor was very rude.",
        isAnonymous: false,
        contactName: "Anjali Mehta",
        contactInfo: "anjali@example.com",
        status: "resolved",
        statusTimestamps: {
            inProgressAt: new Date("2025-03-06"),
            resolvedAt: new Date("2025-03-07"),
        },
        mediaFiles: [],
    },
    {
        transportMode: 'Bus',
        issueType: 'bus-delay',
        vehicleNumber: 'MH01AB1234',
        location: 'Marine Lines, Mumbai',
        dateOfIncident: new Date('2023-01-15T08:30:00'),
        description: 'Bus was delayed by 45 minutes causing me to miss an important meeting.',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Rahul Sharma',
        contactInfo: 'rahul.sharma@email.com',
        status: 'resolved',
        statusTimestamps: {
            submittedAt: new Date('2023-01-15T10:00:00'),
            inProgressAt: new Date('2023-01-16T09:15:00'),
            resolvedAt: new Date('2023-01-20T14:30:00')
        },
        createdAt: new Date('2023-01-15T10:00:00'),
        updatedAt: new Date('2023-01-20T14:30:00')
    },
    {
        transportMode: 'Train',
        issueType: 'overcrowding',
        vehicleNumber: 'WR-4567',
        location: 'Churchgate Station, Mumbai',
        dateOfIncident: new Date('2023-02-03T18:15:00'),
        description: 'Extreme overcrowding in the 6:15 PM local train. No space to even stand properly.',
        mediaFiles: [
            {
                url: 'https://example.com/media/train-crowd1.jpg',
                publicId: 'train-crowd1'
            }
        ],
        isAnonymous: true,
        status: 'pending',
        statusTimestamps: {
            submittedAt: new Date('2023-02-03T19:30:00')
        },
        createdAt: new Date('2023-02-03T19:30:00'),
        updatedAt: new Date('2023-02-03T19:30:00')
    },
    {
        transportMode: 'Metro',
        issueType: 'unclean-vehicle',
        vehicleNumber: 'MET-789',
        location: 'Ghatkopar Metro Station, Mumbai',
        dateOfIncident: new Date('2023-03-12T12:45:00'),
        description: 'The metro coach was very dirty with food wrappers and spills on seats.',
        mediaFiles: [
            {
                url: 'https://example.com/media/dirty-metro1.jpg',
                publicId: 'dirty-metro1'
            },
            {
                url: 'https://example.com/media/dirty-metro2.jpg',
                publicId: 'dirty-metro2'
            }
        ],
        isAnonymous: false,
        contactName: 'Priya Patel',
        contactInfo: '9876543210',
        status: 'in-progress',
        statusTimestamps: {
            submittedAt: new Date('2023-03-12T13:20:00'),
            inProgressAt: new Date('2023-03-13T10:00:00')
        },
        createdAt: new Date('2023-03-12T13:20:00'),
        updatedAt: new Date('2023-03-13T10:00:00')
    },
    {
        transportMode: 'Bus',
        issueType: 'rude-staff',
        vehicleNumber: 'MH02CD5678',
        location: 'Bandra Bus Depot, Mumbai',
        dateOfIncident: new Date('2023-04-05T09:00:00'),
        description: 'The bus conductor was extremely rude when I asked for change.',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Amit Joshi',
        contactInfo: 'amit.joshi@email.com',
        status: 'resolved',
        statusTimestamps: {
            submittedAt: new Date('2023-04-05T11:30:00'),
            inProgressAt: new Date('2023-04-06T09:15:00'),
            resolvedAt: new Date('2023-04-10T16:45:00')
        },
        createdAt: new Date('2023-04-05T11:30:00'),
        updatedAt: new Date('2023-04-10T16:45:00')
    },
    {
        transportMode: 'Train',
        issueType: 'faulty-ac',
        vehicleNumber: 'CR-1234',
        location: 'Thane Station, Mumbai',
        dateOfIncident: new Date('2023-05-20T17:30:00'),
        description: 'AC was not working in the first-class compartment despite paying premium fare.',
        mediaFiles: [
            {
                url: 'https://example.com/media/faulty-ac.jpg',
                publicId: 'faulty-ac1'
            }
        ],
        isAnonymous: false,
        contactName: 'Neha Gupta',
        contactInfo: 'neha.g@email.com',
        status: 'pending',
        statusTimestamps: {
            submittedAt: new Date('2023-05-20T19:00:00')
        },
        createdAt: new Date('2023-05-20T19:00:00'),
        updatedAt: new Date('2023-05-20T19:00:00')
    },
    {
        transportMode: 'Bus',
        issueType: 'other',
        vehicleNumber: 'MH03EF9012',
        location: 'Andheri East, Mumbai',
        dateOfIncident: new Date('2023-06-08T14:15:00'),
        description: 'Bus driver was using mobile phone while driving, which is dangerous.',
        mediaFiles: [
            {
                url: 'https://example.com/media/driver-phone.jpg',
                publicId: 'driver-phone1'
            }
        ],
        isAnonymous: true,
        status: 'in-progress',
        statusTimestamps: {
            submittedAt: new Date('2023-06-08T15:30:00'),
            inProgressAt: new Date('2023-06-09T11:20:00')
        },
        createdAt: new Date('2023-06-08T15:30:00'),
        updatedAt: new Date('2023-06-09T11:20:00')
    },
    {
        transportMode: 'Metro',
        issueType: 'overcrowding',
        vehicleNumber: 'MET-456',
        location: 'Andheri Metro Station, Mumbai',
        dateOfIncident: new Date('2023-07-18T08:45:00'),
        description: 'Extreme rush during morning hours. Need more metro frequency.',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Vikram Singh',
        contactInfo: 'vikram.s@email.com',
        status: 'resolved',
        statusTimestamps: {
            submittedAt: new Date('2023-07-18T10:00:00'),
            inProgressAt: new Date('2023-07-19T09:30:00'),
            resolvedAt: new Date('2023-07-25T14:15:00')
        },
        createdAt: new Date('2023-07-18T10:00:00'),
        updatedAt: new Date('2023-07-25T14:15:00')
    },
    {
        transportMode: 'Train',
        issueType: 'bus-delay',
        vehicleNumber: 'HR-7890',
        location: 'Borivali Station, Mumbai',
        dateOfIncident: new Date('2023-08-22T19:30:00'),
        description: 'Train was delayed by 1 hour with no announcements or information.',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Sanjay Verma',
        contactInfo: '9876123450',
        status: 'pending',
        statusTimestamps: {
            submittedAt: new Date('2023-08-22T20:45:00')
        },
        createdAt: new Date('2023-08-22T20:45:00'),
        updatedAt: new Date('2023-08-22T20:45:00')
    },
    {
        transportMode: 'Bus',
        issueType: 'unclean-vehicle',
        vehicleNumber: 'MH04GH3456',
        location: 'Dadar TT, Mumbai',
        dateOfIncident: new Date('2023-09-10T16:20:00'),
        description: 'Bus seats were torn and had foul smell. Needs maintenance.',
        mediaFiles: [
            {
                url: 'https://example.com/media/torn-seats.jpg',
                publicId: 'torn-seats1'
            }
        ],
        isAnonymous: true,
        status: 'in-progress',
        statusTimestamps: {
            submittedAt: new Date('2023-09-10T17:30:00'),
            inProgressAt: new Date('2023-09-11T10:15:00')
        },
        createdAt: new Date('2023-09-10T17:30:00'),
        updatedAt: new Date('2023-09-11T10:15:00')
    },
    {
        transportMode: 'Other',
        issueType: 'other',
        vehicleNumber: 'AUTO-789',
        location: 'Malad West, Mumbai',
        dateOfIncident: new Date('2023-10-05T11:00:00'),
        description: 'Auto rickshaw driver refused to go by meter and demanded excessive fare.',
        mediaFiles: [],
        isAnonymous: false,
        contactName: 'Meena Iyer',
        contactInfo: 'meena.iyer@email.com',
        status: 'resolved',
        statusTimestamps: {
            submittedAt: new Date('2023-10-05T12:30:00'),
            inProgressAt: new Date('2023-10-06T09:45:00'),
            resolvedAt: new Date('2023-10-12T15:20:00')
        },
        createdAt: new Date('2023-10-05T12:30:00'),
        updatedAt: new Date('2023-10-12T15:20:00')
    },
    {
        transportMode: 'Train',
        issueType: 'rude-staff',
        vehicleNumber: 'CR-5678',
        location: 'Dadar Station, Mumbai',
        dateOfIncident: new Date('2023-11-15T07:45:00'),
        description: 'Ticket checker was very rude and shouted at passengers unnecessarily.',
        mediaFiles: [],
        isAnonymous: true,
        status: 'pending',
        statusTimestamps: {
            submittedAt: new Date('2023-11-15T09:00:00')
        },
        createdAt: new Date('2023-11-15T09:00:00'),
        updatedAt: new Date('2023-11-15T09:00:00')
    },
    {
        transportMode: 'Metro',
        issueType: 'faulty-ac',
        vehicleNumber: 'MET-123',
        location: 'Dahisar Metro Station, Mumbai',
        dateOfIncident: new Date('2023-12-03T13:15:00'),
        description: 'AC was not functioning properly in metro coach, making journey uncomfortable.',
        mediaFiles: [
            {
                url: 'https://example.com/media/metro-ac-issue.jpg',
                publicId: 'metro-ac-issue1'
            }
        ],
        isAnonymous: false,
        contactName: 'Arun Desai',
        contactInfo: 'arun.desai@email.com',
        status: 'in-progress',
        statusTimestamps: {
            submittedAt: new Date('2023-12-03T14:30:00'),
            inProgressAt: new Date('2023-12-04T10:45:00')
        },
        createdAt: new Date('2023-12-03T14:30:00'),
        updatedAt: new Date('2023-12-04T10:45:00')
    }, {
        transportMode: "Bus",
        issueType: "bus-delay",
        vehicleNumber: "MH12AB1234",
        location: "Pune Station",
        dateOfIncident: new Date("2024-01-10"),
        description: "Bus was late by 45 minutes.",
        isAnonymous: false,
        contactName: "John Doe",
        contactInfo: "john@example.com",
        status: "pending",
        mediaFiles: [],
    },
    {
        transportMode: "Train",
        issueType: "unclean-vehicle",
        vehicleNumber: "TR9876",
        location: "Chennai Central",
        dateOfIncident: new Date("2024-01-20"),
        description: "The train was extremely dirty, not cleaned properly.",
        isAnonymous: true,
        status: "in-progress",
        statusTimestamps: {
            inProgressAt: new Date("2024-01-22"),
        },
        mediaFiles: [],
    },

    // February Complaints
    {
        transportMode: "Metro",
        issueType: "overcrowding",
        vehicleNumber: "M1234",
        location: "Delhi Central Metro",
        dateOfIncident: new Date("2024-02-15"),
        description: "Metro was overcrowded during peak hours.",
        isAnonymous: true,
        status: "resolved",
        statusTimestamps: {
            inProgressAt: new Date("2024-02-16"),
            resolvedAt: new Date("2024-02-18"),
        },
        mediaFiles: [],
    },
    {
        transportMode: "Train",
        issueType: "rude-staff",
        vehicleNumber: "TR4567",
        location: "Howrah Junction",
        dateOfIncident: new Date("2024-02-25"),
        description: "The train conductor was extremely rude and unhelpful.",
        isAnonymous: false,
        contactName: "Anjali Mehta",
        contactInfo: "anjali@example.com",
        status: "pending",
        mediaFiles: [],
    },

    // March Complaints
    {
        transportMode: "Bus",
        issueType: "faulty-ac",
        vehicleNumber: "MH98XY1234",
        location: "Mumbai",
        dateOfIncident: new Date("2024-03-05"),
        description: "The AC in the bus was not working properly.",
        isAnonymous: false,
        contactName: "Rahul Singh",
        contactInfo: "rahul@example.com",
        status: "in-progress",
        statusTimestamps: {
            inProgressAt: new Date("2024-03-06"),
        },
        mediaFiles: [],
    },
    {
        transportMode: "Metro",
        issueType: "other",
        vehicleNumber: "M7890",
        location: "Kolkata Metro",
        dateOfIncident: new Date("2024-03-10"),
        description: "The ticketing system was not working properly.",
        isAnonymous: true,
        status: "resolved",
        statusTimestamps: {
            inProgressAt: new Date("2024-03-11"),
            resolvedAt: new Date("2024-03-12"),
        },
        mediaFiles: [],
    },

    // April Complaints
    {
        transportMode: "Train",
        issueType: "bus-delay",
        vehicleNumber: "T5678",
        location: "Nagpur",
        dateOfIncident: new Date("2024-04-05"),
        description: "Train was delayed by 30 minutes, causing inconvenience.",
        isAnonymous: true,
        status: "resolved",
        statusTimestamps: {
            inProgressAt: new Date("2024-04-06"),
            resolvedAt: new Date("2024-04-07"),
        },
        mediaFiles: [],
    },
    {
        transportMode: "Metro",
        issueType: "overcrowding",
        vehicleNumber: "M1112",
        location: "Bangalore Metro",
        dateOfIncident: new Date("2024-04-14"),
        description: "There were no seats available, and it was packed with people.",
        isAnonymous: false,
        contactName: "Kiran Kumar",
        contactInfo: "kiran@example.com",
        status: "pending",
        mediaFiles: [],
    },

    // May Complaints
    {
        transportMode: "Bus",
        issueType: "unclean-vehicle",
        vehicleNumber: "MH12CD5678",
        location: "Delhi",
        dateOfIncident: new Date("2024-05-08"),
        description: "The bus was filthy, with garbage on the floor.",
        isAnonymous: false,
        contactName: "Vikas Yadav",
        contactInfo: "vikas@example.com",
        status: "in-progress",
        statusTimestamps: {
            inProgressAt: new Date("2024-05-09"),
        },
        mediaFiles: [],
    },
    {
        transportMode: "Train",
        issueType: "faulty-ac",
        vehicleNumber: "TR6543",
        location: "Mumbai CST",
        dateOfIncident: new Date("2024-05-15"),
        description: "The AC in the train was not functioning, making the journey uncomfortable.",
        isAnonymous: true,
        status: "resolved",
        statusTimestamps: {
            inProgressAt: new Date("2024-05-16"),
            resolvedAt: new Date("2024-05-17"),
        },
        mediaFiles: [],
    },

    // June Complaints
    {
        transportMode: "Bus",
        issueType: "bus-delay",
        vehicleNumber: "MH12EF2345",
        location: "Mumbai",
        dateOfIncident: new Date("2024-06-03"),
        description: "The bus was delayed by an hour and no prior notifications were given.",
        isAnonymous: true,
        status: "pending",
        mediaFiles: [],
    },
    {
        transportMode: "Metro",
        issueType: "rude-staff",
        vehicleNumber: "M3456",
        location: "Delhi Metro",
        dateOfIncident: new Date("2024-06-10"),
        description: "The metro staff was rude when I asked for help with the ticket machine.",
        isAnonymous: false,
        contactName: "Priya Sharma",
        contactInfo: "priya@example.com",
        status: "in-progress",
        statusTimestamps: {
            inProgressAt: new Date("2024-06-12"),
        },
        mediaFiles: [],
    },
    {
        transportMode: "Train",
        issueType: "overcrowding",
        vehicleNumber: "TR2345",
        location: "Chennai",
        dateOfIncident: new Date("2024-06-15"),
        description: "The train was overcrowded, and there were no seats available.",
        isAnonymous: false,
        contactName: "Sandeep Verma",
        contactInfo: "sandeep@example.com",
        status: "resolved",
        statusTimestamps: {
            inProgressAt: new Date("2024-06-16"),
            resolvedAt: new Date("2024-06-17"),
        },
        mediaFiles: [],
    },
]
