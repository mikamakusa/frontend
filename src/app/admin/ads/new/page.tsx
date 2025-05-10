import { AdForm } from '@/components/ad/AdForm';

export default function NewAdPage() {
    return (
        <main className="p-8 max-w-xl mx-auto">
            <h1 className="text-xl mb-4 font-bold">Nouvelle publicité</h1>
            <AdForm />
        </main>
    );
}
