"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [amount, setAmount] = useState(5);

  const startQuiz = () => {
    router.push(`/quiz?category=${category}&difficulty=${difficulty}&amount=${amount}`);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Velkommen til Quizzen!</h1>
      <p className="mb-6">Vælg dine præferencer og start quizzen</p>
      <h1>Velkommen til next quiz! Herunder kan du vælge kategori, sværhedsgrad og antal spørgsmål. Held og lykke!</h1>

      <div className="space-y-4 w-full max-w-md">
        <select className="w-full p-2" onChange={(e) => setCategory(e.target.value)}>
          <option value="">Vælg kategori</option>
          <option value="32">cartoon & animation</option>
          <option value="15">video games</option>
          <option value="14">Television</option>
          <option value="11">Film</option>
          <option value="9">General Knowledge</option>
        </select>

        <select className="w-full p-2" onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Vælg sværhedsgrad</option>
          <option value="easy">Let</option>
          <option value="medium">Mellem</option>
          <option value="hard">Svær</option>
        </select>

        <input
          type="number"
          min={1}
          max={20}
          className="w-full p-2"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    </main>
  );
}
