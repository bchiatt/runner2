create table treatments(
  id serial primary key,
  client_id integer not null references clients(id),
  therapist_id integer not null references therapists(id),
  org_id integer not null references orgs(id),
  disc_id integer not null references disciplines(id),
  ins_id integer not null references insurances(id),
  plan_id integer references treatment_plans(id),
  mins_expected smallint not null,
  mins_actual smallint default 0,
  tx_date date not null,
  day_count smallint,
  is_note_done boolean default false,
  is_archived boolean default false
);
