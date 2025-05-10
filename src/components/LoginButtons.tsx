`use client`;

export const LoginButtons = () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`;

    return (
        <div className="flex flex-col gap-4">
            <a href={`${BACKEND_URL}/auth/login/google`}>
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                    Se connecter avec Google
                </button>
            </a>
            <a href={`${BACKEND_URL}/auth/login/facebook`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Se connecter avec Facebook
                </button>
            </a>
        </div>
    );
};