create table treatment_plans(
  id serial primary key,
  org_id integer not null references orgs(id),
  client_id integer not null references clients(id),
  eval_therapist_id integer not null references therapists(id),
  disc_id integer not null references disciplines(id),
  eval_date date not null,
  weekly_day_id integer not null references days_in_week(id),
  recert_date date,
  discharge_date date,
  frequency_low smallint not null,
  frequency_high smallint not null
);
