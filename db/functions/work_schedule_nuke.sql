create or replace function work_schedule_nuke(
  o_id integer,
  s_id integer
)
returns integer AS $$
declare
begin

  s_id := (
    select s.id from work_schedules s
    where s.id = s_id and s.org_id = o_id
  );
  delete from work_schedules s where s.id = s_id;

  return s_id;

end;
$$ language plpgsql;
