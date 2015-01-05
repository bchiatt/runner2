create or replace function day_update(
  d_id integer,
  orgid integer,
  new_num integer,
  new_name varchar,
  new_abbr varchar,
  new_letter varchar
)
returns boolean AS $$
declare
begin

  update days_in_week
    set num       = coalesce(new_num, num),
        full_name = coalesce(new_name, full_name),
        abbr      = coalesce(new_abbr, abbr),
        letter    = coalesce(new_letter, letter)
    where id = d_id and org_id = orgid;

    return found;

end;
$$ language plpgsql;
