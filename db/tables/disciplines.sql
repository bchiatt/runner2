create table disciplines(
  id serial primary key,
  org_id integer not null references orgs(id),
  name varchar(50) unique not null,
  abbr char(2) unique not null
);
