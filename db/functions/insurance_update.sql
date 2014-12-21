create or replace function insurance_update
  (id integer, org_id integer, name varchar, is_rug boolean)
returns integer AS $$
declare
begin

  update insurances
    set name = name
    and is_rug = is_rug
    where id = id and org_id = org_id
    returning id;

end;
$$ language plpgsql;
