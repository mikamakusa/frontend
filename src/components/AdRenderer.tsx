'use client';

import { useEffect, useState } from 'react';

type Ad = {
    id: number;
    title: string;
    type: 'image' | 'video' | 'carousel';
    imageUrl?: string;
    videoUrl?: string;
    mediaUrls?: string[];
    link: string;
};

export default function AdRenderer() {
    const [ad, setAd] = useState<Ad | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/ads/active')
            .then(res => res.json())
            .then(data => {
                if (data.length) setAd(data[0]);
            });
    }, []);

    const handleClick = () => {
        if (ad) {
            fetch(`http://localhost:3000/ads/${ad.id}/click`, {
                method: 'POST',
            });
        }
    };

    if (!ad) return null;

    const content = (() => {
        switch (ad.type) {
            case 'image':
                return <img src={ad.imageUrl} alt={ad.title} className="w-full rounded shadow" />;
            case 'video':
                return (
                    <video controls className="w-full rounded shadow">
                        <source src={ad.videoUrl} type="video/mp4" />
                        Votre navigateur ne supporte pas la vidéo.
                    </video>
                );
            case 'carousel':
                return (
                    <div className="flex overflow-x-auto gap-2">
                        {ad.mediaUrls?.map((url, idx) => (
                            <img key={idx} src={url} className="h-40 rounded shadow" />
                        ))}
                    </div>
                );
            default:
                return null;
        }
    })();

    return (
        <a href={ad.link} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
            <div className="my-4">{content}</div>
        </a>
    );
}
