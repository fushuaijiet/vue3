/*
 * @Author: your name
 * @Date: 2021-12-17 10:21:48
 * @LastEditTime: 2021-12-17 10:23:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hello-vue3\vue.config.js
 */
const path = require('path');
const resolve = dir => path.join(_dirname,dir);
module.exports = {
    publicPath:'./',//基本路径
    outputDir:'dist',//输出文件目录
}