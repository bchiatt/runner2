create or replace function discipline_add
  (org_id integer, name varchar, abbr varchar)
returns integer AS $$
declare
  disc_id integer;
begin

  insert into disciplines (org_id, name, abbr)
    values (org_id, name, abbr)
    returning id into disc_id;

  return disc_id;

end;
$$ language plpgsql;
