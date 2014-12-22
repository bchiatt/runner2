create or replace function precaution_add
  (org_id integer, name varchar, description varchar)
returns integer AS $$
declare
  prec_id integer;
begin

  insert into precautions (org_id, name, description)
    values (org_id, name, description)
    returning id into prec_id;

  return prec_id;

end;
$$ language plpgsql;
