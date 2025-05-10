'use client';

import { useEffect, useState } from 'react';

export const AdList = () => {
    const [ads, setAds] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/ads/active')
            .then(res => res.json())
            .then(setAds);
    }, []);

    return (
        <table className="w-full text-left border">
            <thead>
            <tr>
                <th className="p-2 border">Titre</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Clics</th>
                <th className="p-2 border">Action</th>
            </tr>
            </thead>
            <tbody>
            {ads.map(ad => (
                <tr key={ad.id}>
                    <td className="p-2 border">{ad.title}</td>
                    <td className="p-2 border">{ad.type}</td>
                    <td className="p-2 border">{ad.clicks}</td>
                    <td className="p-2 border">
                        <a
                            href={ad.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                        >
                            Voir
                        </a>
                    </td>
                    <td className="p-2 border">
                        <Link href={`/admin/ads/edit/${ad.id}`} className="text-blue-600 mr-2">Modifier</Link>
                        <button
                            onClick={() => {
                                if (confirm('Supprimer cette pub ?')) {
                                    fetch(`http://localhost:3000/ads/${ad.id}`, { method: 'DELETE' }).then(() =>
                                        window.location.reload()
                                    );
                                }
                            }}
                            className="text-red-600"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
