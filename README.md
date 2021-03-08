# egg-gwm-parser
hi，I'm JuYuFeng , come from gwm-fireteam.
当前git版本请勿对公网使用，安全模块预计在V2.0上线。

# egg-gwm-paser

egg-gwm-parser 是一款针对低代码平台的开发的模板语法解释器， 简称GwmPaser引擎。

受Laravel框架的blade模板引擎和python解释器的启发，开发了一个开源的GwmPaser引擎。GwmPaser引擎并不限制你在模板语法中使用原生js代码。

可以用来快速地生成代码。

# 语法介绍

由于很多JavaScript框架也使用花括号表明给定的表达式将要在浏览器中显示，为了防止语法混淆，GwmPaser引擎采用`@{{ }}@`。示例如下：
```
<h1>Helllo World!</h1>

Hello, @{{ data.name }}@
```
在这个例子中， @符号将被 GwmPaser 删除；在 GwmPaser引擎中 `@{{ data.name }}@` 表达式将保持不变，取而代之的是 JavaScript 引擎将渲染该表达式。

# 数据绑定
范例：向GwmPaser引擎传入以下json
```json
{
   "name":"GwmPaser",
}
```
GwmPaser引擎会将
```
<h1>Helllo World!</h1>

Hello, @{{ data.name }}@
```
渲染成
```
<h1>Helllo World!</h1>

Hello, GwmPaser
```

以上要注意：
1、`@{{ data.name }}@` 花括号内的所有字段要挂载到**data**字段上，这个是GwmPaser引擎的约定。
2、GwmPaser引擎语法大小写严格区分。


## 控制结构
GwmPaser引擎为分支和循环等提供了方便的快捷方式。这些快捷方式提供了干净、简捷地处理控制结构的方法，同时保持了与JavaScript中的对应结构的相似性。

### If 语句
可以使用 `@gwmIf`、 `@gwmElseIf`、 `@gwmElse` 和 `@gwmEndIf` 指令构造 if 语句。这些指令的功能与相应的JavaScript指令相同：
```html
<template>
@gwmIf(data.isShowA)
  <page-view AAAAA @{{ data.title }}@ AAAAA>
@gwmElseIf(data.isShowB)
  <page-view BBBBB>
@gwmElse
  <page-view CCCCC>
@gwmEndIf
```
### for 语句
```html
@gwmFor(var i=0; i<data.itemList.length; i++)
        <a-form-item label="@{{ data.itemList[i].keyName }}@">
          <a-input v-model="@{{ data.itemList[i].model }}@" placeholder allowClear></a-input>
        </a-form-item>
@gwmEndFor
```

## Install

```bash
$ npm i egg-gwm-parser --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.gwmParser = {
  enable: true,
  package: 'egg-gwm-parser',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.gwmParser = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
