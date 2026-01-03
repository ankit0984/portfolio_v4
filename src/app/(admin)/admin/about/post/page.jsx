import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea";
import * as React from "react";

export default function HeroPostData() {


    return (
        <div className='max-h-screen pt-4'>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div
            className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card ">
                <CardHeader>
                    <CardTitle>About post data</CardTitle>
                    <CardDescription>
                        Enter about section data
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-rows-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="title of about data"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Description</Label>
                                <Textarea placeholder="Type your message here." id="message" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </div>
            </div>
        </div>
    )
}
