create or replace function work_schedule_add(
  o_id integer,
  t_id integer,
  d_id integer,
  is_eval boolean,
  start_time time,
  end_time time
)
returns integer AS $$
declare
  sched_id integer;
begin

  insert into work_schedules (org_id, therapist_id, day_id, is_late_eval, start_time, end_time)
    values (o_id, t_id, d_id, is_eval, start_time, end_time)
    returning id into sched_id;

  return sched_id;

end;
$$ language plpgsql;
