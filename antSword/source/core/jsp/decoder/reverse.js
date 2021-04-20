/**
 * JSP::reverse 解码器
 */

 'use strict';

 module.exports = {
   asoutput: (ext={}) => {
     /**
      * ext = {
      *   opts: 类型为 Object, Shell 配置
      * }
      */
     return `yv66vgAAADEAHgoACAATBwAUCgACABUKAAIAFgoAAgAXCQAHABgHABkHABoBAANyZXMBABJMamF2YS9sYW5nL1N0cmluZzsBAAY8aW5pdD4BABUoTGphdmEvbGFuZy9TdHJpbmc7KVYBAARDb2RlAQAPTGluZU51bWJlclRhYmxlAQAIdG9TdHJpbmcBABQoKUxqYXZhL2xhbmcvU3RyaW5nOwEAClNvdXJjZUZpbGUBABRBc291dHB1dFJldmVyc2UuamF2YQwACwAbAQAWamF2YS9sYW5nL1N0cmluZ0J1ZmZlcgwACwAMDAAcAB0MAA8AEAwACQAKAQATc3JjL0Fzb3V0cHV0UmV2ZXJzZQEAEGphdmEvbGFuZy9PYmplY3QBAAMoKVYBAAdyZXZlcnNlAQAaKClMamF2YS9sYW5nL1N0cmluZ0J1ZmZlcjsAIQAHAAgAAAABAAAACQAKAAAAAgABAAsADAABAA0AAAA3AAQAAgAAABcqtwABKrsAAlkrtwADtgAEtgAFtQAGsQAAAAEADgAAAA4AAwAAAAQABAAFABYABgABAA8AEAABAA0AAAAdAAEAAQAAAAUqtAAGsAAAAAEADgAAAAYAAQAAAAkAAQARAAAAAgAS`;
   },
   decode_buff: (buff) => {
     return Buffer.from(buff).reverse();
   }
 }