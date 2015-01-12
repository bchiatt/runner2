create table clients(
  id serial primary key,
  org_id integer not null references orgs(id),
  ins_id integer references insurances(id),
  first varchar(50) not null,
  last varchar(50) not null,
  email varchar(75) default 'not set',
  phone varchar(15) default 'not set',
  photo varchar(500) default '/assets/img/profile.png',
  room varchar(10) default 'not active',
  admit_date date,
  discharge_date date
);
