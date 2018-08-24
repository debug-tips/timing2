"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractMetrics_1 = require("./extractMetrics");
function getTiming(option) {
    if (typeof window !== 'object' || !window.performance) {
        return [];
    }
    if (option.type === 'resource') {
        throw new Error('[timing2] the metrics for resource is not implemented yet');
    }
    if (typeof window.performance.getEntries === 'function' && typeof window.performance.timeOrigin === 'number') {
        const metrics = window.performance.getEntries();
        return extractMetrics_1.extractMetrics(metrics, window.performance.timeOrigin, option);
    }
    if (window.performance.timing) {
        throw new Error('[timing2] the fallback for non-HRT API is not implemented yet');
    }
    return [];
}
exports.default = getTiming;
//# sourceMappingURL=index.js.map