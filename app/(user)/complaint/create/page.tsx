import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: " Create Complaint",
    description: " Report a problem. We'll get back to you.",
};

const Page = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Transport Feedback Form</h2>

                    {/* Transport Mode */}
                    <div>
                        <Label className="mb-1 block">Select Transport Mode</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full">Choose Mode</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Bus</DropdownMenuItem>
                                <DropdownMenuItem>Train</DropdownMenuItem>
                                <DropdownMenuItem>Metro</DropdownMenuItem>
                                <DropdownMenuItem>Other</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Issue Types */}
                    <div>
                        <Label className="mb-2 block">Select Issue</Label>
                        <RadioGroup defaultValue="bus-delay" className="grid sm:grid-cols-2 gap-2">
                            {[
                                { value: "bus-delay", label: "Bus Delay" },
                                { value: "overcrowding", label: "Overcrowding" },
                                { value: "rude-staff", label: "Rude Staff" },
                                { value: "unclean-vehicle", label: "Unclean Vehicle" },
                                { value: "faulty-ac", label: "Faulty AC" },
                                { value: "other", label: "Other" },
                            ].map((item) => (
                                <div key={item.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={item.value} id={item.value} />
                                    <Label htmlFor={item.value}>{item.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* Vehicle Number & Location */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="vehicle-number">Vehicle/Route Number</Label>
                            <Input id="vehicle-number" placeholder="Enter vehicle number or route" />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="location">Location of Issue</Label>
                            <Textarea id="location" placeholder="Where did this happen?" />
                        </div>
                    </div>

                    {/* Date Picker & Description */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="date">Date of Incident</Label>
                            {/* <DatePickerDemo /> */}
                            <input type="date" className='border   border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-0.5 ' />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Provide details of the issue" />
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="upload">Upload Image/Video</Label>
                        <Input id="upload" type="file" />
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center space-x-3">
                        <Switch id="anonymous" />
                        <Label htmlFor="anonymous">Submit Anonymously</Label>
                    </div>

                    {/* Contact Info */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="contact-name">Contact Name</Label>
                            <Input id="contact-name" placeholder="Your Name" />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="contact-info">Email / Phone</Label>
                            <Input id="contact-info" placeholder="Email or Phone Number" />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <Button className="w-full sm:w-auto">Submit Feedback</Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default Page
