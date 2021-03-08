'use strict';

class Helper {
  constructor() {

  }
  // 全量匹配
  allABList(str) {
    return str.match('/(@{{.*?}}@)/g')
  }

  // 全量分割
  allABSplit(str) {
    return str.split('/(@{{[.\n]*?}}@)/g')
  }

  // 去外衣
  uncapABWords(str) {
    return str.replace('/(@{{)|(}}@)/g', '').trim()
  }
}

const helper = new Helper();
module.exports = helper;
