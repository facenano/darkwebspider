//
// custom::base64 编码模块
//
// :把除了密码的其他参数都base64编码一次
//

'use strict';

module.exports = (pwd, data, ext = null) => {
  let ret = {};
  for (let _ in data) {
    if (_ === '_') {
      continue
    };
    ret[_] = Buffer
      .from(data[_])
      .toString('base64');
  }
  ret[pwd] = data['_'];
  return ret;
}