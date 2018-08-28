export interface PerformancePaintTiming extends PerformanceEntry {
  // fill the void of official definition
}

export enum MetricType {
  /** a certain period of time, eg. LoadEventTime, DNSLookUpTime */
  Duration = 'duration',
  /** time elapsed from the begining, eg. `load` time, `domReady` time, TTFB */
  Interval = 'interval',
};

export interface Metric {
  name: string,
  type: MetricType,
  time: number,
  start: number,
  end: number,
};

export interface Option {
  type: 'page' | 'resource',
  extra?: boolean
}
