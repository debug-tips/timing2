/**
 * Define all kinds of document-level metrics
 */

export const INTERVAL_METRICS = [{
  name: 'load',
  key: 'duration'
}, {
  name: 'domInteractive',
  key: 'domInteractive'
}, {
  name: 'domContentLoaded',
  key: 'domContentLoadedEventStart'
}, {
  name: 'timeToFirstByte',
  key: 'responseStart'
}];

export const DURATION_METRICS = [{
  name: 'redirect',
  startKey: 'redirectStart',
  endKey: 'redirectEnd',
}, {
  name: 'unloadEvent',
  startKey: 'unloadEventStart',
  endKey: 'unloadEventEnd',
}, {
  name: 'appcache',
  startKey: 'fetchStart',
  endKey: 'domainLookupStart',
}, {
  name: 'dnsLookup',
  startKey: 'domainLookupStart',
  endKey: 'domainLookupEnd',
}, {
  name: 'stalled',
  startKey: 'fetchStart',
  endKey: 'requestStart',
}, {
  name: 'connect',
  startKey: 'connectStart',
  endKey: 'connectEnd',
}, {
  name: 'ssl',
  startKey: 'secureConnectionStart',
  endKey: 'connectEnd',
}, {
  name: 'request',
  startKey: 'requestStart',
  endKey: 'responseStart',
}, {
  name: 'response',
  startKey: 'responseStart',
  endKey: 'responseEnd',
}, {
  name: 'processing',
  startKey: 'responseEnd',
  endKey: 'domComplete',
}, {
  name: 'domReadyEvent',
  startKey: 'domContentLoadedEventStart',
  endKey: 'domContentLoadedEventEnd',
}, {
  name: 'loadEvent',
  startKey: 'loadEventStart',
  endKey: 'loadEventEnd',
}];
