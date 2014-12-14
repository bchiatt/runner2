create table users(
  id serial primary key,
  username varchar(255) unique not null,
  password char(60) not null,
  created_at timestamp not null default now()
);
