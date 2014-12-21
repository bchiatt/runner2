create or replace function insurance_add
  (org_id integer, name varchar, is_rug boolean)
returns integer AS $$
declare
  ins_id integer;
begin

  insert into insurances (org_id, name, is_rug)
    values (org_id, name, is_rug)
    returning id into ins_id;

  return select * from insurances where id = ins_id;

end;
$$ language plpgsql;
