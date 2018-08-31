/**
 * timing2 - The state-of-the-art web performance metrics collector
 *           based on High Resolution Time API
 * @author jasonslyvia
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.timing2 = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  if (typeof window !== 'object') {
    return;
  }

  var win = window;
  var timing2;
  var NAVIGATION_TYPE = {
    0: 'navigate',
    1: 'reload',
    2: 'back_forward',
  };

  var KEYS = [
    'unloadEventStart',
    'unloadEventEnd',
    'redirectStart',
    'redirectEnd',
    'fetchStart',
    'domainLookupStart',
    'domainLookupEnd',
    'connectStart',
    'connectEnd',
    'secureConnectionStart',
    'requestStart',
    'responseStart',
    'responseEnd',
    'domLoading',
    'domInteractive',
    'domContentLoadedEventStart',
    'domContentLoadedEventEnd',
    'domComplete',
    'loadEventStart'
  ];

  if (!win || !win.performance || typeof win.performance !== 'object') {
    return timing2;
  }

  if (typeof win.performance.getEntries === 'function' && win.performance.timeOrigin) {
    return win.performance;
  }

  var getEntry = function() {
    var entry = win.performance.timing;
    var timeOrigin = entry.navigationStart || entry.redirectStart || entry.fetchStart;
    var finalEntry = {
      entryType: 'navigation',
      initiatorType: 'navigation',
      name: win.location.href,
      startTime: 0,
      duration: entry.loadEventEnd - timeOrigin,
      redirectCount: win.performance.navigation.redirectCount,
      type: NAVIGATION_TYPE[win.performance.navigation.type],
    };

    for (var i = 0; i < KEYS.length; i++) {
      var key = KEYS[i];
      var value = entry[key];
      finalEntry[key] = !value ? 0 : value - timeOrigin;
    }

    return finalEntry;
  };

  timing2 = {
    _entry: getEntry(),
    timeOrigin: win.performance.timing.navigationStart,
    getEntries: function() {
      return [this._entry];
    },
    getEntriesByType: function(type) {
      if (type !== 'navigation') {
        return [];
      }

      return [this._entry];
    },
    getEntriesByName: function(name) {
      if (name !== win.location.href) {
        return [];
      }

      return [this._entry];
    },
    now: function() {
      return Date.now() - win.performance.timing.navigationStart;
    },
  };

  return timing2;
}));
