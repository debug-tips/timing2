(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.timing2 = factory());
}(this, (function () { 'use strict';

  var MetricType;
  (function (MetricType) {
      MetricType["Duration"] = "duration";
      MetricType["Interval"] = "interval";
  })(MetricType || (MetricType = {}));
  var DurationType;
  (function (DurationType) {
      DurationType["Networking"] = "networking";
      DurationType["Server"] = "server";
      DurationType["Client"] = "client";
  })(DurationType || (DurationType = {}));

  const INTERVAL_METRICS = [{
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
  const DURATION_METRICS = [{
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
          startKey: 'fetchStart',
          endKey: 'requestStart',
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
          name: 'processing',
          startKey: 'responseEnd',
          endKey: 'domComplete',
          type: DurationType.Client
      }, {
          name: 'domReadyEvent',
          startKey: 'domContentLoadedEventStart',
          endKey: 'domContentLoadedEventEnd',
          type: DurationType.Client
      }, {
          name: 'loadEvent',
          startKey: 'loadEventStart',
          endKey: 'loadEventEnd',
          type: DurationType.Client
      }];

  function extractMetrics(timing, timeOrigin, option) {
      const metrics = [];
      const navTiming = timing.filter(t => t.entryType === 'navigation')[0];
      const paintTiming = timing.filter(t => t.entryType === 'paint');
      INTERVAL_METRICS.forEach(metric => {
          metrics.push({
              name: metric.name,
              type: MetricType.Interval,
              time: navTiming[metric.key],
              start: timeOrigin,
              end: timeOrigin + navTiming[metric.key],
          });
      });
      if (paintTiming.length) {
          const firstPaint = paintTiming.filter(t => t.name === 'first-paint')[0].startTime;
          const firstContentfulPaint = paintTiming.filter(t => t.name === 'first-contentful-paint')[0].startTime;
          metrics.push({
              name: 'firstPaint',
              type: MetricType.Interval,
              time: firstPaint,
              start: timeOrigin,
              end: timeOrigin + firstPaint,
          });
          metrics.push({
              name: 'firstContentfulPaint',
              type: MetricType.Interval,
              time: firstContentfulPaint,
              start: timeOrigin,
              end: timeOrigin + firstContentfulPaint,
          });
      }
      DURATION_METRICS.forEach(metric => {
          const start = timeOrigin + navTiming[metric.startKey];
          const end = timeOrigin + navTiming[metric.endKey];
          if (metric.name === 'ssl' && start === 0) {
              metrics.push({
                  name: metric.name,
                  type: MetricType.Duration,
                  time: 0,
                  start: timeOrigin,
                  end: timeOrigin,
                  durationType: metric.type,
              });
          }
          else {
              metrics.push({
                  name: metric.name,
                  type: MetricType.Duration,
                  time: end - start,
                  start,
                  end,
                  durationType: metric.type,
              });
          }
      });
      return metrics;
  }

  function getTiming(option) {
      if (typeof window !== 'object' || !window.performance) {
          return [];
      }
      if (option.type === 'resource') {
          throw new Error('[timing2] the metrics for resource is not implemented yet');
      }
      if (typeof window.performance.getEntries === 'function' && typeof window.performance.timeOrigin === 'number') {
          const metrics = window.performance.getEntries();
          return extractMetrics(metrics, window.performance.timeOrigin, option);
      }
      if (window.performance.timing) {
          throw new Error('[timing2] the fallback for non-HRT API is not implemented yet');
      }
      return [];
  }

  return getTiming;

})));
