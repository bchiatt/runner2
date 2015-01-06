create or replace function therapist_add(
  org_id integer,
  disc_id integer,
  first varchar,
  last varchar,
  is_therapist boolean,
  p_goal smallint,
  email varchar,
  phone varchar
)
returns integer AS $$
declare
  therapist_id integer;
begin

  insert into therapists (org_id, disc_id, first, last, is_therapist, productivity_goal, email, phone)
    values (org_id, disc_id, first, last, is_therapist, p_goal, email, phone)
    returning id into therapist_id;

  return therapist_id;

end;
$$ language plpgsql;
