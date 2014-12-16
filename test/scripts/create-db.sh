#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

# add tables
psql $1 -f ../../db/tables/users.sql
psql $1 -f ../../db/tables/orgs.sql

# add function
# psql $1 -f ../../db/functions/add_note.sql
