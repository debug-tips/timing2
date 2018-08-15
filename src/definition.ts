export interface PerformancePaintTiming extends PerformanceEntry {
  // fill the void of official definition
}

export enum MetricType {
  /** a certain period of time, eg. LoadEventTime, DNSLookUpTime */
  Duration = 'duration',
  /** time elapsed from the begining, eg. `load` time, `domReady` time, TTFB */
  Interval = 'interval',
};

export enum DurationType {
  /** DNSLookUp, TCP, Redirects, etc */
  Networking = 'networking',
  /** Request start to Response End */
  Server = 'server',
  /** Parsing, rendering, etc */
  Client = 'client',
};

export interface Metric {
  name: string,
  type: MetricType,
  durationType?: DurationType,
  time: number,
  start: number,
  end: number,
};

export interface Option {
  type: 'page' | 'resource',
  extra?: boolean
}
