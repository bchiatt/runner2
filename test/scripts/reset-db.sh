#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

./drop-tables.sh $1
./create-db.sh $1
./clean-db.sh $1
