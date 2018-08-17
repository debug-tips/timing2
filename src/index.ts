/**
 * timing2 - The state-of-art web performance metrics collector
 *           based on High Resolution Time API
 * @author jasonslyvia
 */
import { Option, Metric, MetricType, PerformancePaintTiming, DurationType } from "./definition";
import { extractMetrics } from "./extractMetrics";

function getTiming(option: Option): Metric[] {
  /* istanbul ignore if */
  if (typeof window !== 'object' || !window.performance) {
    return [];
  }

  /* istanbul ignore if */
  if (option.type === 'resource') {
    throw new Error('[timing2] the metrics for resource is not implemented yet');
  }

  // try to use `getEntries` first
  /* istanbul ignore if */
  if (typeof window.performance.getEntries === 'function' && typeof window.performance.timeOrigin === 'number') {
    const metrics = window.performance.getEntries();
    return extractMetrics(metrics, window.performance.timeOrigin, option);
  }

  // then fallback to `performance.timing` which is to be deprecated
  /* istanbul ignore if */
  if (window.performance.timing) {
    throw new Error('[timing2] the fallback for non-HRT API is not implemented yet');
  }

  return [];
}

export default getTiming;
