"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const definition_1 = require("./definition");
const metrics_1 = require("./metrics");
function getTiming(option) {
    if (typeof window !== 'object' || !window.performance) {
        return [];
    }
    if (option.type === 'resource') {
        throw new Error('[timing2] the metrics for resource is not implemented yet');
    }
    if (typeof window.performance.getEntries === 'function' && typeof window.performance.timeOrigin === 'number') {
        const metrics = window.performance.getEntries();
        return extractMetrics(metrics, option);
    }
    if (window.performance.timing) {
        throw new Error('[timing2] the fallback for non-HRT API is not implemented yet');
    }
    return [];
}
exports.default = getTiming;
function extractMetrics(timing, option) {
    const timeOrigin = window.performance.timeOrigin;
    const metrics = [];
    const navTiming = timing.filter(t => t.entryType === 'navigation')[0];
    const paintTiming = timing.filter(t => t.entryType === 'paint');
    metrics_1.INTERVAL_METRICS.forEach(metric => {
        metrics.push({
            name: metric.name,
            type: definition_1.MetricType.Interval,
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
            type: definition_1.MetricType.Interval,
            time: firstPaint,
            start: timeOrigin,
            end: timeOrigin + firstPaint,
        });
        metrics.push({
            name: 'firstContentfulPaint',
            type: definition_1.MetricType.Interval,
            time: firstContentfulPaint,
            start: timeOrigin,
            end: timeOrigin + firstContentfulPaint,
        });
    }
    metrics_1.DURATION_METRICS.forEach(metric => {
        const start = timeOrigin + navTiming[metric.startKey];
        const end = timeOrigin + navTiming[metric.endKey];
        metrics.push({
            name: metric.name,
            type: definition_1.MetricType.Duration,
            time: end - start,
            start,
            end,
            durationType: metric.type,
        });
    });
    return metrics;
}
//# sourceMappingURL=index.js.map