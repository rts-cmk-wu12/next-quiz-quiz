'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchData } from '../api';

export default function QuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [amount, setAmount] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
    const c = searchParams.get('category');
    const d = searchParams.get('difficulty');
    const a = searchParams.get('amount');

    setCategory(c);
    setDifficulty(d);
    setAmount(a);
  }, []);

  useEffect(() => {
    if (category && difficulty && amount) {
      fetchData(amount, category, difficulty).then((data) => {
                  const formatted = data.results.map((q) => ({
            ...q,
            answers: shuffle([...q.incorrect_answers, q.correct_answer]),
          }));
          setQuestions(formatted);
      })
    }
  }, [category, difficulty, amount]);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer) => {
    if (showAnswer) return;

    setSelected(answer);
    setShowAnswer(true);

    const correct = questions[current].correct_answer;

    if (answer === correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelected(null);
      setShowAnswer(false);

      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        router.push(`/result?score=${score + (answer === correct ? 1 : 0)}&total=${questions.length}`);
      }
    }, 1000);
  };

  if (!questions.length) return <p className="p-4">Indlæser spørgsmål...</p>;

  const question = questions[current];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{decode(question.question)}</h2>
      <div className="grid gap-4">
        {question.answers.map((ans) => (
          <button
            key={ans}
            onClick={() => handleAnswer(ans)}
            className={`p-2 rounded ${
              showAnswer
                ? ans === question.correct_answer
                  ? 'bg-green-300'
                  : ans === selected
                  ? 'bg-red-300'
                  : 'bg-gray-100'
                : 'bg-blue-200'
            }`}
          >
            {decode(ans)}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm">Spørgsmål {current + 1} af {questions.length}</p>
    </div>
  );
}

// HTML-decode helper
function decode(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
