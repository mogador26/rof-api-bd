set -e


mongo <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
  user: '$MONGO_USERNAME_DB',
  pwd: '$MONGO_PASSWORD_DB',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})

db.createCollection('operateurs_funeraires')
db.createCollection('geo_addresses')
EOF
