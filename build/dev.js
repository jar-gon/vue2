const argv = require('optimist').argv;
const { execSync } = require('child_process');

const appName = argv._[0] || process.env.APP_NAME || '';
const port = argv._[1] || process.env.PORT;
// 是不是可以先构建其他应用并创建本地服务器，服务之间的联调整
let cmd = `cross-env APP_NAME=${appName} _PORT=${port} npm run serve`;
execSync(cmd, { stdio: [0, 1, 2] });
