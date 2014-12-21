create table therapists(
  id serial primary key,
  org_id integer not null references orgs(id),
  disc_id integer not null references disciplines(id),
  first varchar(255) not null,
  last varchar(255) not null,
  is_therapist boolean not null,
  photo varchar (500),
  productivity_goal smallint,
  email varchar(75) unique,
  phone varchar(15) unique
);
