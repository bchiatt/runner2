create table orgs(
  id serial primary key,
  id_admin integer references users(id),
  name varchar(255),
  city varchar(255),
  state varchar(2),
  created_at timestamp not null default now()
);
