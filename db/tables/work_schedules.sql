create table work_schedules(
  id serial primary key,
  therapist_id integer not null references therapists(id),
  org_id integer not null references orgs(id),
  day_id integer not null references days_in_week(id),
  is_late_eval boolean not null,
  start_time time,
  end_time time
);
