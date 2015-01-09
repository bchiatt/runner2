create or replace function treatment_plan_add(
  org_id integer,
  client_id integer,
  ther_id integer,
  disc_id integer,
  eval_date date,
  recert_date date,
  discharge_date date,
  day_id integer,
  freq_low int,
  freq_high int
)
returns integer AS $$
declare
  tp_id integer;
begin

  insert into treatment_plans
    (org_id, client_id, eval_therapist_id, disc_id,
    eval_date, recert_date, discharge_date,
    weekly_day_id, frequency_low, frequency_high)
  values
    (org_id, client_id, ther_id, disc_id,
    eval_date, recert_date, discharge_date,
    day_id, freq_low, freq_high)
  returning id into tp_id;

  return tp_id;

end;
$$ language plpgsql;
