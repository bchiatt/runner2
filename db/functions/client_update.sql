create or replace function client_update(
  c_id integer,
  orgid integer,
  new_ins_id integer,
  new_first varchar,
  new_last varchar,
  new_email varchar,
  new_phone varchar,
  new_photo varchar,
  new_room varchar,
  new_admit_date date,
  new_discharge_date date
)
returns boolean AS $$
declare
begin

  update clients
    set org_id = coalesce(orgid, org_id),
        ins_id = coalesce(new_ins_id, ins_id),
        first = coalesce(new_first, first),
        last = coalesce(new_last, last),
        email = coalesce(new_email, email),
        phone = coalesce(new_phone, phone),
        photo = coalesce(new_photo, photo),
        room = coalesce(new_room, room),
        admit_date = coalesce(new_admit_date, admit_date),
        discharge_date = coalesce(new_discharge_date, discharge_date)
    where id = c_id and org_id = orgid;

  return found;

end;
$$ language plpgsql;
