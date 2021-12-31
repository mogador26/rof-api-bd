### MONGODB
export MONGO_INITDB_ROOT_USERNAME="user_admin"
export MONGO_INITDB_ROOT_PASSWORD="secret"
export MONGO_INITDB_DATABASE="rof-db"
export MONGO_USERNAME_DB="user_rw"
export MONGO_PASSWORD_DB="secret123"
export MONGO_DOCKER_PORT=27017
export MONGO_LOCAL_PORT=27018

### NODE.JS
export API_DOCKER_PORT=6000
export API_LOCAL_PORT=12000
export URL_DB=mongodb+srv://user_r:QxhtlPNzK60foGju@cluster0.s4vtg.mongodb.net/rof-db?retryWrites=true&w=majority
#export URL_DB=mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@0.0.0.0:${MONGO_DOCKER_PORT}/${MONGO_INITDB_DATABASE}?retryWrites=true&w=majority


