#!/bin/bash

set -e

echo "Starting cron..."
cron
echo "Starting rails server as $RAILS_ENV..."
bundle exec rails server -b 0.0.0.0 -p 80
