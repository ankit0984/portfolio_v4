// src/hooks/usePersistedSkillColors.js
import { useEffect, useState } from "react";
import { generateColorsForGroupedSkills } from "../lib/colorUtils.js";
import { generateStorageKey } from "../lib/storageUtils.js";

/**
 * Hook to persist generated colors for groupedSkills in localStorage.
 *
 * @param {Object} groupedSkills - { categoryId: [{name,...}, ...], ... }
 * @param {Object} options
 *   - version: string used when generating the storage key (bump to invalidate)
 *   - validateLength: whether to validate saved arrays by length (defaults true)
 */
export default function usePersistedSkillColors(groupedSkills = {}, options = {}) {
    const { version = "v1", validateLength = true } = options;
    const [colorsByCategory, setColorsByCategory] = useState(null);

    useEffect(() => {
        // If groupedSkills is empty, do nothing (still safe)
        if (!groupedSkills || Object.keys(groupedSkills).length === 0) {
            // keep state null so consumer can show a loader / fallback
            return;
        }

        // run only on client
        if (typeof window === "undefined" || !window.localStorage) return;

        const storageKey = generateStorageKey(groupedSkills, version);

        try {
            const raw = localStorage.getItem(storageKey);
            let parsed = null;
            if (raw) {
                parsed = JSON.parse(raw);
            }

            const savedIsValid = (obj) => {
                if (!obj || typeof obj !== "object") return false;
                if (!validateLength) return true;
                for (const cat of Object.keys(groupedSkills)) {
                    const savedArr = obj[cat];
                    const currentLen = Array.isArray(groupedSkills[cat]) ? groupedSkills[cat].length : 0;
                    if (!Array.isArray(savedArr) || savedArr.length !== currentLen) {
                        return false;
                    }
                }
                return true;
            };

            if (parsed && savedIsValid(parsed)) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setColorsByCategory(parsed);
                return;
            }

            // generate new colors, save to storageKey
            const generated = generateColorsForGroupedSkills(groupedSkills);
            try {
                localStorage.setItem(storageKey, JSON.stringify(generated));
            } catch (err) {
                // localStorage write may fail if quota or blocked; ignore but keep generated in-memory
                // eslint-disable-next-line no-console
                console.warn("Could not save colors to localStorage:", err);
            }
            setColorsByCategory(generated);
        } catch (err) {
            // on parse error or other issues, fallback to in-memory generation
            // eslint-disable-next-line no-console
            console.error("usePersistedSkillColors error:", err);
            const fallback = generateColorsForGroupedSkills(groupedSkills);
            setColorsByCategory(fallback);
        }
    }, [groupedSkills, version, validateLength]);

    return colorsByCategory; // null while loading or if groupedSkills empty
}
