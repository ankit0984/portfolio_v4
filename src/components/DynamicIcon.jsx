"use client";

import * as TablerIcons from "@tabler/icons-react";
import { IconQuestionMark } from "@tabler/icons-react";



export function DynamicIcon({
                                iconName,
                                className = "h-full w-full text-neutral-500 dark:text-neutral-300",
                            }) {
    // Dynamically look up the icon component by name from the Tabler Icons library
    // This allows us to load any icon based on CMS data without importing each one individually
    // The type cast is necessary because TypeScript can't infer the dynamic lookup at compile time
    const Icon = (
        TablerIcons
)[iconName];

    // If the icon exists, render it; otherwise show a fallback question mark icon
    return Icon ? (
        <Icon className={className} />
    ) : (
        <IconQuestionMark className={className} />
    );
}