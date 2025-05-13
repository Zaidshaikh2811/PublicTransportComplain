"use client"

import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

import { saveComplaint } from '@/actions/complaint';


const Page = () => {
    const [formData, setFormData] = useState({
        transportMode: '',
        issueType: 'bus-delay',
        vehicleNumber: '',
        location: '',
        dateOfIncident: '',
        description: '',
        isAnonymous: false,
        contactName: '',
        contactInfo: '',
        mediaFiles: [] as File[]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setFormData(prev => ({
                ...prev,
                mediaFiles: filesArray
            }));
        }
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            isAnonymous: checked
        }));
    };

    const handleTransportModeSelect = (mode: string) => {
        setFormData(prev => ({
            ...prev,
            transportMode: mode
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess(false);

        try {
            const {
                transportMode,

                vehicleNumber,
                location,
                dateOfIncident,
                description,
                isAnonymous,
                contactName,
                contactInfo,
                mediaFiles
            } = formData;


            // Client-side validation
            if (!transportMode || !vehicleNumber || !location || !dateOfIncident || !description) {
                throw new Error('Please fill in all required fields');
            }

            if (!isAnonymous) {
                if (!contactName || !contactInfo) {
                    throw new Error('Contact name and info are required');
                }

                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo);
                const isPhone = /^\d{10}$/.test(contactInfo);

                if (!isEmail && !isPhone) {
                    throw new Error('Contact info must be a valid email or phone number');
                }
            }

            // Optional: validate files (e.g. size/type)
            for (const file of mediaFiles) {
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error('File size must be under 5MB');
                }
            }



            // Send to server
            const response = await saveComplaint(formData);

            if (!response.success) {
                throw new Error(response.error || 'Failed to submit complaint');
            }

            setSuccess(true);
            toast.success('Complaint submitted successfully');

            // Reset form
            setFormData({
                transportMode: '',
                issueType: 'bus-delay',
                vehicleNumber: '',
                location: '',
                dateOfIncident: '',
                description: '',
                isAnonymous: false,
                contactName: '',
                contactInfo: '',
                mediaFiles: []
            });

        } catch (err) {
            console.error('Submission error:', err);
            setError(err instanceof Error ? err.message : 'Something went wrong');
            toast.error(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Transport Feedback Form</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            Complaint submitted successfully!
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Transport Mode */}
                        <div className="mb-4">
                            <Label className="mb-1 block">Select Transport Mode*</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        {formData.transportMode || 'Choose Mode'}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {['Bus', 'Train', 'Metro', 'Other'].map((mode) => (
                                        <DropdownMenuItem
                                            key={mode}
                                            onSelect={() => handleTransportModeSelect(mode)}
                                        >
                                            {mode}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Issue Types */}
                        <div className="mb-4">
                            <Label className="mb-2 block">Select Issue*</Label>
                            <RadioGroup
                                value={formData.issueType}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, issueType: value }))}
                                className="grid sm:grid-cols-2 gap-2"
                            >
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
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="vehicle-number">Vehicle/Route Number*</Label>
                                <Input
                                    id="vehicle-number"
                                    name="vehicleNumber"
                                    value={formData.vehicleNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter vehicle number or route"
                                    required
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="location">Location of Issue*</Label>
                                <Textarea
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="Where did this happen?"
                                    required
                                />
                            </div>
                        </div>

                        {/* Date Picker & Description */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="date">Date of Incident*</Label>
                                <input
                                    type="date"
                                    id="date"
                                    name="dateOfIncident"
                                    value={formData.dateOfIncident}
                                    onChange={handleInputChange}
                                    className='border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2'
                                    required
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="description">Description*</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Provide details of the issue"
                                    required
                                />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="grid gap-1.5 mb-4">
                            <Label htmlFor="upload">Upload Image/Video</Label>
                            {/* <Input
                                id="upload"
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                            /> */}
                            <Input
                                id="media-upload"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {formData.mediaFiles.length > 0 && (
                                <div className="text-sm text-gray-500 mt-2">
                                    <p>Selected files:</p>
                                    <ul className="list-disc pl-5">
                                        {formData.mediaFiles.map((file, index) => (
                                            <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Toggle Switch */}
                        <div className="flex items-center space-x-3 mb-4">
                            <Switch
                                id="anonymous"
                                checked={formData.isAnonymous}
                                onCheckedChange={handleSwitchChange}
                            />
                            <Label htmlFor="anonymous">Submit Anonymously</Label>
                        </div>

                        {/* Contact Info */}
                        {!formData.isAnonymous && (
                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="contact-name">Contact Name</Label>
                                    <Input
                                        id="contact-name"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleInputChange}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="contact-info">Email  </Label>
                                    <Input
                                        type='email'
                                        id="contact-info"
                                        name="contactInfo"
                                        value={formData.contactInfo}
                                        onChange={handleInputChange}
                                        placeholder="Email or Phone Number"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;