create or replace function treatment_plan_update(
	tp_id integer,
  o_id integer,
  c_id integer,
  t_id integer,
  ds_id integer,
	ev_date date,
	dy_id integer,
	rc_date date,
	dc_date date,
	fq_low int,
	fq_high int
)
returns boolean AS $$
declare
begin

  update treatment_plans
    set client_id = coalesce(c_id, client_id),
        eval_therapist_id = coalesce(t_id, eval_therapist_id),
        disc_id = coalesce(ds_id, disc_id),
        eval_date = coalesce(ev_date, eval_date),
        weekly_day_id = coalesce(dy_id, weekly_day_id),
        recert_date = coalesce(rc_date, recert_date),
        discharge_date = coalesce(dc_date, discharge_date),
        frequency_low = coalesce(fq_low, frequency_low),
        frequency_high = coalesce(fq_high, frequency_high)
    where id = tp_id and org_id = o_id;

  return found;

end;
$$ language plpgsql;
