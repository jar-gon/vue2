/**
 * 子应用配置，该文件一定要存在，否则构建会有问题
 */
const baseModule = require('../../../src/config/sub-module');
const subModele = {};
module.exports = Object.assign({}, baseModule, subModele);
