create table treatments(
  id serial primary key,
  client_id integer not null references clients(id),
  therapist_id integer not null references therapists(id),
  org_id integer not null references orgs(id),
  disc_id integer not null references disciplines(id),
  ins_id integer not null references insurances(id),
  day_id integer not null references days_in_week(id),
  mins_expected smallint not null,
  mins_actual smallint not null,
  date date not null,
  day_count smallint not null,
  is_note_done boolean not null default false,
  is_archived boolean not null default false
);
