var path = require('path'),
fs = require("fs");
exports.privateKey = fs.readFileSync(path.join("/etc/letsencrypt/live/waja.ovh/privkey.pem")).toString();
exports.certificate = fs.readFileSync(path.join("/etc/letsencrypt/live/waja.ovh/cert.pem")).toString();