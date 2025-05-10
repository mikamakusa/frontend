import { AdForm } from '@/components/ad/AdForm';

export default function EditAdPage({ params }: { params: { id: string } }) {
    return (
        <main className="p-8 max-w-xl mx-auto">
            <h1 className="text-xl mb-4 font-bold">Modifier la publicité</h1>
            <AdForm adId={params.id} />
        </main>
    );
}
