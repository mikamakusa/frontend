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
        fetch(`/api/ads/${ad.id}/view`, { method: 'POST' });
    }, [status, session, ad.id]);

    if (status !== 'authenticated') return null;

    return (
        <main className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Publicités</h1>
                <Link href="/admin/ads/new" className="bg-blue-600 text-white px-4 py-2 rounded">
                    <label>Actif ? <input type="checkbox" checked={isActive} onChange={} /></label>
                    <label>Date de début <input type="datetime-local" value={startsAt} onChange={} /></label>
                    <label>Date de fin <input type="datetime-local" value={endsAt} onChange={} /></label>
                    Nouvelle publicité
                    <a href={ad.targetUrl} onClick={() => fetch(`/api/ads/${ad.id}/click`, { method: 'POST' })}>
                        <img src={ad.imageUrl} alt={ad.title} />
                    </a>
                </Link>
            </div>
            <AdList />
        </main>
    );
}
