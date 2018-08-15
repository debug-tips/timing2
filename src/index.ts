/**
 * timing2 - The state-of-art web performance metrics collector
 *           based on High Resolution Time API
 * @author jasonslyvia
 */
import { Option, Metric, MetricType, PerformancePaintTiming, DurationType } from "./definition";
import { INTERVAL_METRICS, DURATION_METRICS } from './metrics';

export default function getTiming(option: Option): Metric[] {
  if (typeof window !== 'object' || !window.performance) {
    return [];
  }

  if (option.type === 'resource') {
    throw new Error('[timing2] the metrics for resource is not implemented yet');
  }

  // try to use `getEntries` first
  if (typeof window.performance.getEntries === 'function' && typeof window.performance.timeOrigin === 'number') {
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
  const timeOrigin = window.performance.timeOrigin;
  const metrics: Metric[] = [];

  const navTiming = timing.filter(t => t.entryType === 'navigation')[0] as PerformanceNavigationTiming;
  const paintTiming = timing.filter(t => t.entryType === 'paint') as PerformancePaintTiming[];

  INTERVAL_METRICS.forEach(metric => {
    metrics.push({
      name: metric.name,
      type: MetricType.Interval,
      time: (navTiming as any)[metric.key],
      start: timeOrigin,
      end: timeOrigin + (navTiming as any)[metric.key],
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

  // For the detailed explanation of DOM related durations, see
  // https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp#navigation-timing
  DURATION_METRICS.forEach(metric => {
    const start = timeOrigin + (navTiming as any)[metric.startKey];
    const end = timeOrigin + (navTiming as any)[metric.endKey];

    metrics.push({
      name: metric.name,
      type: MetricType.Duration,
      time: end - start,
      start,
      end,
      durationType: metric.type,
    });
  });

  return metrics;
}
