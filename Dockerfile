FROM node:14-alpine3.13

ARG http_proxy
ARG https_proxy
ARG npm_registry
ARG no_proxy

ENV PORT ${API_DOCKER_PORT}
ENV NODE_ENV production

# Create app directory

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# use proxy & private npm registry
# With internal npm repo (autosigned) disable strict ssl : strict-ssl false
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo "Europe/Paris" > /etc/timezone ; \
    if [ ! -z "$http_proxy" ] ; then \
    npm config delete proxy; \
    npm config set proxy $http_proxy; \
    npm config set https-proxy $https_proxy ; \
    npm config set no-proxy $no_proxy; \
    fi ; \
    [ -z "$npm_registry" ] || npm config set registry=$npm_registry ; \
    [ -z "$npm_registry" ] || npm config set strict-ssl false

# copy all dependances
COPY package*.json ./

# install dependencies
RUN npm install --only=production

# copy all source files into app workdir
COPY . .
RUN chown -R node:node /usr/src/app
USER node

EXPOSE ${API_DOCKER_PORT}
HEALTHCHECK CMD curl --fail http://localhost:${API_DOCKER_PORT} || exit 1   

# run the app
CMD "npm" "start"
