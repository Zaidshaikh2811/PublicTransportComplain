import { getAllComplaints } from '@/actions/complaint';
import { DataTableDemo } from '@/components/Created/Datatable';

import React from 'react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Public Transport Complaints",
    description: "Report a problem. We'll get back to you.",
};

const page = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        return redirect('/login'); // Redirect if no token
    }

    let email: string | null = null;

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your_jwt_secret'
        );

        if (typeof decodedToken !== 'string' && decodedToken.email) {
            email = decodedToken.email;
        } else {
            return redirect('/login'); // Invalid token format
        }
    } catch (err: unknown) {
        if (err instanceof Error && err.name === 'TokenExpiredError') {
            console.error('JWT expired');
        } else if (err instanceof Error) {
            console.error('JWT error:', err.message);
        } else {
            console.error('Unknown error occurred');
        }
        return redirect('/login'); // Redirect on token failure
    }

    if (!email) {
        return redirect('/login'); // Redirect if email is null
    }

    const { data } = await getAllComplaints({ email });

    return (
        <div className="container mx-auto mt-12">
            <h1>View Complaint</h1>
            <DataTableDemo data={JSON.parse(JSON.stringify(data))} />
        </div>
    );
};

export default page;
