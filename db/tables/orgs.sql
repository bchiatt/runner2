create table orgs(
  id serial primary key,
  admin_id integer,
  name varchar(255) unique not null,
  city varchar(255) not null,
  state varchar(2) not null,
  created_at timestamp not null default now()
);
