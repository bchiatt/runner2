create or replace function treatment_nuke(
  o_id integer,
  t_id integer
)
returns integer AS $$
declare
begin

  t_id := (
    select t.id from treatments t
    where t.id = t_id and t.org_id = o_id
  );
  delete from treatments t where t.id = t_id;

  return t_id;

end;
$$ language plpgsql;
