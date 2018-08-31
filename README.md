timing2 [![Build Status](https://travis-ci.com/debug-tips/timing2.svg)](https://travis-ci.com/debug-tips/timing2) [![npm version](https://badge.fury.io/js/timing2.svg)](http://badge.fury.io/js/timing2) [![Coverage Status](https://coveralls.io/repos/github/debug-tips/timing2/badge.svg?branch=master)](https://coveralls.io/github/debug-tips/timing2?branch=master) [![npm downloads](https://img.shields.io/npm/dm/timing2.svg)](https://www.npmjs.com/package/timing2)
------------
A [PerformanceTimeline](https://www.w3.org/TR/performance-timeline-2/) polyfill for legacy browsers.

> ATTENTION!! This project is currently under active development, API may subject to change until it reacts `1.0.0`, DO NOT use in production at this moment.

## Usage

**module**

```bash
npm install --save timing2
```

```js
import timing2 from 'timing2';
timing2.getEntries();
timing2.getEntriesByName(name);
timing2.getEntriesByType('navigation');
timing2.now();
timing2.timeOrigin;
```

**standalone**

```html
<script src="https://unpkg.com/timing2@0.3.0/lib/timing2.js"></script>
<script>
  timing2.getEntries();
  timing2.getEntriesByName(name);
  timing2.getEntriesByType('navigation');
  timing2.now();
  timing2.timeOrigin;
</script>
```

## API

The following methods and properties of `window.performance` is polyfilled:

 - getEntries
 - getEntriesByName
 - getEntriesByType
 - now
 - timeOrigin

For legacy browsers, only `NavigationTiming` will be returned.

## ChangeLog

### v0.3.0

- make this project a polyfill
