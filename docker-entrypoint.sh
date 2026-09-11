#!/bin/sh
set -e

if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  node ./node_modules/typeorm/cli.js migration:run -d dist/database/data-source.js
fi

exec node dist/main.js
