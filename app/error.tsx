'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    const router = useRouter();

    useEffect(() => {
        console.error('Error caught by error.tsx:', error);
    }, [error]);

    return (
        <html>
            <body className="flex flex-col items-center justify-center min-h-screen text-center p-8">
                <h1 className="text-4xl font-bold mb-4 text-red-600">Something went wrong!</h1>
                <p className="text-muted-foreground mb-6">
                    {error.message || 'Unexpected error occurred.'}
                </p>

                <div className="flex gap-4">
                    <Button variant="default" onClick={() => reset()}>
                        Try Again
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/')}>
                        Go to Home
                    </Button>
                </div>
            </body>
        </html>
    );
}
