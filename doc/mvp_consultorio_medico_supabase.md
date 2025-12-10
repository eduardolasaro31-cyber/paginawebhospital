# MVP -- Consultorio Médico con Supabase (3 Tablas)

## Tablas

1.  doctor\
2.  paciente\
3.  citas

------------------------------------------------------------------------

## 1. Tabla: doctor

``` sql
create table doctor (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  especialidad text not null,
  telefono text,
  creado_en timestamp default now()
);
```

------------------------------------------------------------------------

## 2. Tabla: paciente

``` sql
create table paciente (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  dni text not null unique,
  telefono text,
  correo text,
  creado_en timestamp default now()
);
```

------------------------------------------------------------------------

## 3. Tabla: citas

``` sql
create table citas (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid references doctor(id),
  paciente_id uuid references paciente(id),
  fecha date not null,
  hora text not null,
  estado text default 'pendiente'
    check (estado in ('pendiente','confirmada','cancelada','atendida')),
  creado_en timestamp default now(),
  unique(doctor_id, fecha, hora)
);
```

------------------------------------------------------------------------

## CRUD Básico

### Registrar doctor

``` javascript
await supabase.from("doctor").insert({
  nombre: "Dr. Juan López",
  especialidad: "Cardiología",
  telefono: "987654321"
});
```

### Registrar paciente

``` javascript
await supabase.from("paciente").insert({
  nombre: "María Torres",
  dni: "72654833",
  telefono: "912345678",
  correo: "maria@gmail.com"
});
```

### Crear cita

``` javascript
await supabase.from("citas").insert({
  doctor_id: idDoctor,
  paciente_id: idPaciente,
  fecha: "2025-04-16",
  hora: "10:00"
});
```

### Obtener citas del día

``` javascript
const { data } = await supabase
  .from("citas")
  .select("*, doctor(nombre, especialidad), paciente(nombre)")
  .eq("fecha", "2025-04-16");
```

------------------------------------------------------------------------
