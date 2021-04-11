#!/bin/sh

heroku apps:destroy --confirm dev-api-rof-bd
sleep 4
heroku apps:create dev-api-rof-bd --region eu

git push heroku master

