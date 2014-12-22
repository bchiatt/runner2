#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

psql $1 -f ../../db/tables/orgs.sql
psql $1 -f ../../db/tables/users.sql
psql $1 -f ../../db/tables/alter_orgs.sql
psql $1 -f ../../db/tables/insurances.sql
psql $1 -f ../../db/tables/precautions.sql
psql $1 -f ../../db/tables/disciplines.sql
psql $1 -f ../../db/tables/days_in_week.sql
psql $1 -f ../../db/tables/therapists.sql
psql $1 -f ../../db/tables/work_schedules.sql
psql $1 -f ../../db/tables/clients.sql
psql $1 -f ../../db/tables/treatment_plans.sql
psql $1 -f ../../db/tables/clients_precautions.sql
psql $1 -f ../../db/tables/treatments.sql

psql $1 -f ../../db/functions/insurance_add.sql
psql $1 -f ../../db/functions/insurance_update.sql
psql $1 -f ../../db/functions/discipline_add.sql
psql $1 -f ../../db/functions/discipline_update.sql
psql $1 -f ../../db/functions/precaution_add.sql
psql $1 -f ../../db/functions/precaution_update.sql
psql $1 -f ../../db/functions/day_add.sql
psql $1 -f ../../db/functions/day_update.sql
psql $1 -f ../../db/functions/client_add.sql
psql $1 -f ../../db/functions/client_update.sql
