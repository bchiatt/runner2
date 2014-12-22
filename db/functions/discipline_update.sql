create or replace function discipline_update
  (d_id integer, orgid integer, new_name varchar, new_abbr varchar)
returns boolean AS $$
declare
begin

  update disciplines
    set name = new_name, abbr = new_abbr
    where id = d_id and org_id = orgid;

    return found;

end;
$$ language plpgsql;
