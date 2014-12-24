create or replace function work_schedule_update(
  s_id integer,
  o_id integer,
  new_t_id integer,
  new_d_id integer,
  new_is_eval boolean,
  new_start time,
  new_end time
)
returns boolean AS $$
declare
begin

  update work_schedules
    set therapist_id = coalesce(new_t_id, therapist_id),
        day_id = coalesce(new_d_id, day_id),
        is_late_eval = coalesce(new_is_eval, is_late_eval),
        start_time = coalesce(new_start, start_time),
        end_time = coalesce(new_end, end_time)
    where id = s_id and org_id = o_id;

  return found;

end;
$$ language plpgsql;
