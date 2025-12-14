import { v4 as uuidv4 } from "uuid";


function assignCategoryUuids(items) {
    const catMap = new Map(); // category → UUID

    for (const item of items) {
        const rawCat = item.category;
        const catKey = rawCat;

        // Grab an existing UUID or create a new one.
        let uuid = catMap.get(catKey);
        if (!uuid) {
            uuid = uuidv4();                // random v4 (per‑request)
            catMap.set(catKey, uuid);
        }

        // Attach the generated UUID back to the payload.
        item.categoryUuid = uuid;

        // Optionally also keep the *canonical* (normalized) category string.
        item.normalizedCategory = catKey;
    }

    return items;
}
