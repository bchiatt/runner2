create or replace function client_add(
  org_id integer,
  first varchar,
  last varchar,
  ins_id integer,
  admit_date date,
  discharge_date date,
  room varchar,
  email varchar,
  phone varchar
)
returns integer AS $$
declare
  client_id integer;
begin

  insert into clients (
      org_id,
      first,
      last,
      ins_id,
      admit_date,
      discharge_date,
      room,
      email,
      phone
    )
    values (
      org_id,
      first,
      last,
      ins_id,
      admit_date,
      discharge_date,
      room,
      email,
      phone
    )
    returning id into client_id;

  return client_id;

end;
$$ language plpgsql;
