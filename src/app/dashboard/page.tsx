`use client`;

import { useEffect, useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem('user');
        if (saved) setUser(JSON.parse(saved));
    }, []);

    return (
        <main className="p-8">
            <h1 className="text-2xl">Tableau de bord</h1>
            {user ? (
                <pre className="mt-4 bg-gray-100 p-4 rounded">{JSON.stringify(user, null, 2)}</pre>
            ) : (
                <p>Chargement...</p>
            )}
        </main>
    );
}