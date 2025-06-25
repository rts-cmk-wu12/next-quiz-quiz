'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = searchParams.get('score');
  const total = searchParams.get('total');

  const handleRestart = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Resultat</h1>
      <p className="text-lg mb-6">Du fik <strong>{score}</strong> ud af <strong>{total}</strong> rigtige!</p>
      
      <button
        onClick={handleRestart}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Start ny quiz
      </button>
    </div>
  );
}
