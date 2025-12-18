const RATE_LIMIT = new Map();

export function isRateLimited(ip) {
    const now = Date.now();
    const record = RATE_LIMIT.get(ip) || { count: 0, time: now };

    if (now - record.time > 60000) {
        RATE_LIMIT.set(ip, { count: 1, time: now });
        return false;
    }

    record.count++;
    RATE_LIMIT.set(ip, record);

    return record.count > 5;
}
