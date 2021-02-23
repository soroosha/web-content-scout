#!/bin/bash

###
# PURPOSE: Start/Restart API, React, and database services in dev environment
# USAGE: ./dev.run.sh [-r]
#           -r: reset database. Will recreate superuser.
###

APP_NAME="Web Scout"

# exit script immediately on error
set -e
USAGE="Usage: ./dev.run.sh"
GREEN="\033[1;32m"
ORANGE="\033[1;33m"
NOCOLOR="\033[0m"

# restart services without removing volumes
echo -e "${ORANGE}\xE2\x98\x85 Restarting ${APP_NAME} ...${NOCOLOR}"
docker-compose -f docker-compose.yml down

# restart services
docker-compose -f docker-compose.yml up --build -d

# echo -e "${ORANGE}\xE2\x98\x85 Waiting for Selenium chrome to start ...${NOCOLOR}"
# while docker exec -t web-content-scout_selenium_1 nc -z localhost 4444 ; [ $? -ne 0 ]; do
#   sleep 0.1
# done

echo -e "\n${GREEN}\xE2\x9C\x93 Services restarted. ${NOCOLOR}"
