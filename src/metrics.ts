/**
 * Define all kinds of metrics
 */

import { DurationType } from "./definition";

export const INTERVAL_METRICS = [{
  name: 'load',
  key: 'duration',
}, {
  name: 'domContentLoaded',
  key: 'domContentLoadedEventStart',
}, {
  name: 'timeToFirstByte',
  key: 'responseStart'
}];

export const DURATION_METRICS = [{
  name: 'redirect',
  startKey: 'redirectStart',
  endKey: 'redirectEnd',
  type: DurationType.Networking
}, {
  name: 'unloadEvent',
  startKey: 'unloadEventStart',
  endKey: 'unloadEventEnd',
  type: DurationType.Client,
}, {
  name: 'appcache',
  startKey: 'fetchStart',
  endKey: 'domainLookupStart',
  type: DurationType.Networking
}, {
  name: 'dnsLookup',
  startKey: 'domainLookupStart',
  endKey: 'domainLookupEnd',
  type: DurationType.Networking
}, {
  name: 'stalled',
  startKey: 'domainLookupEnd',
  endKey: 'connectStart',
  type: DurationType.Networking
}, {
  name: 'connect',
  startKey: 'connectStart',
  endKey: 'connectEnd',
  type: DurationType.Networking
}, {
  name: 'ssl',
  startKey: 'secureConnectionStart',
  endKey: 'connectEnd',
  type: DurationType.Networking
}, {
  name: 'request',
  startKey: 'requestStart',
  endKey: 'responseStart',
  type: DurationType.Server
}, {
  name: 'response',
  startKey: 'responseStart',
  endKey: 'responseEnd',
  type: DurationType.Server
}, {
  name: 'parseHTML',
  startKey: 'responseEnd',
  endKey: 'domInteractive',
  type: DurationType.Client
}, {
  name: 'loadCritialResources',
  startKey: 'responseEnd',
  endKey: 'domContentLoadedEventStart',
  type: DurationType.Client
}, {
  name: 'domReadyEvent',
  startKey: 'domContentLoadedEventStart',
  endKey: 'domContentLoadedEventEnd',
  type: DurationType.Client
}, {
  name: 'loadAllResources',
  startKey: 'responseEnd',
  endKey: 'domComplete',
  type: DurationType.Client
}, {
  name: 'loadEvent',
  startKey: 'loadEventStart',
  endKey: 'loadEventEnd',
  type: DurationType.Client
}];
