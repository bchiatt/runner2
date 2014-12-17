create table clients(
  id serial primary key,
  org_id integer not null references orgs(id),
  ins_id integer not null references insurances(id),
  first varchar(50) not null,
  last varchar(50) not null,
  photo varchar(500),
  room varchar(10),
  admit_date date not null,
  discharge_date date
);
