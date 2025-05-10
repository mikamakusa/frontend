'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Ad = {
    id: string;
    title: string;
    type: 'image' | 'video' | 'carousel';
    imageUrl?: string;
    videoUrl?: string;
    mediaUrls?: string[];
    link: string;
};

export const PublicAd = () => {
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/ads') // à adapter à ton URL publique
            .then(res => res.json())
            .then(data => setAds(data));
    }, []);

    if (!ads.length) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {ads.map(ad => (
                <div
                    key={ad.id}
                    className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() => window.open(ad.link, '_blank')}
                >
                    <div className="aspect-video bg-black/10 flex items-center justify-center">
                        {ad.type === 'image' && ad.imageUrl && (
                            <Image
                                src={ad.imageUrl}
                                alt={ad.title}
                                width={400}
                                height={225}
                                className="object-cover w-full h-full"
                            />
                        )}

                        {ad.type === 'video' && ad.videoUrl && (
                            <video
                                src={ad.videoUrl}
                                controls
                                className="w-full h-full object-cover"
                            />
                        )}

                        {ad.type === 'carousel' && ad.mediaUrls && (
                            <Carousel urls={ad.mediaUrls} />
                        )}
                    </div>
                    <div className="p-4 text-center font-semibold">{ad.title}</div>
                </div>
            ))}
        </div>
    );
};

const Carousel = ({ urls }: { urls: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(i => (i + 1) % urls.length);
        }, 3000);
        return () => clearInterval(id);
    }, [urls.length]);

    return (
        <Image
            src={urls[index]}
            alt="carousel"
            width={400}
            height={225}
            className="object-cover w-full h-full"
        />
    );
};
