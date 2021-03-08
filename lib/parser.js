'use strict';

class Parser {
  constructor() {
    this.factoryComposer = require('./factory/composer');
  }

  composer(path, json) {
    return new Promise((resolve, reject) => {
      this.factoryComposer.parseGwmCode(path, json).then(res => {
        resolve(res)
      }).catch(e => {
        reject(e)
      });
    });
  }

  // composerWriteFile(codeSource, jsonData, path) {
  //   return new Promise((resolve) => {
  //     this.factoryComposer
  //       .parseGwmCode(codeSource, jsonData)
  //       .then(obj => {
  //         let code = obj.totalList
  //           .sort((item1, item2) => {
  //             return item1.line_no - item2.line_no;
  //           })
  //           .map(item => {
  //             return item.line;
  //           })
  //           .join('\n')
  //         require("fs").writeFile(path, code, (err) => {
  //           resolve(code)
  //         });
  //       });
  //   })
  // }

  // composerJson(codeSource, jsonData) {
  //   return new Promise((resolve) => {
  //     this.factoryComposer
  //       .parseGwmCode(codeSource, jsonData)
  //       .then(obj => {
  //         resolve(obj)
  //       });
  //   })
  // }

}

const parser = new Parser();
module.exports = parser;
