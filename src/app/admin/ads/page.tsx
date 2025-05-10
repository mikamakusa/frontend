'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AdList } from '@/components/ad/AdList';
import Link from 'next/link';

export default function AdminAdsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login');
        if (status === 'authenticated' && session.user.role !== 'admin') router.push('/');
    }, [status, session]);

    if (status !== 'authenticated') return null;

    return (
        <main className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Publicités</h1>
                <Link href="/admin/ads/new" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Nouvelle publicité
                </Link>
            </div>
            <AdList />
        </main>
    );
}
