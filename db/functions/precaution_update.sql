create or replace function precaution_update
  (pid integer, orgid integer, new_name varchar, new_description varchar)
returns boolean as $$
declare
begin

  update precautions
    set name = new_name, description = new_description
    where id = pid and org_id = orgid;

  return found;

end;
$$ language plpgsql;
