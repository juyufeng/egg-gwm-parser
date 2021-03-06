/**
 * 鞠宇峰
 * 实现过滤文本或DOM元素中的敏感关键字防止XSS、命令注入、sql注入攻击
 */

'use strict';

function InjectFilter(options) {
  var initModel = { // 默认值模版
    tokens: {},
    xss: true,
    command: true,
    sql: true
  };

  options = options || initModel;
  if (options.tokens && !(Object.prototype.toString.call(options.tokens) === '[object Object]')) {
    console.error(new Error('tokens必须是对象类型'));
    return;
  }

  this._tokens = options.tokens || initModel.tokens;
  this._isFilterXss = (typeof options.xss === 'undefined') ? initModel.xss : !!options.xss; // 如没有配置项，则使用默认
  this._isFilterCommand = (typeof options.command === 'undefined') ? initModel.command : !!options.command;
  this._isFilterSql = (typeof options.sql === 'undefined') ? initModel.sql : !!options.sql;
};
InjectFilter.prototype.filterTokens = function (str) {
  for (var item in this._tokens) {
    str = str.replaceAll(item, this._tokens[item]);
  }
  return str;
};

/**
 * InjectFilter.prototype.filter 主要过滤方法
 * @param {String|Object} str
 */
InjectFilter.prototype.filter = function (str) {
  if (typeof jQuery !== 'undefined' && str instanceof jQuery) { // jQ对象
    str = str.html();
  }

  if (typeof str === 'string') {
    if (str === '') {
      return str;
    }

    this._isFilterXss && (str = this.filterXss(str));
    this._isFilterCommand && (str = this.filterCommand(str));
    this._isFilterSql && (str = this.filterSql(str));
    this._tokens && (str = this.filterTokens(str));

    if (this._isFilterCommand || this._isFilterSql) { // 因为过滤正则需匹配空格，最后才进行空格转换
      str = str.replace(/ /g, '&nbsp;');
    }
  } else if (typeof str.innerHTML !== 'undefined') {
    return this.filter(str.innerHTML);
  }
  return str;
};

InjectFilter.prototype.filterXss = function (str) {
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/\'/g, '&#39;');
  str = str.replace(/\"/g, '&quot;');
  return str;
};

InjectFilter.prototype.filterCommand = function (str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/ping /gi, 'ｐｉｎｇ ');
  str = str.replace(/-(?=.+)/g, '－');
  str = str.replace(/\|/g, '｜');
  str = str.replace(/`/g, '&#39;');
  return str;
};

InjectFilter.prototype.filterSql = function (str) {
  str = str.replace(/select /gi, 'ｓｅｌｅｃｔ ');
  str = str.replace(/exec /gi, 'ｅｘｅｃ ');
  str = str.replace(/xp_cmdshell/gi, '？xp_cmdshell？');
  str = str.replace(/delete\s+from/gi, 'ｄｅｌｅｔｅ　ｆｒｏｍ');
  str = str.replace(/insert /gi, 'ｉｎｓｅｒｔ ');
  str = str.replace(/truncate /gi, 'ｔｒｕｎｃａｔｅ ');
  str = str.replace(/update /gi, 'ｕｐｄａｔｅ ');
  str = str.replace(/drop\s+table/gi, 'ｄｒｏｐ　ｔａｂｌｅ');

  return str;
};
