// src/lib/storageUtils.js

// simple djb2-like hash (deterministic)
function djb2Hash(str = "") {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        // eslint-disable-next-line no-bitwise
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    // >>> 0 to make it positive, toString(36) to shorten
    return (hash >>> 0).toString(36);
}

/**
 * Build a stable signature from groupedSkills.
 * Uses category + sorted skill names. Returns a storage key string.
 *
 * @param {Object} groupedSkills - { categoryId: [{name, ...}, ...], ... }
 * @param {string} version - a version token you can bump manually to invalidate
 * @returns {string}
 */
export function generateStorageKey(groupedSkills = {}, version = "v1") {
    if (!groupedSkills || typeof groupedSkills !== "object") {
        return `skillColors_${version}_empty`;
    }

    const pairs = [];
    const cats = Object.keys(groupedSkills).sort();
    for (const cat of cats) {
        const skills = Array.isArray(groupedSkills[cat])
            ? groupedSkills[cat].slice().map((s) => String(s?.name || "")).sort()
            : [];
        for (const name of skills) {
            pairs.push(`${cat}|${name}`);
        }
    }
    const base = pairs.join(";;");
    const sig = djb2Hash(base);
    return `skillColors_${version}_${sig}`;
}
