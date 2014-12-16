#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

psql $1 -f ../../db/tables/orgs.sql
psql $1 -f ../../db/tables/users.sql
psql $1 -f ../../db/tables/alter-orgs.sql
