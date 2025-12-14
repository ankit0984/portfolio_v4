// src/lib/colorUtils.js

// produce a pleasant random HSL
export function randomHSL() {
    const hue = Math.floor(Math.random() * 360); // 0-359
    const saturation = 60 + Math.floor(Math.random() * 21); // 60-80%
    const lightness = 48 + Math.floor(Math.random() * 13); // 48-60%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Generate colors for groupedSkills shape:
 * { categoryId: [{name,...}, ...], ... }
 */
export function generateColorsForGroupedSkills(groupedSkills = {}) {
    const result = {};
    if (!groupedSkills || typeof groupedSkills !== "object") return result;

    for (const [cat, skills] of Object.entries(groupedSkills)) {
        result[cat] = Array.isArray(skills) ? skills.map(() => randomHSL()) : [];
    }
    return result;
}
