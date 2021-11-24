const { getBuildConfig } = require('./build-config-factory');

const appName = process.env.APP_NAME;
const port = process.env._PORT;

const webpackConfig = getBuildConfig(appName, {
  port,
});

module.exports = webpackConfig;
