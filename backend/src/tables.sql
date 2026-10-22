//contenido de la tabla users
create table users(
  id serial primary key,
  username varchar(50) not null,
  email varchar(250) not null unique,
  password varchar(2550) not null,
  created_at timestamptz not null default now()
);
//contenido de la tabla tasks
create table tasks(
  id serial primary key,
  title varchar(150) not null,
  descripton text,
  due_dato date,
  user_id integer not null references users(id) on delete cascade,
  created_at timestamptz not null default now()
);

//seguridad
alter table users enable row level security;
alter table users enable row level security;
