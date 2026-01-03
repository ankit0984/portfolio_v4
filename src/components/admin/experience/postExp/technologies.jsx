"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";

export default function TechnologiesField({ value = [], onChange }) {

    // Add a new empty technology object
    const addTech = () => {
        onChange([...value, { name: "", category: "" }]);
    };

    // Update specific field in the array
    const updateTech = (index, field, val) => {
        const updated = [...value];
        updated[index] = { ...updated[index], [field]: val };
        onChange(updated);
    };

    // Remove a technology from the array
    const removeTech = (index) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <Label className="text-base font-semibold">Technologies</Label>

            {value.map((tech, index) => (
                <div key={index} className="flex gap-4 items-end">
                    {/* Technology Name Field */}
                    <div className="flex-1 space-y-2">
                        <Label htmlFor={`name-${index}`} className="text-sm">Name</Label>
                        <Input
                            id={`name-${index}`}
                            placeholder="e.g. React, Python"
                            value={tech.name}
                            onChange={(e) => updateTech(index, "name", e.target.value)}
                        />
                    </div>

                    {/* Category Field */}
                    <div className="flex-1 space-y-2">
                        <Label htmlFor={`category-${index}`} className="text-sm">Category</Label>
                        <Input
                            id={`category-${index}`}
                            placeholder="e.g. Frontend, Database"
                            value={tech.category}
                            onChange={(e) => updateTech(index, "category", e.target.value)}
                        />
                    </div>

                    {/* Remove Button */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTech(index)}
                        className="shrink-0 mb-[2px]" // Align with inputs
                    >
                        <Trash className="size-4 text-destructive" />
                    </Button>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTech}
                className="flex items-center gap-2"
            >
                <Plus className="size-4" />
                Add Technology
            </Button>
        </div>
    );
}