"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("./metrics");
const definition_1 = require("./definition");
function extractMetrics(timing, timeOrigin, option) {
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
        if (metric.name === 'ssl' && start === 0) {
            metrics.push({
                name: metric.name,
                type: definition_1.MetricType.Duration,
                time: 0,
                start: timeOrigin,
                end: timeOrigin,
                durationType: metric.type,
            });
        }
        else {
            metrics.push({
                name: metric.name,
                type: definition_1.MetricType.Duration,
                time: end - start,
                start,
                end,
                durationType: metric.type,
            });
        }
    });
    return metrics;
}
exports.extractMetrics = extractMetrics;
//# sourceMappingURL=extractMetrics.js.map