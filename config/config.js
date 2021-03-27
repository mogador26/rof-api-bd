// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    maxRequestByIp: process.env.MAX_REQUEST_BY_IP,
    windowRequest: process.env.WINDOW_TIME,
    dirLog: process.env.DIR_LOG,
    userDB: process.env.USER_DB,
    passDB: process.env.PASSWORD_DB,
    uriDB: process.env.URI_DB

}