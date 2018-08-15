/**
 * timing2 - The state-of-art web performance metrics collector
 *           based on High Resolution Time API
 * @author jasonslyvia
 */

interface PerformancePaintTiming extends PerformanceEntry {
  // fill the void of official definition
}

enum MetricType {
  /** a certain period of time, eg. LoadEventTime, DNSLookUpTime */
  Duration = 'duration',
  /** time elapsed from the begining, eg. `load` time, `domReady` time, TTFB */
  Interval = 'interval',
};

enum DurationType {
  /** DNSLookUp, TCP, Redirects, etc */
  Networking = 'networking',
  /** Request start to Response End */
  Server = 'server',
  /** Parsing, rendering, etc */
  Client = 'client',
};

interface Metric {
  name: string,
  type: MetricType,
  durationType?: DurationType,
  time: number,
};

interface Option {
  type: 'page' | 'resource',
  extra?: boolean
}

export default function getTiming(option: Option): Metric[] {
  if (typeof window !== 'object' || !window.performance) {
    return [];
  }

  if (option.type === 'resource') {
    throw new Error('[timing2] the metrics for resource is not implemented yet');
  }

  // try to use `getEntries` first
  if (typeof window.performance.getEntries === 'function') {
    const metrics = window.performance.getEntries();
    return extractMetrics(metrics, option);
  }

  // then fallback to `performance.timing` which is to be deprecated
  if (window.performance.timing) {
    throw new Error('[timing2] the fallback for non-HRT API is not implemented yet');
  }

  return [];
}

function extractMetrics(timing: PerformanceEntry[], option: Option) {
  const metrics: Metric[] = [];

  const navTiming = timing.filter(t => t.entryType === 'navigation')[0] as PerformanceNavigationTiming;
  const paintTiming = timing.filter(t => t.entryType === 'paint') as PerformancePaintTiming[];

  // Total time from start to load
  metrics.push({
    name: 'load',
    type: MetricType.Interval,
    time: navTiming.duration,
  });

  // the well-known `dom ready` time
  metrics.push({
    name: 'domContentLoaded',
    type: MetricType.Interval,
    time: navTiming.domContentLoadedEventStart,
  });

  metrics.push({
    name: 'timeToFirstByte',
    type: MetricType.Interval,
    time: navTiming.responseStart,
  });

  if (paintTiming.length) {
    const firstPaint = paintTiming.filter(t => t.name === 'first-paint')[0].startTime;
    const firstContentfulPaint = paintTiming.filter(t => t.name === 'first-contentful-paint')[0].startTime;

    metrics.push({
      name: 'firstPaint',
      type: MetricType.Interval,
      time: firstPaint,
    });

    metrics.push({
      name: 'firstContentfulPaint',
      type: MetricType.Interval,
      time: firstContentfulPaint,
    });
  }

  metrics.push({
    name: 'redirect',
    type: MetricType.Duration,
    time: navTiming.redirectEnd - navTiming.redirectStart,
    durationType: DurationType.Networking,
  });

  metrics.push({
    name: 'appcache',
    type: MetricType.Duration,
    time: navTiming.domainLookupStart - navTiming.fetchStart,
    durationType: DurationType.Networking,
  });

  metrics.push({
    name: 'dnsLookup',
    type: MetricType.Duration,
    time: navTiming.domainLookupEnd - navTiming.domainLookupStart,
    durationType: DurationType.Networking,
  });

  metrics.push({
    name: 'stalled',
    type: MetricType.Duration,
    time: navTiming.connectStart - navTiming.domainLookupEnd,
    durationType: DurationType.Networking,
  });

  metrics.push({
    name: 'connect',
    type: MetricType.Duration,
    time: navTiming.connectEnd - navTiming.connectStart,
    durationType: DurationType.Networking,
  });

  const secureConnectionStart = (navTiming as any).secureConnectionStart;
  if (secureConnectionStart) {
    metrics.push({
      name: 'ssl',
      type: MetricType.Duration,
      time: navTiming.connectEnd - secureConnectionStart,
      durationType: DurationType.Networking,
    });
  }

  metrics.push({
    name: 'request',
    type: MetricType.Duration,
    time: navTiming.responseStart - navTiming.requestStart,
    durationType: DurationType.Server,
  });

  metrics.push({
    name: 'response',
    type: MetricType.Duration,
    time: navTiming.responseEnd - navTiming.responseStart,
    durationType: DurationType.Server,
  });

  // For the detailed explanation of DOM related durations, see
  // https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp#navigation-timing

  // From the time start parsing HTML document to DOM structure parsed
  metrics.push({
    name: 'parseHTML',
    type: MetricType.Duration,
    time: navTiming.domInteractive - navTiming.responseEnd,
    durationType: DurationType.Client,
  });

  // From the time start parsing HTML document to all defered scripts loaded and critical CSS loaded
  metrics.push({
    name: 'loadCritialResources',
    type: MetricType.Duration,
    time: navTiming.domContentLoadedEventStart - navTiming.responseEnd,
    durationType: DurationType.Client,
  });

  // From the time start parsing HTML document to all resources (including images, async scripts) loaded
  metrics.push({
    name: 'loadAllResources',
    type: MetricType.Duration,
    time: navTiming.domComplete - navTiming.responseEnd,
    durationType: DurationType.Client,
  });

  metrics.push({
    name: 'domReadyEvent',
    type: MetricType.Duration,
    time: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
    durationType: DurationType.Client,
  });

  metrics.push({
    name: 'loadEvent',
    type: MetricType.Duration,
    time: navTiming.loadEventEnd - navTiming.loadEventStart,
    durationType: DurationType.Client,
  });

  return metrics;
}
