#!/bin/sh

heroku apps:destroy --confirm api-rof-bd
sleep 4
heroku apps:create api-rof-bd --region eu

git push heroku master

