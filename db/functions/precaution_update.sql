create or replace function precautions_update
  (id integer, org_id integer, name varchar, description varchar)
returns integer AS $$
declare
begin

  update precuations
    set name = name
    and description = description
    where id = id and org_id = org_id
    returning id;

end;
$$ language plpgsql;
