#!/usr/bin/env bash

NOW_FORMATTED=`date +%A`
BACKUP_DIR="/backups/dbs"
BACKUP_PATH="$BACKUP_DIR/$NOW_FORMATTED"

mkdir -p $BACKUP_PATH

mongodump \
    --db parkly \
    --host localhost \
    --archive=$BACKUP_PATH \
    --gzip

echo "Backed up sucessfully into: $BACKUP_PATH."