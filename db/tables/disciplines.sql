create table disciplines(
  id serial primary key,
  org_id integer not null references orgs(id),
  name varchar(50) not null,
  abbr char(2) not null
);
