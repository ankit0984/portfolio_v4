'use client'
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
import SocialLinksField from "@/components/admin/hero/postData/SocialLinks";

export default function HeroPostData() {
    const [socialLinks, setSocialLinks] = React.useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            socialLinks,
            // other form fields
        };

        console.log(payload);
    }
    return (
        <div
            className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card ">
            <CardHeader>
                <CardTitle>Hero post data</CardTitle>
                <CardDescription>
                    Enter hero section data
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid grid-rows-3 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input
                                id="fullname"
                                type="text"
                                placeholder="user dev"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                type="text"
                                placeholder="location"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Bio</Label>
                            <Textarea placeholder="Type your message here." id="message" />
                        </div>

                        <div className="@container w-full grid grid-cols-2">
                            <div className="grid w-full max-w-md items-center gap-3">
                                <Label htmlFor="picture">Picture</Label>
                                <Input id="picture" type="file" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">flip text</Label>
                                <Textarea placeholder="Type your message here." id="message" />
                            </div>
                        </div>
                        <SocialLinksField
                            value={socialLinks}
                            onChange={setSocialLinks}
                        />

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
    )
}
