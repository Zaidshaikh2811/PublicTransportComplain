"use client";

import { motion } from "framer-motion";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<{ success?: boolean; error?: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setResponse({ success: true });
                setFormData({ name: "", email: "", subject: "", message: "" });
                toast.success("Message sent successfully.");
            } else {
                toast.error(data.error || "Failed to send message.");
                setResponse({ error: data.error || "Failed to send message." });
            }
        } catch {
            toast.error("Something went wrong.");
            setResponse({ error: "Something went wrong." });
        } finally {
            setLoading(false);
        }
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const slideUp = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="container mx-auto min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="container py-12 px-4 sm:px-6 lg:px-8">
                {/* Theme Toggle */}


                {/* Hero Section */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="text-center mb-16"
                >
                    <motion.h1
                        variants={slideUp}
                        className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                    >
                        Contact Us
                    </motion.h1>

                    <motion.p
                        variants={slideUp}
                        className="text-lg text-muted-foreground max-w-3xl mx-auto"
                    >
                        Have questions or feedback? We&#39;d love to hear from you.
                    </motion.p>
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl">Send us a message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                                Name
                                            </label>
                                            <Input id="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                                Email
                                            </label>
                                            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                            Subject
                                        </label>
                                        <Input id="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                                            Message
                                        </label>
                                        <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Your message" rows={5} />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? "Sending..." : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                    {response?.success && (
                                        <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>
                                    )}
                                    {response?.error && (
                                        <p className="text-red-600 text-sm mt-2">{response.error}</p>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-6"
                    >
                        <motion.div variants={slideUp}>
                            <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Email</h3>
                                            <p className="text-muted-foreground">support@transportapp.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <Phone className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Phone</h3>
                                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Office</h3>
                                            <p className="text-muted-foreground">
                                                123 Transit Ave<br />
                                                Metro City, MC 10001
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={slideUp}>
                            <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Business Hours</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Monday - Friday</span>
                                            <span className="font-medium">9:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Saturday</span>
                                            <span className="font-medium">10:00 AM - 4:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Sunday</span>
                                            <span className="font-medium">Closed</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}