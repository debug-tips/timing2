"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetricType;
(function (MetricType) {
    MetricType["Duration"] = "duration";
    MetricType["Interval"] = "interval";
})(MetricType || (MetricType = {}));
;
var DurationType;
(function (DurationType) {
    DurationType["Networking"] = "networking";
    DurationType["Server"] = "server";
    DurationType["Client"] = "client";
})(DurationType || (DurationType = {}));
;
;
function getTiming(option) {
    if (typeof window !== 'object' || !window.performance) {
        return [];
    }
    if (option.type === 'resource') {
        throw new Error('[timing2] the metrics for resource is not implemented yet');
    }
    if (typeof window.performance.getEntries === 'function') {
        const metrics = window.performance.getEntries();
        return extractMetrics(metrics, option);
    }
    if (window.performance.timing) {
        throw new Error('[timing2] the fallback for non-HRT API is not implemented yet');
        return [];
    }
    return [];
}
exports.default = getTiming;
function extractMetrics(timing, option) {
    const metrics = [];
    const navTiming = timing.filter(t => t.entryType === 'navigation')[0];
    const paintTiming = timing.filter(t => t.entryType === 'paint');
    metrics.push({
        name: 'load',
        type: MetricType.Interval,
        time: navTiming.duration,
    });
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
    const secureConnectionStart = navTiming.secureConnectionStart;
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
    metrics.push({
        name: 'parseHTML',
        type: MetricType.Duration,
        time: navTiming.domInteractive - navTiming.responseEnd,
        durationType: DurationType.Client,
    });
    metrics.push({
        name: 'loadCritialResources',
        type: MetricType.Duration,
        time: navTiming.domContentLoadedEventStart - navTiming.responseEnd,
        durationType: DurationType.Client,
    });
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
//# sourceMappingURL=index.js.map