'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
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
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChevronDownIcon} from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import {NativeSelect, NativeSelectOption} from "../../../../../components/ui/native-select";
import {useState} from "react";
import TechnologiesField from "./technologies";



export default function PostExp() {
    const [technologies, setTechnologies] = useState([]);


    function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            technologies,
        };

        console.log(payload);
    }
    // 1. Separate states for Start Date
    const [startDate, setStartDate] = React.useState(null);
    const [startOpen, setStartOpen] = React.useState(false);

    // 2. Separate states for End Date
    const [endDate, setEndDate] = React.useState(null);
    const [endOpen, setEndOpen] = React.useState(false);
    return (

        <div
            className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card ">
                <CardHeader>
                    <CardTitle>Experience post data</CardTitle>
                    <CardDescription>
                        Enter Experience section data
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-rows-3 gap-6">

                            <div className="grid gap-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input
                                    id="company"
                                    type="text"
                                    placeholder="company name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    type="text"
                                    placeholder="fullstack engineer"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="employment_type">employment_type</Label>
                                <Input
                                    id="employment_type"
                                    type="text"
                                    placeholder="remote"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="employment_type">Location</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    placeholder="location"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Description</Label>
                                <Textarea placeholder="Type Description here." id="message" />
                            </div>

                            {/* calendar  start time and end time*/}
                            <div className="container max-w-lvw flex gap-x-6">

                                {/* company logo */}
                                <div className="grid items-center gap-3">
                                    <Label htmlFor="picture">Picture</Label>
                                    <Input id="picture" type="file" />
                                </div>

                                {/* Start Date Field */}
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="start_date" className="px-1">Start_Date</Label>
                                    <Popover open={startOpen} onOpenChange={setStartOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-48 justify-between font-normal">
                                                {startDate ? startDate.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={startDate}
                                                onSelect={(d) => {
                                                    setStartDate(d);
                                                    setStartOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* End Date Field */}
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="end_date" className="px-1">End_Date</Label>
                                    <Popover open={endOpen} onOpenChange={setEndOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-48 justify-between font-normal">
                                                {endDate ? endDate.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                onSelect={(d) => {
                                                    setEndDate(d);
                                                    setEndOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* current status */}
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="current">Current_Status</Label>
                                    <NativeSelect>
                                        <NativeSelectOption value="">Status</NativeSelectOption>
                                        <NativeSelectOption value="working">Working</NativeSelectOption>
                                        <NativeSelectOption value="todo">Not working</NativeSelectOption>
                                    </NativeSelect>
                                </div>

                                {/* category */}
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="current">Category</Label>
                                    <NativeSelect>
                                        <NativeSelectOption value="">category</NativeSelectOption>
                                        <NativeSelectOption value="working">Software Engineer</NativeSelectOption>
                                        <NativeSelectOption value="todo">Freelance</NativeSelectOption>
                                    </NativeSelect>
                                </div>

                            </div>

                            <div className="@container w-full grid grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="responsibilities">Responsibilities</Label>
                                    <Textarea placeholder="Your role responsiblity." id="responsiblities" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="message">Achievement</Label>
                                    <Textarea placeholder="Achievements of your role." id="achievement" />
                                </div>
                            </div>
                            <TechnologiesField
                                value={technologies}
                                onChange={setTechnologies}
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
