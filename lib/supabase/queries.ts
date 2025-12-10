import { createClient } from './server';

// Tipos para las tablas
export interface Doctor {
  id: string;
  nombre: string;
  especialidad: string;
  telefono?: string;
  creado_en?: string;
}

export interface Paciente {
  id: string;
  nombre: string;
  dni: string;
  telefono?: string;
  correo?: string;
  creado_en?: string;
}

export interface Cita {
  id: string;
  doctor_id: string;
  paciente_id: string;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'atendida';
  creado_en?: string;
  doctor?: Doctor;
  paciente?: Paciente;
}

// Funciones CRUD para Doctor
export async function createDoctor(data: Omit<Doctor, 'id' | 'creado_en'>) {
  const supabase = await createClient();
  const { data: doctor, error } = await supabase
    .from('doctor')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return doctor;
}

export async function getDoctors() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('doctor')
    .select('*')
    .order('creado_en', { ascending: false });

  if (error) throw error;
  return data;
}

// Funciones CRUD para Paciente
export async function createPaciente(data: Omit<Paciente, 'id' | 'creado_en'>) {
  const supabase = await createClient();
  const { data: paciente, error } = await supabase
    .from('paciente')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return paciente;
}

export async function getPacientes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('paciente')
    .select('*')
    .order('creado_en', { ascending: false });

  if (error) throw error;
  return data;
}

// Funciones CRUD para Citas
export async function createCita(data: Omit<Cita, 'id' | 'creado_en' | 'doctor' | 'paciente'>) {
  const supabase = await createClient();
  const { data: cita, error } = await supabase
    .from('citas')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return cita;
}

export async function getCitasByDate(fecha: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('citas')
    .select('*, doctor(nombre, especialidad), paciente(nombre)')
    .eq('fecha', fecha)
    .order('hora', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getCitas() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('citas')
    .select('*, doctor(nombre, especialidad), paciente(nombre)')
    .order('fecha', { ascending: false })
    .order('hora', { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateCitaEstado(id: string, estado: Cita['estado']) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('citas')
    .update({ estado })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

