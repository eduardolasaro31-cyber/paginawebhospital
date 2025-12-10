import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PricingCard from '@/components/PricingCard';

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 9.99,
      period: 'mes',
      features: [
        'Hasta 5 doctores',
        'Hasta 50 pacientes',
        'Gestión de citas',
        'Soporte por email',
      ],
      popular: false,
    },
    {
      id: 'professional',
      name: 'Profesional',
      price: 29.99,
      period: 'mes',
      features: [
        'Doctores ilimitados',
        'Pacientes ilimitados',
        'Gestión de citas',
        'Reportes avanzados',
        'Soporte prioritario',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Empresarial',
      price: 99.99,
      period: 'mes',
      features: [
        'Todo lo del plan Profesional',
        'Múltiples sucursales',
        'API personalizada',
        'Soporte 24/7',
        'Capacitación incluida',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Elige tu Plan
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Selecciona el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} userId={user.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

