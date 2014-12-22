create or replace function day_update
  (d_id integer, orgid integer, new_name varchar, new_abbr varchar, new_letter varchar)
returns boolean AS $$
declare
begin

  update days_in_week
    set full_name = new_name,
        abbr = new_abbr,
        letter = new_letter
    where id = d_id and org_id = orgid;

    return found;

end;
$$ language plpgsql;
