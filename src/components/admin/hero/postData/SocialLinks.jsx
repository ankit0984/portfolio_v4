"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";

const PLATFORMS = [
    "github",
    "linkedin",
    "twitter",
    "instagram",
    "youtube",
    "website",
];

export default function SocialLinksField({ value = [], onChange }) {
    const addLink = () => {
        onChange([...value, { platform: "", url: "" }]);
    };

    const updateLink = (index, field, val) => {
        const updated = [...value];
        updated[index][field] = val;
        onChange(updated);
    };

    const removeLink = (index) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <Label>Social Links</Label>

            {value.map((link, index) => (
                <div key={index} className="flex gap-2 items-center">
                    {/* Platform */}
                    <Select
                        value={link.platform}
                        onValueChange={(v) => updateLink(index, "platform", v)}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                            {PLATFORMS.map((p) => (
                                <SelectItem key={p} value={p}>
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* URL */}
                    <Input
                        placeholder="https://..."
                        value={link.url}
                        onChange={(e) => updateLink(index, "url", e.target.value)}
                    />

                    {/* Remove */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLink(index)}
                    >
                        <Trash className="size-4 text-destructive" />
                    </Button>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLink}
                className="flex items-center gap-2"
            >
                <Plus className="size-4" />
                Add Social Link
            </Button>
        </div>
    );
}
