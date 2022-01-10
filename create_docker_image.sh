#!/bin/bash
echo "#build image...."
docker build . -f ./Dockerfile  -t api-rof:1.0
