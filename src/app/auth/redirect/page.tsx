`use client`;

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('http://localhost:3000/auth/redirect', (
                credentials: 'include',
            ));
            const user = await res.json();
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/dashboard');
        }

        fetchUser();
    }, [router]);

    return <p>Connexion en cours...</p>
}