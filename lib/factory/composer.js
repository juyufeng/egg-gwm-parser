'use strict';

class Composer {
  constructor() {
    this.category = require('./mark/category');
    this.undress = require('./mark/undress');
  }

  parseGwmCode(codePath, json) {
    return new Promise((resolve, reject) => {
      this.readCodeByLine(codePath).then(code => {
        var a = '';
        var data = JSON.parse(json);
        eval(code);
        resolve(a);
      });
    }).catch(e => {
      reject('解析异常')
    })
  }

  readCodeByLine(codePath) {
    return new Promise((resolve, reject) => {
      let code = '';
      require('readline')
        .createInterface({
          input: require('fs').createReadStream(codePath)
        })
        .on('line', line => {
          try {
            code += this.undress.line(line);
          } catch (e) {
            reject('解析异常')
          }
        })
        .on('close', () => {
          resolve(code);
        });
    });
  }

}

const composer = new Composer();
module.exports = composer

