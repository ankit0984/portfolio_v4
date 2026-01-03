export function calculateGrowth(current, previous) {
    if (previous === 0 && current > 0) return 100;
    if (previous === 0 && current === 0) return 0;

    return Number((((current - previous) / previous) * 100).toFixed(2));
}
