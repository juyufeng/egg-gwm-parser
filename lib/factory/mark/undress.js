'use strict';

class Undress {
  constructor() {
    this.category = require('./category');
  }

  line(line) {
    // 通用
    if (line.search('@{{') !== -1) {
      line = line.replace('@{{', '` + ')
    }
    if (line.search('}}@') !== -1) {
      line = line.replace('}}@', ' + `')
    }

    // 注意， 这里操作的都是一行 
    // 从`开始  必须从`结束
    // \n要在尾`之前
    // line = ';a+=`' + line

    // 条件
    if (this.category.isGwmFor(line)) {
      // 变成了  a+=` for {   所以需要补上` 
      return line.replace('@gwmF', 'f') + ' {\n'
    }
    else if (this.category.isGwmEndFor(line)) {
      // 这里就不是在原型line上操作了 ，所以要补上 a+=
      return '}\n'
    }
    else if (this.category.isGwmIf(line)) {
      return line.replace('@gwmI', 'i') + ' {\n`'
    }
    else if (this.category.isGwmElseIf(line)) {
      return '} ' + line.replace('@gwmElseIf', 'else if') + ' {\n`'
    }
    else if (this.category.isGwmElse(line)) {
      return '} ' + line.replace('@gwmElse', 'else') + ' {\n`'
    }
    else if (this.category.isGwmEndIf(line)) {
      // 这里就不是在原型line上操作了 ，所以要补上 a+=
      return '}\n`'
    }
    else
    {
      return 'a+=`' + line + '\n`;'
    }
  }

}

const undress = new Undress()
module.exports = undress;
