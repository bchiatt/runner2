create or replace function insurance_update
  (iid integer, orgid integer, new_name varchar, new_is_rug boolean)
returns boolean AS $$
declare
begin

  update insurances
    set name = coalesce(new_name, name),
        is_rug = coalesce(new_is_rug, is_rug)
    where id = iid and org_id = orgid;

  return found;

end;
$$ language plpgsql;
