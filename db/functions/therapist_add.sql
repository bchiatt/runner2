create or replace function therapist_add(
  org_id integer,
  disc_id integer,
  first varchar,
  last varchar,
  is_therapist boolean
)
returns integer AS $$
declare
  therapist_id integer;
begin

  insert into therapists (org_id, disc_id, first, last, is_therapist)
    values (org_id, disc_id, first, last, is_therapist)
    returning id into therapist_id;

  return therapist_id;

end;
$$ language plpgsql;
