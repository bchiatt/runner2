create or replace function day_add
  (org_id integer, full_name varchar, abbr varchar, letter varchar)
returns integer AS $$
declare
  day_id integer;
begin

  insert into days_in_week (org_id, full_name, abbr, letter)
    values (org_id, full_name, abbr, letter)
    returning id into day_id;

  return day_id;

end;
$$ language plpgsql;
