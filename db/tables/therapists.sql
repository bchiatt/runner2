create table therapists(
  id serial primary key,
  org_id integer not null references orgs(id),
  disc_id integer not null references disciplines(id),
  first varchar(255) not null,
  last varchar(255) not null,
  is_therapist boolean not null,
  photo varchar(500) default '/assets/img/profile.png',
  productivity_goal smallint default 83,
  email varchar(75) default 'not set',
  phone varchar(15) default 'not set'
);
