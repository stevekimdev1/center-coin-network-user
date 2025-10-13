"use client";
import { useRouter } from "next/navigation";
import { useString } from '@/src/context/StringContext';

export default function NotFound() {
  const router = useRouter();
  const { string } = useString();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Center Network</h1>
      <p className="text-xl text-gray-600 mb-8">{string.pageNotFound}</p>
      <button 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        onClick={() => router.push('/menu/home')}
      >
        {string.goHome}
      </button>
    </div>
  );
}