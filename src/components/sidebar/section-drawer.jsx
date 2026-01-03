"use client";

import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export default function SectionDrawer({ item, children }) {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopiedId(null), 2000);
    };

    const CopyButton = ({ text, id }) => (
        <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 ml-auto"
            onClick={() => handleCopy(text, id)}
        >
            {copiedId === id ? (
                <IconCheck className="h-3 w-3 text-green-500" />
            ) : (
                <IconCopy className="h-3 w-3" />
            )}
        </Button>
    );

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{item.header}</DrawerTitle>
                </DrawerHeader>

                <div className="px-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <Badge variant="outline" className="capitalize">{item.type}</Badge>
                    </div>

                    {item.type === "Multi" && item.items && item.items.length > 0 ? (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground font-medium">Items ({item.items.length})</p>
                            <div className="border rounded-md divide-y">
                                {item.items.map((subItem, index) => (
                                    <div key={subItem.id || index} className="p-3 bg-muted/30 space-y-1">
                                        {Object.entries(subItem)
                                            .filter(([key]) => !["id", "_id", "__v"].includes(key))
                                            .map(([key, value]) => {
                                                const isIdField = key.toLowerCase().endsWith("id");
                                                return (
                                                    <div key={key} className="flex items-center gap-2 text-xs">
                                                        <span className="font-semibold capitalize min-w-[80px]">{key}:</span>
                                                        <span className="text-muted-foreground truncate max-w-[200px]">{String(value)}</span>
                                                        {isIdField && <CopyButton text={String(value)} id={`${subItem.id || index}-${key}`} />}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : item.type === "Single" ? (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground font-medium">Details</p>
                            <div className="border rounded-md p-3 bg-muted/30 space-y-1">
                                {Object.entries(item)
                                    .filter(([key]) => !["id", "header", "type", "userid", "userId", "items", "_id", "__v"].includes(key))
                                    .map(([key, value]) => {
                                        const isIdField = key.toLowerCase().endsWith("id");
                                        return (
                                            <div key={key} className="flex items-center gap-2 text-sm">
                                                <span className="font-semibold capitalize min-w-[80px]">{key}:</span>
                                                <span className="text-muted-foreground truncate max-w-[200px]">{String(value)}</span>
                                                {isIdField && <CopyButton text={String(value)} id={`${item.id}-${key}`} />}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm italic text-muted-foreground">No additional data available.</p>
                    )}

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">User ID</p>
                            <p className="font-mono text-sm">{item.userid || item.userId || "N/A"}</p>
                        </div>
                        {(item.userid || item.userId) && (
                            <CopyButton 
                                text={item.userid || item.userId} 
                                id={`${item.id}-userid`} 
                            />
                        )}
                    </div>
                </div>

                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
