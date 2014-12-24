create or replace function client_add(
  org_id integer,
  first varchar,
  last varchar
)
returns integer AS $$
declare
  client_id integer;
begin

  insert into clients (org_id, first, last)
    values (org_id, first, last)
    returning id into client_id;

  return client_id;

end;
$$ language plpgsql;
