create table insurances(
  id serial primary key,
  org_id integer not null references orgs(id),
  name varchar(50) unique not null,
  is_rug boolean not null
);
