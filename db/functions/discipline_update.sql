create or replace function discipline_update
  (id integer, org_id integer, name varchar, abbr varchar)
returns integer AS $$
declare
begin

  update disciplines
    set name = name
    and abbr = abbr
    where id = id and org_id = org_id
    returning id;

end;
$$ language plpgsql;
