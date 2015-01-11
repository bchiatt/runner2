create or replace function treatment_add(
  c_id integer,
  t_id integer,
  o_id integer,
  d_id integer,
  i_id integer,
  p_id integer,
  exp integer,
  act integer,
  tx_date date,
  day_count integer,
  note boolean default false,
  archived boolean default false
)
returns integer AS $$
declare
  tx_id integer;
begin

  insert into treatments
    (client_id, therapist_id, org_id, disc_id, ins_id,
    plan_id, mins_expected, mins_actual, tx_date,
    day_count, is_note_done, is_archived)
  values
    (c_id, t_id, o_id, d_id, i_id, p_id, exp,
    act, tx_date, day_count, note, archived)
  returning id into tx_id;

  return tx_id;

end;
$$ language plpgsql;
