// app/api/seed-complaints/route.ts
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import Complaint from '@/lib/models/Complaint'
import { dummyComplaints } from './dummyComplaints'

export async function POST() {
    try {
        await connectToDatabase()

        const inserted = await Complaint.insertMany(dummyComplaints)

        return NextResponse.json({ message: "Seeded successfully", inserted }, { status: 201 })
    } catch (error) {
        console.error("Seeding failed:", error)
        return NextResponse.json({ error: "Failed to seed complaints" }, { status: 500 })
    }
}
