const {readSync} = require('node-yaml');
const config = readSync("./default.yml");
module.exports = config;
