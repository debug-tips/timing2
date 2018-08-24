/**
 * timing2 - The state-of-the-art web performance metrics collector
 *           based on High Resolution Time API
 * @author jasonslyvia
 */
import { Option, Metric } from "./definition";
import { extractMetrics } from "./extractMetrics";

function getTiming(option: Option): Metric[] {
  if (typeof window !== 'object' || !window.performance) {
    return [];
  }

  if (option.type === 'resource') {
    throw new Error('[timing2] the metrics for resource is not implemented yet');
  }

  // try to use `getEntries` first
  if (typeof window.performance.getEntries === 'function' && typeof window.performance.timeOrigin === 'number') {
    const metrics = window.performance.getEntries();
    return extractMetrics(metrics, window.performance.timeOrigin, option);
  }

  // then fallback to `performance.timing` which is to be deprecated
  if (window.performance.timing) {
    throw new Error('[timing2] the fallback for non-HRT API is not implemented yet');
  }

  return [];
}

export default getTiming;
