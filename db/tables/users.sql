create table users(
  id serial primary key,
  org_id integer not null references orgs(id) on delete cascade,
  username varchar(255) unique not null,
  first varchar(255) not null,
  last varchar(255) not null,
  password char(60) not null,
  created_at timestamp not null default now()
);
