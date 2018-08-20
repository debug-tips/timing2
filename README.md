timing2 [![Build Status](https://travis-ci.com/debug-tips/timing2.svg)](https://travis-ci.com/debug-tips/timing2) [![npm version](https://badge.fury.io/js/timing2.svg)](http://badge.fury.io/js/timing2) [![Coverage Status](https://coveralls.io/repos/github/debug-tips/timing2/badge.svg?branch=master)](https://coveralls.io/github/debug-tips/timing2?branch=master) [![npm downloads](https://img.shields.io/npm/dm/timing2.svg)](https://www.npmjs.com/package/timing2)
------------
⚡️ The state-of-the-art web performance metrics collector based on [High Resolution Time API](https://www.w3.org/TR/hr-time-2/), with extended performance information that helps you understand how your website loads.

> ATTENTION!! This project is currently under active development, API may subject to change until it reacts `1.0.0`, DO NOT use in production at this moment.

![timing2](https://img.alicdn.com/tfs/TB1C5U8oYArBKNjSZFLXXc_dVXa-1634-762.png)

[visualize your own data](http://jsbin.com/deyaval/6/edit?html,output)

## Usage

**module**

```bash
npm install --save timing2
```

```js
import timing2 from 'timing2';
timing2({ type: 'page' });
```

**standalone**

```html
<script src="https://unpkg.com/timing2@0.2.0/lib/timing2.js"></script>
<script>
  timing2({ type: 'page' });
</script>
```

## API

TODO

## Bookmarklet

```js
javascript:!function(t){if("object"==typeof t&&"object"==typeof t.document){var e=t.document,n=e.createElement("script");t.define=null,n.src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.2.7-beta.4/dist/g2.min.js",n.onload=function(){var n=e.createElement("script"),i=t.define;n.src="https://unpkg.com/timing2@0.2.0/lib/timing2.js",n.onload=function(){t.define=i;var n=e.createElement("div");n.style.position="fixed",n.style.width="100%",n.style.height=300,n.style.zIndex=9999,n.style.top=0,n.style.backgroundColor="#fff",n.style.borderBottom="1px solid #999",document.body.appendChild(n);var o=timing2({type:"page"}),a=o.find(t=>"redirect"===t.name).start,d=new G2.Chart({container:n,forceFit:!0,height:400,padding:[50,100,50,150]}),l=o.find(t=>"timeToFirstByte"===t.name).time;d.guide().line({start:["redirect",a+l],end:["loadEvent",a+l],lineStyle:{stroke:"#999",lineDash:[0,2,2],lineWidth:1},text:{content:`Time to First Byte (TTFB) - ${Math.round(l)}ms`,textAlign:"left",autoRotate:!1,offsetX:105,offsetY:-240}});var r=o.find(t=>"domContentLoaded"===t.name).time;d.guide().line({start:["redirect",a+r],end:["loadEvent",a+r],lineStyle:{stroke:"#999",lineDash:[0,2,2],lineWidth:1},text:{content:`DOMContentLoaded - ${Math.round(r)}ms`,textAlign:"left",autoRotate:!1,offsetX:95,offsetY:-175}});var s=o.find(t=>"load"===t.name).time;d.guide().line({start:["redirect",a+s],end:["loadEvent",a+s],lineStyle:{stroke:"#f40",lineDash:[0,2,2],lineWidth:1},text:{content:`load - ${Math.round(s)}ms`,textAlign:"left",style:{fill:"#f40"},autoRotate:!1,offsetX:48,offsetY:-150}});var f=o.find(t=>"firstPaint"===t.name).time;d.guide().line({start:["redirect",a+f],end:["loadEvent",a+f],lineStyle:{stroke:"#999",lineDash:[0,2,2],lineWidth:1},text:{content:`First Paint - ${Math.round(f)}ms`,textAlign:"left",autoRotate:!1,offsetX:65,offsetY:-225}});var m=o.find(t=>"firstContentfulPaint"===t.name).time;d.guide().line({start:["redirect",a+m],end:["loadEvent",a+m],lineStyle:{stroke:"#999",lineDash:[0,2,2],lineWidth:1},text:{content:`First Contentful Paint - ${Math.round(m)}ms`,textAlign:"left",autoRotate:!1,offsetX:98,offsetY:-200}}),d.axis("range",{grid:null}).coord().transpose().scale(1,-1);var c=o.filter(t=>t.durationType).map(t=>({...t,range:[t.start,t.end]}));d.source(c,{range:{type:"time",formatter:t=>Math.round(t-a)+"ms"}}),d.interval().position("name*range").color("durationType",["#2FC25B","#F04864","blue"]).tooltip("time"),d.render()},e.body.appendChild(n)},e.body.appendChild(n)}}(this);
```

## Sample Data

```json
[
  {
    "name": "load",
    "type": "interval",
    "time": 2800.8999999728985
  },
  {
    "name": "domContentLoaded",
    "type": "interval",
    "time": 2094.2999999970198
  },
  {
    "name": "timeToFirstByte",
    "type": "interval",
    "time": 1369.6999999810942
  },
  {
    "name": "firstPaint",
    "type": "interval",
    "time": 1795.0999999884516
  },
  {
    "name": "firstContentfulPaint",
    "type": "interval",
    "time": 1795.0999999884516
  },
  {
    "name": "redirect",
    "type": "duration",
    "time": 0,
    "durationType": "networking"
  },
  {
    "name": "appcache",
    "type": "duration",
    "time": 0,
    "durationType": "networking"
  },
  {
    "name": "dnsLookup",
    "type": "duration",
    "time": 0,
    "durationType": "networking"
  },
  {
    "name": "stalled",
    "type": "duration",
    "time": 7.999999972525984,
    "durationType": "networking"
  },
  {
    "name": "connect",
    "type": "duration",
    "time": 247.80000001192093,
    "durationType": "networking"
  },
  {
    "name": "ssl",
    "type": "duration",
    "time": 245.40000001434237,
    "durationType": "networking"
  },
  {
    "name": "request",
    "type": "duration",
    "time": 1079.3999999877997,
    "durationType": "server"
  },
  {
    "name": "response",
    "type": "duration",
    "time": 327.69999996526167,
    "durationType": "server"
  },
  {
    "name": "parseHTML",
    "type": "duration",
    "time": 396.90000005066395,
    "durationType": "client"
  },
  {
    "name": "loadCritialResources",
    "type": "duration",
    "time": 396.90000005066395,
    "durationType": "client"
  },
  {
    "name": "loadAllResources",
    "type": "duration",
    "time": 1094.9000000255182,
    "durationType": "client"
  },
  {
    "name": "domReadyEvent",
    "type": "duration",
    "time": 106.70000000391155,
    "durationType": "client"
  },
  {
    "name": "loadEvent",
    "type": "duration",
    "time": 8.600000001024455,
    "durationType": "client"
  }
]
```

## ChangeLog

### v0.1.0
- Add page metrics

### v0.2.0
- Refactor to split modules
- Add `unloadEvent`
- Add `unpkg` support

## Prior Art

- [timing.js](https://github.com/addyosmani/timing.js)
- [lighthouse](https://github.com/GoogleChrome/lighthouse)
