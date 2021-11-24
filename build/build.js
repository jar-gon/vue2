const argv = require('optimist').argv;
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const appNames = [];
const appName = argv._[0] || process.env.APP_NAME;
const pagesPath = path.join(__dirname, '../pages');

if (appName && fs.existsSync(`${pagesPath}/${appName}/config/index.js`)) {
  appNames.push(appName);
} else {
  const fsRes = fs.readdirSync(pagesPath);
  fsRes.forEach(item => {
    if (fs.existsSync(`${pagesPath}/${item}/config/index.js`)) {
      appNames.push(item);
    }
  });
}

// 不能都打一个默认的应用进去
// if (fs.existsSync(path.join(__dirname, '../src/config/index.js'))) {
//   appNames.push('');
// }
console.log('appNames', JSON.stringify(appNames));
// 构建环境
const env = process.env.APP_RUN_ENV || 'pro';

execSync('rimraf dist', {
  stdio: [0, 1, 2],
});

appNames.forEach(appName => {
  let startTime = new Date().getTime();

  console.log('正在构建:', appName);

  execSync(`cross-env APP_NAME=${appName} vue-cli-service build --no-clean --mode ${env}`, {
    stdio: [0, 1, 2],
  });

  let endTime = new Date().getTime();

  console.log('编译完成:', appName, (endTime - startTime) / 1000);
});
