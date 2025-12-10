'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
}

interface PricingCardProps {
  plan: Plan;
  userId: string;
}

export default function PricingCard({ plan, userId }: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          userId,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No se pudo crear la sesión de pago');
      }
    } catch (error) {
      console.error('Error al suscribirse:', error);
      alert('Error al procesar el pago. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative rounded-lg border p-8 shadow-lg ${
        plan.popular
          ? 'border-green-500 bg-white dark:bg-zinc-800 scale-105'
          : 'border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-sm font-medium text-white">
          Más Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {plan.name}
        </h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            ${plan.price}
          </span>
          <span className="text-zinc-600 dark:text-zinc-400">/{plan.period}</span>
        </div>
      </div>

      <ul className="mb-8 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="mr-2 h-5 w-5 flex-shrink-0 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition-colors disabled:opacity-50 ${
          plan.popular
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
        }`}
      >
        {loading ? 'Procesando...' : 'Suscribirse'}
      </button>
    </div>
  );
}

