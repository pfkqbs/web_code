# 开始 & 安装

### Node (CommonJS)

```js
// 安装
npm install mockjs
// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
```

### Bower

```
# 安装
npm install -g bower
bower install --save mockjs
<script type="text/javascript" src="./bower_components/mockjs/dist/mock.js"></script>
```

### RequireJS (AMD)

```js
// 配置 Mock 路径
require.config({
    paths: {
        mock: 'http://mockjs.com/dist/mock'
    }
})
// 加载 Mock
require(['mock'], function(Mock){
    // 使用 Mock
    var data = Mock.mock({
        'list|1-10': [{
            'id|+1': 1
        }]
    })
    // 输出结果
    document.body.innerHTML +=
        '<pre>' +
        JSON.stringify(data, null, 4) +
        '</pre>'
})
// ==>
{
    "list": [
        {
            "id": 1
        },
        {
            "id": 2
        },
        {
            "id": 3
        }
    ]
}
```

[JSFiddle](http://jsfiddle.net/nzcsxd76/)

### `Sea.js (CMD)`
因为 Sea.js 社区尚未提供 webpack 插件，所以 Mock.js 暂**不完整**支持通过 Sea.js 加载。

一种变通的方式是，依然通过 Sea.js 配置和加载 Mock.js，然后访问全局变量 Mock。

```js
// 配置 Mock 路径
seajs.config({
    alias: {
        mock: 'http://mockjs.com/dist/mock.js'
    }
})

// 加载 Mock
seajs.use('mock', function(__PLACEHOLDER) {
    // 使用 Mock（全局变量）
    var data = Mock.mock({
        'list|1-10': [{
            'id|+1': 1
        }]
    });
    document.body.innerHTML +=
        '<pre>' +
        JSON.stringify(data, null, 4) +
        '</pre>'
})
```

[JSFiddle](http://jsfiddle.net/3za48nwd/1/)

### Random CLI

```shall
# 全局安装
$ npm install mockjs -g

# 执行
$ random url
# => http://rmcpx.org/funzwc

# 帮助
random -h
```

# 语法规范

Mock.js 的语法规范包括两部分：

1. 数据模板定义规范（Data Template Definition，DTD）
2. 数据占位符定义规范（Data Placeholder Definition，DPD）

## 数据模板定义规范 DTD

**数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：**

```
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

**注意：**

- *属性名* 和 *生成规则* 之间用竖线 `|` 分隔。

- *生成规则* 是可选的。

- 生成规则

   

  有 7 种格式：

  1. `'name|min-max': value`
  2. `'name|count': value`
  3. `'name|min-max.dmin-dmax': value`
  4. `'name|min-max.dcount': value`
  5. `'name|count.dmin-dmax': value`
  6. `'name|count.dcount': value`
  7. `'name|+step': value`

- ***生成规则\* 的 含义 需要依赖 \*属性值的类型\* 才能确定。**

- *属性值* 中可以含有 `@占位符`。

- *属性值* 还指定了最终值的初始值和类型。

**生成规则和示例：**

### 1. 属性值是字符串 **String**

1. `'name|min-max': string`

   通过重复 `string` 生成一个字符串，重复次数大于等于 `min`，小于等于 `max`。

2. `'name|count': string`

   通过重复 `string` 生成一个字符串，重复次数等于 `count`。

### 2. 属性值是数字 **Number**

1. `'name|+1': number`

   属性值自动加 1，初始值为 `number`。

2. `'name|min-max': number`

   生成一个大于等于 `min`、小于等于 `max` 的整数，属性值 `number` 只是用来确定类型。

3. `'name|min-max.dmin-dmax': number`

   生成一个浮点数，整数部分大于等于 `min`、小于等于 `max`，小数部分保留 `dmin` 到 `dmax` 位。

```
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}
```

### 3. 属性值是布尔型 **Boolean**

1. `'name|1': boolean`

   随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

2. `'name|min-max': value`

   随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。

### 4. 属性值是对象 **Object**

1. `'name|count': object`

   从属性值 `object` 中随机选取 `count` 个属性。

2. `'name|min-max': object`

   从属性值 `object` 中随机选取 `min` 到 `max` 个属性。

### 5. 属性值是数组 **Array**

1. `'name|1': array`

   从属性值 `array` 中随机选取 1 个元素，作为最终值。

2. `'name|+1': array`

   从属性值 `array` 中顺序选取 1 个元素，作为最终值。

3. `'name|min-max': array`

   通过重复属性值 `array` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。

4. `'name|count': array`

   通过重复属性值 `array` 生成一个新数组，重复次数为 `count`。

### 6. 属性值是函数 **Function**

1. `'name': function`

   执行函数 `function`，取其返回值作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象。

### 7. 属性值是正则表达式 **RegExp**

1. `'name': regexp`

   根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

   ```
   Mock.mock({
       'regexp1': /[a-z][A-Z][0-9]/,
       'regexp2': /\w\W\s\S\d\D/,
       'regexp3': /\d{5,10}/
   })
   // =>
   {
       "regexp1": "pJ7",
       "regexp2": "F)\fp1G",
       "regexp3": "561659409"
   }
   ```

## 数据占位符定义规范 DPD

*占位符* 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

*占位符* 的格式为：

```
@占位符
@占位符(参数 [, 参数])
```

**注意：**

1. 用 `@` 来标识其后的字符串是 *占位符*。
2. *占位符* 引用的是 `Mock.Random` 中的方法。
3. 通过 `Mock.Random.extend()` 来扩展自定义占位符。
4. *占位符* 也可以引用 *数据模板* 中的属性。
5. *占位符* 会优先引用 *数据模板* 中的属性。
6. *占位符* 支持 *相对路径* 和 *绝对路径*。

```
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```

## Mock.mock( rurl?, rtype?, template|function( options ) )

根据数据模板生成模拟数据。

### Mock.mock( template )

根据数据模板生成模拟数据。

[JSFiddle](http://jsfiddle.net/nuysoft/Y3rg6/7/)

### Mock.mock( rurl, template )

记录数据模板。当拦截到匹配 `rurl` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

[JSFiddle](http://jsfiddle.net/nuysoft/BeENf/6/)

### Mock.mock( rurl, function( options ) )

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

[JSFiddle](http://jsfiddle.net/nuysoft/2s5t5/15/)

### Mock.mock( rurl, rtype, template )

记录数据模板。当拦截到匹配 `rurl` 和 `rtype` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

[JSFiddle](http://jsfiddle.net/nuysoft/Eq68p/3/)

### Mock.mock( rurl, rtype, function( options ) )

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 和 `rtype` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

[JSFiddle](http://jsfiddle.net/nuysoft/6dpV5/5/)

### rurl

可选。

表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 `/\/domain\/list\.json/`、`'/domian/list.json'`。

### rtype

可选。

表示需要拦截的 Ajax 请求类型。例如 `GET`、`POST`、`PUT`、`DELETE` 等。

### template

可选。

表示数据模板，可以是对象或字符串。例如 `{ 'data|1-10':[{}] }`、`'@EMAIL'`。

### function(options)

可选。

表示用于生成响应数据的函数。

#### options

指向本次请求的 Ajax 选项集，含有 `url`、`type` 和 `body` 三个属性，参见 [XMLHttpRequest 规范](https://xhr.spec.whatwg.org/)。

> 从 1.0 开始，Mock.js 通过覆盖和模拟原生 XMLHttpRequest 的行为来拦截 Ajax 请求，不再依赖于第三方 Ajax 工具库（例如 jQuery、Zepto 等）。

## Mock.setup( settings )

- Mock.setup( settings )

配置拦截 Ajax 请求时的行为。支持的配置项有：`timeout`。

### settings

必选。

配置项集合。

#### timeout

可选。

指定被拦截的 Ajax 请求的响应时间，单位是毫秒。值可以是正整数，例如 `400`，表示 400 毫秒 后才会返回响应内容；也可以是横杠 `'-'` 风格的字符串，例如 `'200-600'`，表示响应时间介于 200 和 600 毫秒之间。默认值是`'10-100'`。

```
Mock.setup({
    timeout: 400
})
Mock.setup({
    timeout: '200-600'
})
```

> 目前，接口 `Mock.setup( settings )` 仅用于配置 Ajax 请求，将来可能用于配置 Mock 的其他行为。

Mock.Random 是一个工具类，用于生成各种随机数据。

**Mock.Random 的方法在数据模板中称为『占位符』，书写格式为 `@占位符(参数 [, 参数])` 。**

```
var Random = Mock.Random
Random.email()
// => "n.clark@miller.io"
Mock.mock('@email')
// => "y.lee@lewis.org"
Mock.mock( { email: '@email' } )
// => { email: "v.lewis@hall.gov" }
```

**注意**

### 方法

Mock.Random 提供的完整方法（占位符）如下：

| Type          | Method                                                       |
| ------------- | ------------------------------------------------------------ |
| Basic         | boolean, natural, integer, float, character, string, range, date, time, datetime, now |
| Image         | image, dataImage                                             |
| Color         | color                                                        |
| Text          | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle |
| Name          | first, last, name, cfirst, clast, cname                      |
| Web           | url, domain, email, ip, tld                                  |
| Address       | area, region                                                 |
| Helper        | capitalize, upper, lower, pick, shuffle                      |
| Miscellaneous | guid, id                                                     |

<script id="fixPlaceholderLink" type="text/javascript"> $('#fixPlaceholderLink').prev('table') .find('td:nth-child(1)').each(function(index, td) { $(td).contents().wrapAll( $('').attr('href', '#' + $(td).text()) ) }) .end() .find('td:nth-child(2)').each(function(index, td) { var methods = $(td).text().split(' ') var links = $() $(methods).each(function(mindex, m) { links.push( $('').attr('href', '#' + m).text(m)[0] ) if (mindex < methods.length - 1) { links.push( $('').text(', ')[0] ) } }) $(td).empty().append(links) }) .end() </script>

### 扩展

Mock.Random 中的方法与数据模板的 `@占位符` 一一对应，在需要时还可以为 Mock.Random 扩展方法，然后在数据模板中通过 `@扩展方法` 引用。例如：

```
Random.extend({
    constellation: function(date) {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    }
})
Random.constellation()
// => "水瓶座"
Mock.mock('@CONSTELLATION')
// => "天蝎座"
Mock.mock({
    constellation: '@CONSTELLATION'
})
// => { constellation: "射手座" }
```

## Random.boolean( min?, max?, current? )

- Random.boolean()
- Random.boolean( min, max, current )

返回一个随机的布尔值。

### min

可选。

指示参数 current 出现的概率。概率计算公式为 `min / (min + max)`。该参数的默认值为 1，即有 50% 的概率返回参数 current。

### max

可选。

指示参数 current 的相反值 `!current` 出现的概率。概率计算公式为 `max / (min + max)`。该参数的默认值为 `1`，即有 50% 的概率返回参数 `!current`。

### current

可选。

可选值为布尔值 `true` 或 `false`。如果未传入任何参数，则返回 `true` 和 `false` 的概率各为 50%。该参数没有默认值。在该方法的内部，依据原生方法 Math.random() 返回的（浮点）数来计算和返回布尔值，例如在最简单的情况下，返回值是表达式 `Math.random() >= 0.5` 的执行结果。

```
Random.boolean()
// => true
Random.boolean(1, 9, true)
// => false
Random.bool()
// => false
Random.bool(1, 9, false)
// => true
```

## Random.natural( min?, max? )

- Random.natural()
- Random.natural( min )
- Random.natural( min, max )

返回一个随机的自然数（大于等于 0 的整数）。

### min

可选。

指示随机自然数的最小值。默认值为 0。

### max

可选。

指示随机自然数的最大值。默认值为 9007199254740992。

```
Random.natural()
// => 1002794054057984
Random.natural(10000)
// => 71529071126209
Random.natural(60, 100)
// => 77
```

## Random.integer( min?, max? )

- Random.integer()
- Random.integer( min )
- Random.integer( min, max )

返回一个随机的整数。

### min

可选。

指示随机整数的最小值。默认值为 -9007199254740992。

### max

可选。

指示随机整数的最大值。默认值为 9007199254740992。

```
Random.integer()
// => -3815311811805184
Random.integer(10000)
// => 4303764511003750
Random.integer(60,100)
// => 96
```

## Random.float( min?, max?, dmin?, dmax? )

- Random.float()
- Random.float( min )
- Random.float( min, max )
- Random.float( min, max, dmin )
- Random.float( min, max, dmin, dmax )

返回一个随机的浮点数。

### min

可选。

整数部分的最小值。默认值为 -9007199254740992。

### max

可选。

整数部分的最大值。默认值为 9007199254740992。

### dmin

可选。

小数部分位数的最小值。默认值为 0。

### dmax

可选。

小数部分位数的最大值。默认值为 17。

```
Random.float()
// => -1766114241544192.8
Random.float(0)
// => 556530504040448.25
Random.float(60, 100)
// => 82.56779679549358
Random.float(60, 100, 3)
// => 61.718533677927894
Random.float(60, 100, 3, 5)
// => 70.6849
```

## Random.character( pool? )

- Random.character()
- Random.character( 'lower/upper/number/symbol' )
- Random.character( pool )

返回一个随机字符。

### pool

可选。

字符串。表示字符池，将从中选择一个字符返回。

如果传入了 `'lower'` 或 `'upper'`、`'number'`、`'symbol'`，表示从内置的字符池从选取：

```
{
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()[]"
}
```

如果未传入该参数，则从 `lower + upper + number + symbol` 中随机选取一个字符返回。

```
Random.character()
// => "P"
Random.character('lower')
// => "y"
Random.character('upper')
// => "X"
Random.character('number')
// => "1"
Random.character('symbol')
// => "&"
Random.character('aeiou')
// => "u"
```

## Random.string( pool?, min?, max? )

- Random.string()
- Random.string( length )
- Random.string( pool, length )
- Random.string( min, max )
- Random.string( pool, min, max )

返回一个随机字符串。

### pool

可选。

字符串。表示字符池，将从中选择一个字符返回。

如果传入 `'lower'` 或 `'upper'`、`'number'`、`'symbol'`，表示从内置的字符池从选取：

```
{
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()[]"
}
```

如果未传入该参数，则从 `lower + upper + number + symbol` 中随机选取一个字符返回。

### min

可选。

随机字符串的最小长度。默认值为 3。

### max

可选。

随机字符串的最大长度。默认值为 7。

```
Random.string()
// => "pJjDUe"
Random.string( 5 )
// => "GaadY"
Random.string( 'lower', 5 )
// => "jseqj"
Random.string( 7, 10 )
// => "UuGQgSYk"
Random.string( 'aeiou', 1, 3 )
// => "ea"
Random.string( '壹贰叁肆伍陆柒捌玖拾', 3, 5 )
// => "肆捌伍叁"
```

## Random.range( start?, stop, step? )

- Random.range( stop )
- Random.range( start, stop )
- Random.range( start, stop, step )

返回一个整型数组。

### start

必选。

数组中整数的起始值。

### stop

可选。

数组中整数的结束值（不包含在返回值中）。

### step

可选。

数组中整数之间的步长。默认值为 1。

```
Random.range(10)
// => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Random.range(3, 7)
// => [3, 4, 5, 6]
Random.range(1, 10, 2)
// => [1, 3, 5, 7, 9]
Random.range(1, 10, 3)
// => [1, 4, 7]
```

## Random.date( format? )

- Random.date()
- Random.date(format)

返回一个随机的日期字符串。

### format

可选。

指示生成的日期字符串的格式。默认值为 `yyyy-MM-dd`。

可选的占位符参考自 [Ext.Date](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Date)，如下所示：

| Format | Description                                              | Example      |
| ------ | -------------------------------------------------------- | ------------ |
| yyyy   | A full numeric representation of a year, 4 digits        | 1999 or 2003 |
| yy     | A two digit representation of a year                     | 99 or 03     |
| y      | A two digit representation of a year                     | 99 or 03     |
| MM     | Numeric representation of a month, with leading zeros    | 01 to 12     |
| M      | Numeric representation of a month, without leading zeros | 1 to 12      |
| dd     | Day of the month, 2 digits with leading zeros            | 01 to 31     |
| d      | Day of the month without leading zeros                   | 1 to 31      |
| HH     | 24-hour format of an hour with leading zeros             | 00 to 23     |
| H      | 24-hour format of an hour without leading zeros          | 0 to 23      |
| hh     | 12-hour format of an hour without leading zeros          | 1 to 12      |
| h      | 12-hour format of an hour with leading zeros             | 01 to 12     |
| mm     | Minutes, with leading zeros                              | 00 to 59     |
| m      | Minutes, without leading zeros                           | 0 to 59      |
| ss     | Seconds, with leading zeros                              | 00 to 59     |
| s      | Seconds, without leading zeros                           | 0 to 59      |
| SS     | Milliseconds, with leading zeros                         | 000 to 999   |
| S      | Milliseconds, without leading zeros                      | 0 to 999     |
| A      | Uppercase Ante meridiem and Post meridiem                | AM or PM     |
| a      | Lowercase Ante meridiem and Post meridiem                | am or pm     |
| T      | Milliseconds, since 1970-1-1 00:00:00 UTC                | 759883437303 |

```
Random.date()
// => "2002-10-23"
Random.date('yyyy-MM-dd')
// => "1983-01-29"
Random.date('yy-MM-dd')
// => "79-02-14"
Random.date('y-MM-dd')
// => "81-05-17"
Random.date('y-M-d')
// => "84-6-5"
```

## Random.time( format? )

- Random.time()
- Random.time( format )

返回一个随机的时间字符串。

### format

可选。

指示生成的时间字符串的格式。默认值为 `HH:mm:ss`。

> 可选的占位符参考自 [Ext.Date](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Date)，请参见 Random.date( format? )。

```
Random.time()
// => "00:14:47"
Random.time('A HH:mm:ss')
// => "PM 20:47:37"
Random.time('a HH:mm:ss')
// => "pm 17:40:00"
Random.time('HH:mm:ss')
// => "03:57:53"
Random.time('H:m:s')
// => "3:5:13"
```

## Random.datetime( format? )

- Random.datetime()
- Random.datetime( format )

返回一个随机的日期和时间字符串。

### format

可选。

指示生成的日期和时间字符串的格式。默认值为 `yyyy-MM-dd HH:mm:ss`。

> 可选的占位符参考自 [Ext.Date](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Date)，请参见 Random.date( format? )。

```
Random.datetime()
// => "1977-11-17 03:50:15"
Random.datetime('yyyy-MM-dd A HH:mm:ss')
// => "1976-04-24 AM 03:48:25"
Random.datetime('yy-MM-dd a HH:mm:ss')
// => "73-01-18 pm 22:12:32"
Random.datetime('y-MM-dd HH:mm:ss')
// => "79-06-24 04:45:16"
Random.datetime('y-M-d H:m:s')
// => "02-4-23 2:49:40"
```

## Random.now( unit?, format? )

- Ranndom.now( unit, format )
- Ranndom.now()
- Ranndom.now( format )
- Ranndom.now( unit )

返回当前的日期和时间字符串。

### unit

可选。

表示时间单位，用于对当前日期和时间进行格式化。可选值有：`year`、`month`、`week`、`day`、`hour`、`minute`、`second`、`week`，默认不会格式化。

### format

可选。

指示生成的日期和时间字符串的格式。默认值为 `yyyy-MM-dd HH:mm:ss`。可选的占位符参考自 [Ext.Date](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Date)，请参见 [Random.date(format)](https://github.com/nuysoft/Mock/wiki/Date#date)。

> `Random.now()` 的实现参考了 [Moment.js](http://momentjs.cn/docs/#/manipulating/start-of/)。

```
Random.now()
// => "2014-04-29 20:08:38 "
Random.now('day', 'yyyy-MM-dd HH:mm:ss SS')
// => "2014-04-29 00:00:00 000"
Random.now('day')
// => "2014-04-29 00:00:00 "
Random.now('yyyy-MM-dd HH:mm:ss SS')
// => "2014-04-29 20:08:38 157"

Random.now('year')
// => "2014-01-01 00:00:00"
Random.now('month')
// => "2014-04-01 00:00:00"
Random.now('week')
// => "2014-04-27 00:00:00"
Random.now('day')
// => "2014-04-29 00:00:00"
Random.now('hour')
// => "2014-04-29 20:00:00"
Random.now('minute')
// => "2014-04-29 20:08:00"
Random.now('second')
// => "2014-04-29 20:08:38"
```

```

```

## Random.image( size?, background?, foreground?, format?, text? )

- Random.image()
- Random.image( size )
- Random.image( size, background )
- Random.image( size, background, text )
- Random.image( size, background, foreground, text )
- Random.image( size, background, foreground, format, text )

生成一个随机的图片地址。

> **Random.image()** 用于生成高度自定义的图片地址，一般情况下，应该使用更简单的 **[Random.dataImage()](https://github.com/nuysoft/Mock/wiki/Image#randomdataimage-size-text-)**。

### size

可选。

指示图片的宽高，格式为 `'宽x高'`。默认从下面的数组中随机读取一个：

```
[
    '300x250', '250x250', '240x400', '336x280', 
    '180x150', '720x300', '468x60', '234x60', 
    '88x31', '120x90', '120x60', '120x240', 
    '125x125', '728x90', '160x600', '120x600', 
    '300x600'
]
```

### background

可选。

指示图片的背景色。默认值为 `'#000000'`。

### foreground

可选。

指示图片的前景色（文字）。默认值为 `'#FFFFFF'`。

### format

可选。

指示图片的格式。默认值为 `'png'`，可选值包括：`'png'`、`'gif'`、`'jpg'`。

### text

可选。

指示图片上的文字。默认值为参数 size。

```
Random.image()
// => "http://dummyimage.com/125x125"
Random.image('200x100')
// => "http://dummyimage.com/200x100"
Random.image('200x100', '#fb0a2a')
// => "http://dummyimage.com/200x100/fb0a2a"
Random.image('200x100', '#02adea', 'Hello')
// => "http://dummyimage.com/200x100/02adea&text=Hello"
Random.image('200x100', '#00405d', '#FFF', 'Mock.js')
// => "http://dummyimage.com/200x100/00405d/FFF&text=Mock.js"
Random.image('200x100', '#ffcc33', '#FFF', 'png', '!')
// => "http://dummyimage.com/200x100/ffcc33/FFF.png&text=!"
```

## Random.dataImage( size?, text? )

- Random.dataImage()
- Random.dataImage( size )
- Random.dataImage( size, text )

生成一段随机的 Base64 图片编码。

> 如果需要生成高度自定义的图片，请使用 **[Random.image()](https://github.com/nuysoft/Mock/wiki/Image#randomimage-size-background-foreground-format-text-)**。

### size

可选。

指示图片的宽高，格式为 `'宽x高'`。默认从下面的数组中随机读取一个：

```
[
    '300x250', '250x250', '240x400', '336x280', 
    '180x150', '720x300', '468x60', '234x60', 
    '88x31', '120x90', '120x60', '120x240', 
    '125x125', '728x90', '160x600', '120x600', 
    '300x600'
]
```

### text

可选。

指示图片上的文字。默认值为参数 size。

> 图片的背景色是随机的，取值范围参考自 http://brandcolors.net/。

```
Random.dataImage()
// => "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAYAAACPgGwlAAAFJElEQVR4Xu2dS0hUURzG/1Yqlj2otJe10AqCoiJaFFTUpgcUhLaKCIogKCEiCl0U1SIIF1EIQlFEtCmkpbWSHlAQYRYUlI9Ie6nYmI9hfIx1LpzL3PGO/aeuM/r/f7PRufe7d873/ea75xw3ZjTumDtMeKlKIAPQVfF2zAK6PuaArpA5oAO6xgQUesacDugKE1BoGU0HdIUJKLSMpgO6wgQUWkbTAV1hAgoto+mArjABhZbRdEBXmIBCy2g6oCtMQKFlNB3QFSag0DKaDugKE1BoGU0HdIUJKLSMpgO6wgQUWkbTAV1hAgoto+mArjABhZbRdEBXmIBCy2g6oCtMQKFlNB3QFSag0DKaDugKE1BoGU0HdIUJKLSMpgO6wgQUWkbTAV1hAgoto+mArjABhZbRdEBXmIBCy2g6oCtMQKFlNB3QFSag0DKaDugKE1BoGU0HdIUJKLQ8bpo+fft+ylxYSJ23LvpisOfNST/N7ENniYa9/0xy4GsTdT+6+09Yx9t4/slEgovSDt2EO3P3YcoqWuUMsWln3oihFlTWUlbhSvf4UKid2iqOUfhVrXussKZ9xHXh10/oW1lxUnmNt/EkNXimOK3QTTtn7Sv1DDUees66rTT/3B0a/NFCvc9raOqf9+YL0PfiIX0/f8ADPdrXTZEPde6xyMd66rx5wXlvnwThN8/cL4ttc7S3i0L3rjqaVI2HyWdMZGmFbhwtvv7cgZm7ZS9NyS/wbboBb1ttwQy2tdLng2s90OOPxSa24FI15azZTAOtDdRyZAOZe84ru0GTps2g0P1r7pcjVeMZE5rMm6Yduh3nktt1CaHHesk/XUW5W4sp8v4lfTm5ywN9eCBCQz/baOBLE0Ua3rgg4z/DPCUmz5xD2SvWU6IpIBXjYTIKXDahoNtHvUmho/KMZ5HmN6f31FZT2+Wjbmix12dkZtNoTwYO9P8dT+A0mTecMNBNwPmnKmnyrDyKhxnv1U4B0d5f9KmkyHPaPinMwfYrJxKu7v8GPajxMDkFKpsQ0JMJ2KZjmm8e9817CjxNt/O4Odjf+JZaj2/zDXQ06EGNJ1CSSdws7dDNAsvsr7OXr3UWVeG6x87wv5WXOD9jAzZbtf7md669nscP3KbOLa2gaE+Xc27axl2UWbB0xLxvFmnmuJnTzU/7e+wuIJXjSYJToNK0Q/ebi41Du3Xz20bZBGJX3fH3Mav0jqpyd9Xvt3o3W0Ezt492H/tZQY8nUIpJ3izt0J39s8/L7q9N03NWb/LVhOuferZyWYuX0WDnD2evHv+XOPs5sdc4+/RFRX+eECFnn25eqRpPkpwClacdeqBucDNWAoDOikmWCNBl8WS5AXRWTLJEgC6LJ8sNoLNikiUCdFk8WW4AnRWTLBGgy+LJcgPorJhkiQBdFk+WG0BnxSRLBOiyeLLcADorJlkiQJfFk+UG0FkxyRIBuiyeLDeAzopJlgjQZfFkuQF0VkyyRIAuiyfLDaCzYpIlAnRZPFluAJ0VkywRoMviyXID6KyYZIkAXRZPlhtAZ8UkSwTosniy3AA6KyZZIkCXxZPlBtBZMckSAbosniw3gM6KSZYI0GXxZLkBdFZMskSALosnyw2gs2KSJQJ0WTxZbgCdFZMsEaDL4slyA+ismGSJAF0WT5YbQGfFJEsE6LJ4stwAOismWSJAl8WT5QbQWTHJEgG6LJ4sN4DOikmWCNBl8WS5AXRWTLJEgC6LJ8sNoLNikiUCdFk8WW4AnRWTLNFvXskYA3TG3JwAAAAASUVORK5CYII="
Random.dataImage('200x100')
// => "data:image/png;base64,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"
Random.dataImage('200x100', 'Hello Mock.js!')
// => data:image/png;base64,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"
```

## Random.color()

- Random.color()

随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。

```
Random.color()
// => "#3538B2"
```

## Random.hex()

- Random.hex()

随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。

```
Random.hex()
// => "#3538B2"
```

## Random.rgb()

- Random.rgb()

随机生成一个有吸引力的颜色，格式为 'rgb(r, g, b)'。

```
Random.rgb()
// => "rgb(242, 198, 121)"
```

## Random.rgba()

- Random.rgba()

随机生成一个有吸引力的颜色，格式为 'rgba(r, g, b, a)'。

```
Random.rgba()
// => "rgba(242, 198, 121, 0.13)"
```

## Random.hsl()

- Random.hsl()

随机生成一个有吸引力的颜色，格式为 'hsl(h, s, l)'。

```
Random.hsl()
// => "hsl(345, 82, 71)"
```

## Random.paragraph( min?, max? )

- Random.paragraph()
- Random.paragraph( len )
- Random.paragraph( min, max )

随机生成一段文本。

### len

可选。

指示文本中句子的个数。默认值为 3 到 7 之间的随机数。

### min

可选。

指示文本中句子的最小个数。默认值为 3。

### max

可选。

指示文本中句子的最大个数。默认值为 7。

```
Random.paragraph()
// => "Yohbjjz psxwibxd jijiccj kvemj eidnus disnrst rcconm bcjrof tpzhdo ncxc yjws jnmdmty. Dkmiwza ibudbufrnh ndmcpz tomdyh oqoonsn jhoy rueieihtt vsrjpudcm sotfqsfyv mjeat shnqmslfo oirnzu cru qmpt ggvgxwv jbu kjde. Kzegfq kigj dtzdd ngtytgm comwwoox fgtee ywdrnbam utu nyvlyiv tubouw lezpkmyq fkoa jlygdgf pgv gyerges wbykcxhwe bcpmt beqtkq. Mfxcqyh vhvpovktvl hrmsgfxnt jmnhyndk qohnlmgc sicmlnsq nwku dxtbmwrta omikpmajv qda qrn cwoyfaykxa xqnbv bwbnyov hbrskzt. Pdfqwzpb hypvtknt bovxx noramu xhzam kfb ympmebhqxw gbtaszonqo zmsdgcku mjkjc widrymjzj nytudruhfr uudsitbst cgmwewxpi bye. Eyseox wyef ikdnws weoyof dqecfwokkv svyjdyulk glusauosnu achmrakky kdcfp kujrqcq xojqbxrp mpfv vmw tahxtnw fhe lcitj."
    
Random.paragraph(2)
// => "Dlpec hnwvovvnq slfehkf zimy qpxqgy vwrbi mok wozddpol umkek nffjcmk gnqhhvm ztqkvjm kvukg dqubvqn xqbmoda. Vdkceijr fhhyemx hgkruvxuvr kuez wmkfv lusfksuj oewvvf cyw tfpo jswpseupm ypybap kwbofwg uuwn rvoxti ydpeeerf."
    
Random.paragraph(1, 3)
// => "Qdgfqm puhxle twi lbeqjqfi bcxeeecu pqeqr srsx tjlnew oqtqx zhxhkvq pnjns eblxhzzta hifj csvndh ylechtyu."
```

## Random.cparagraph( min?, max? )

- Random.cparagraph()
- Random.cparagraph( len )
- Random.cparagraph( min, max )

随机生成一段中文文本。

参数的含义和默认值同 [Random.paragraph( min?, max? )](#Random.paragraph( min?, max? ))

```
Random.cparagraph()
// => "给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方。"
    
Random.cparagraph(2)
// => "去话起时为无子议气根复即传月广。题林里油步不约认山形两标命导社干。"
    
Random.cparagraph(1, 3)
// => "候无部社心性有构员其深例矿取民为。须被亲需报每完认支这明复几下在铁需连。省备可离展五斗器就石正队除解动。"
```

## Random.sentence( min?, max? )

- Random.sentence()
- Random.sentence( len )
- Random.sentence( min, max )

随机生成一个句子，第一个单词的首字母大写。

### len

可选。

指示句子中单词的个数。默认值为 12 到 18 之间的随机数。

### min

可选。

指示句子中单词的最小个数。默认值为 12。

### max

可选。

指示句子中单词的最大个数。默认值为 18。

```
Random.sentence()
// => "Jovasojt qopupwh plciewh dryir zsqsvlkga yeam."
Random.sentence(5)
// => "Fwlymyyw htccsrgdk rgemfpyt cffydvvpc ycgvno."
Random.sentence(3, 5)
// => "Mgl qhrprwkhb etvwfbixm jbqmg."
```

## Random.csentence( min?, max? )

- Random.csentence()
- Random.csentence( len )
- Random.csentence( min, max )

随机生成一段中文文本。

参数的含义和默认值同 [Random.sentence( min?, max? )](#Random.sentence( min?, max? ))

```
Random.csentence()
// => "第任人九同段形位第律认得。"
    
Random.csentence(2)
// => "维总。"
    
Random.csentence(1, 3)
// => "厂存。"
```

## Random.word( min?, max? )

- Random.word()
- Random.word( len )
- Random.word( min, max )

随机生成一个单词。

### len

可选。

指示单词中字符的个数。默认值为 3 到 10 之间的随机数。

### min

可选。

指示单词中字符的最小个数。默认值为 3。

### max

可选。

指示单词中字符的最大个数。默认值为 10。

```
Random.word()
// => "fxpocl"
Random.word(5)
// => "xfqjb"
Random.word(3, 5)
// => "kemh"
```

> 目前单词中的字符是随机的小写字母，未来会根据词法生成『可读』的单词。

## Random.cword( pool?, min?, max? )

- Random.cword()
- Random.cword( pool )
- Random.cword( length )
- Random.cword( pool, length )
- Random.cword( min, max )
- Random.cword( pool, min, max )

随机生成一个汉字。

### pool

可选。

汉字字符串。表示汉字字符池，将从中选择一个汉字字符返回。

### min

可选。

随机汉字字符串的最小长度。默认值为 1。

### max

可选。

随机汉字字符串的最大长度。默认值为 1。

```
Random.cword()
// => "干"
Random.cword('零一二三四五六七八九十')
// => "六"
Random.cword(3)
// => "别金提"
Random.cword('零一二三四五六七八九十', 3)
// => ""七七七""
Random.cword(5, 7)
// => "设过证全争听"
Random.cword('零一二三四五六七八九十', 5, 7)
// => "九七七零四"
```

## Random.title( min?, max? )

- Random.title()
- Random.title( len )
- Random.title( min, max )

随机生成一句标题，其中每个单词的首字母大写。

### len

可选。

指示单词中字符的个数。默认值为 3 到 7 之间的随机数。

### min

可选。

指示单词中字符的最小个数。默认值为 3。

### max

可选。

指示单词中字符的最大个数。默认值为 7。

```
Random.title()
// => "Rduqzr Muwlmmlg Siekwvo Ktn Nkl Orn"
Random.title(5)
// => "Ahknzf Btpehy Xmpc Gonehbnsm Mecfec"
Random.title(3, 5)
// => "Hvjexiondr Pyickubll Owlorjvzys Xfnfwbfk"
```

## Random.ctitle( min?, max? )

- Random.ctitle()
- Random.ctitle( len )
- Random.ctitle( min, max )

随机生成一句中文标题。

参数的含义和默认值同 [Random.title( min?, max? )](#Random.title( min?, max? ))

### len

可选。

指示单词中字符的个数。默认值为 3 到 7 之间的随机数。

### min

可选。

指示单词中字符的最小个数。默认值为 3。

### max

可选。

指示单词中字符的最大个数。默认值为 7。

```
Random.ctitle()
// => "证构动必作"
Random.ctitle(5)
// => "应青次影育"
Random.ctitle(3, 5)
// => "出料阶相"
```