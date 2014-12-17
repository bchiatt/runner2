create table days_in_week(
  id serial primary key,
  full_name varchar(10) not null,
  abbr varchar(3) not null,
  letter char(1) not null
);
