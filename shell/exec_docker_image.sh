#!/bin/bash


#exec
docker run --env-file ../.env -p $API_PORT_OUT:$API_PORT -d "mogador26/api-rof:1.0" 


