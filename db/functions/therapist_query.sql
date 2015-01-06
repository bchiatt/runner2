create or replace function therapist_query (oid integer)
returns table (
  id integer, org_id integer, disc_id integer,
  disc_name varchar, disc_abbr char,
  first varchar, last varchar, is_therapist boolean,
  photo varchar, productivity_goal smallint, email varchar, phone varchar
  ) AS $$
declare
begin

  return query
    select
      t.id,
      t.org_id,
      t.disc_id,
      d.name as "disc_id",
      d.abbr as "disc_abbr",
      t.first,
      t.last,
      t.is_therapist,
      t.photo,
      t.productivity_goal,
      t.email,
      t.phone
    from therapists t
    inner join disciplines d on d.id = t.disc_id
    where t.org_id = oid;

end;
$$ language plpgsql;
