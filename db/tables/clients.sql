create table clients(
  id serial primary key,
  org_id integer not null references orgs(id),
  ins_id integer references insurances(id),
  first varchar(50) not null,
  last varchar(50) not null,
  email varchar(75) unique,
  phone varchar(15) unique,
  photo varchar(500),
  room varchar(10),
  admit_date date,
  discharge_date date
);
