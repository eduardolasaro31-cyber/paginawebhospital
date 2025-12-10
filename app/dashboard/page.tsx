import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Obtener información de suscripción del usuario
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Bienvenido, {user.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Subscription Card */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Suscripción
            </h2>
            {subscription ? (
              <div className="space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Plan: <span className="font-medium text-zinc-900 dark:text-zinc-50">{subscription.plan}</span>
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Estado: <span className="font-medium text-green-600 dark:text-green-400">Activa</span>
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Renovación: {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  No tienes una suscripción activa
                </p>
                <a
                  href="/pricing"
                  className="inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Ver Planes
                </a>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Doctores
            </h2>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">-</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Total registrados
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Pacientes
            </h2>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">-</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Total registrados
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Citas
            </h2>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">-</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Total programadas
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Acciones Rápidas
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/dashboard/doctors"
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600"
            >
              Gestionar Doctores
            </a>
            <a
              href="/dashboard/patients"
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600"
            >
              Gestionar Pacientes
            </a>
            <a
              href="/dashboard/appointments"
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600"
            >
              Gestionar Citas
            </a>
            {!subscription && (
              <a
                href="/pricing"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                Suscribirse
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

