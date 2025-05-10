'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AdType = 'image' | 'video' | 'carousel';

interface AdFormProps {
    adId?: string; // Si présent, on est en mode édition
}

export const AdForm = ({ adId }: AdFormProps) => {
    const [type, setType] = useState<AdType>('image');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [mediaUrls, setMediaUrls] = useState<string[]>(['']);

    const router = useRouter();

    useEffect(() => {
        if (!adId) return;
        fetch(`http://localhost:3000/ads/${adId}`)
            .then(res => res.json())
            .then(ad => {
                setTitle(ad.title);
                setType(ad.type);
                setLink(ad.link);
                setImageUrl(ad.imageUrl || '');
                setVideoUrl(ad.videoUrl || '');
                setMediaUrls(ad.mediaUrls || ['']);
            });
    }, [adId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const body: any = {
            title,
            type,
            link,
        };

        if (type === 'image') body.imageUrl = imageUrl;
        if (type === 'video') body.videoUrl = videoUrl;
        if (type === 'carousel') body.mediaUrls = mediaUrls.filter(Boolean);

        const method = adId ? 'PATCH' : 'POST';
        const url = adId ? `http://localhost:3000/ads/${adId}` : 'http://localhost:3000/ads';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        router.push('/admin/ads');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                placeholder="Titre"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border p-2"
            />

            <select
                value={type}
                onChange={e => setType(e.target.value as AdType)}
                className="w-full border p-2"
            >
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
                <option value="carousel">Carrousel</option>
            </select>

            {type === 'image' && (
                <input
                    placeholder="URL de l’image"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="w-full border p-2"
                />
            )}

            {type === 'video' && (
                <input
                    placeholder="URL de la vidéo"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    className="w-full border p-2"
                />
            )}

            {type === 'carousel' &&
                mediaUrls.map((url, index) => (
                    <input
                        key={index}
                        placeholder={`Image ${index + 1}`}
                        value={url}
                        onChange={e => {
                            const newUrls = [...mediaUrls];
                            newUrls[index] = e.target.value;
                            setMediaUrls(newUrls);
                        }}
                        className="w-full border p-2"
                    />
                ))}

            {type === 'carousel' && (
                <button
                    type="button"
                    className="text-sm text-blue-500"
                    onClick={() => setMediaUrls([...mediaUrls, ''])}
                >
                    + Ajouter une image
                </button>
            )}

            <input
                placeholder="Lien de redirection"
                value={link}
                onChange={e => setLink(e.target.value)}
                className="w-full border p-2"
            />

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                {adId ? 'Mettre à jour' : 'Créer la publicité'}
            </button>
        </form>
    );
};
