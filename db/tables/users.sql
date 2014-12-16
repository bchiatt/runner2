create table users(
  id serial primary key,
  org_id integer references orgs(id) on delete cascade,
  username varchar(255) unique not null,
  first varchar(255) not null,
  last varchar(255) not null,
  password char(60) not null,
  created_at timestamp not null default now()
);

alter table orgs add foreign key ("admin_id") references users(id) on delete cascade;
