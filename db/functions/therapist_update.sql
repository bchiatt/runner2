create or replace function therapist_update(
  t_id integer,
  orgid integer,
  new_disc_id integer,
  new_first varchar,
  new_last varchar,
  new_is_therapist boolean,
  new_photo varchar,
  new_productivity_goal integer,
  new_email varchar,
  new_phone varchar
)
returns boolean AS $$
declare
begin

  update therapists
    set org_id = coalesce(orgid, org_id),
        disc_id = coalesce(new_disc_id, disc_id),
        first = coalesce(new_first, first),
        last = coalesce(new_last, last),
        is_therapist = coalesce(new_is_therapist, is_therapist),
        photo = coalesce(new_photo, photo),
        productivity_goal = coalesce(new_productivity_goal, productivity_goal),
        email = coalesce(new_email, email),
        phone = coalesce(new_phone, phone)
    where id = t_id and org_id = orgid;

  return found;

end;
$$ language plpgsql;
