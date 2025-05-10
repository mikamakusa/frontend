'use client';

import { useEffect, useState } from 'react';

type Ad = {
    id: number;
    title: string;
    imageUrl: string;
    link: string;
};

export default function AdBanner() {
    const [ad, setAd] = useState<Ad | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/ads/active')
            .then(res => res.json())
            .then(data => {
                if (data.length) setAd(data[0]); // Affiche la première pub active
            });
    }, []);

    if (!ad) return null;

    return (
        <a href={ad.link} target="_blank" rel="noopener noreferrer">
            <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full max-h-60 object-cover rounded-md shadow"
            />
        </a>
    );
}
