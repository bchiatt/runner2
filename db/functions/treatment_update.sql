create or replace function treatment_update(
  tx_id integer,
  c_id integer,
  t_id integer,
  o_id integer,
  d_id integer,
  i_id integer,
  p_id integer,
  new_exp integer,
  new_act integer,
  new_tx_date date,
  new_day_count integer,
  new_is_note boolean,
  new_is_arch boolean
)
returns boolean AS $$
declare
begin

update treatments
  set client_id = coalesce(c_id, client_id),
      therapist_id = coalesce(t_id, therapist_id),
      disc_id = coalesce(d_id, disc_id),
			ins_id = coalesce(i_id, ins_id),
			plan_id = coalesce(p_id, plan_id),
			mins_expected = coalesce(new_exp, mins_expected),
			mins_actual = coalesce(new_act, mins_actual),
			tx_date = coalesce(new_tx_date, tx_date),
			day_count = coalesce(new_day_count, day_count),
			is_note_done = coalesce(new_is_note, is_note_done),
			is_archived = coalesce(new_is_arch, is_archived)
    where id = tx_id and org_id = o_id;

  return found;

  end;
  $$ language plpgsql;
