process.env.BABEL_ENV = 'production';
require("@babel/register");
const getConfig = require('../src/backend/webpack/prod');
module.exports = getConfig();
