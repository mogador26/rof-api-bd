#!/bin/bash
echo "#build image...."
docker build . -f ../Dockerfile  -t mogador26/api-rof:1.0
