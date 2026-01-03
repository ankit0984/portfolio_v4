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
import {NativeSelect, NativeSelectOption} from "@/components/ui/native-select";
import {useState} from "react";



export default function PostEdu() {
    const [formData, setFormData] = useState({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        description: '',
        achievement: '',
        gpa: '',
        status: '',
        startDate: null,
        endDate: null,
    });

    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleDateChange = (field, date) => {
        setFormData(prev => ({ ...prev, [field]: date }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form Data:", formData);
    }

    return (

        <div
            className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Education post data</CardTitle>
                    <CardDescription>
                        Enter Education section data
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="education-form" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-1">
                                        <Label htmlFor="institution">Institution</Label>
                                        <span className="text-destructive font-bold">*</span>
                                    </div>

                                    <Input
                                        id="institution"
                                        type="text"
                                        placeholder="institution name"
                                        value={formData.institution}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-1">
                                        <Label htmlFor="degree">Degree</Label>
                                        <span className="text-destructive font-bold">*</span>
                                    </div>
                                    <Input
                                        id="degree"
                                        type="text"
                                        placeholder="B.tech"
                                        value={formData.degree}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-1">
                                        <Label htmlFor="fieldOfStudy">Field of Study</Label>
                                        <span className="text-destructive font-bold">*</span>
                                    </div>
                                    <Input
                                        id="fieldOfStudy"
                                        type="text"
                                        placeholder="specialization area"
                                        value={formData.fieldOfStudy}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-1">
                                        <Label htmlFor="description">Description</Label>
                                        <span className="text-destructive font-bold">*</span>
                                    </div>
                                    <Textarea
                                        placeholder="Short description about your study."
                                        id="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="achievement">Achievements</Label>
                                    <Textarea
                                        placeholder="Achievements of your academics."
                                        id="achievement"
                                        value={formData.achievement}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="gpa">CGPA</Label>
                                    <Input
                                        id="gpa"
                                        type="text"
                                        placeholder="Your academic CGPA"
                                        value={formData.gpa}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* calendar  start time and end time*/}
                            <div className="flex flex-wrap gap-6">
                                {/* Start Date Field */}
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="start_date" className="px-1">Start Date</Label>
                                    <Popover open={startOpen} onOpenChange={setStartOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-48 justify-between font-normal">
                                                {formData.startDate ? formData.startDate.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.startDate}
                                                onSelect={(d) => {
                                                    handleDateChange('startDate', d);
                                                    setStartOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* End Date Field */}
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="end_date" className="px-1">End Date</Label>
                                    <Popover open={endOpen} onOpenChange={setEndOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-48 justify-between font-normal"
                                                disabled={formData.status === 'pursuing'}
                                            >
                                                {formData.endDate ? formData.endDate.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.endDate}
                                                onSelect={(d) => {
                                                    handleDateChange('endDate', d);
                                                    setEndOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* current status */}
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="status">Current Status</Label>
                                    <NativeSelect id="status" value={formData.status} onChange={handleChange}>
                                        <NativeSelectOption value="">Select Status</NativeSelectOption>
                                        <NativeSelectOption value="pursuing">Pursuing</NativeSelectOption>
                                        <NativeSelectOption value="completed">Completed</NativeSelectOption>
                                    </NativeSelect>
                                </div>

                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" form="education-form" className="w-full">
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
