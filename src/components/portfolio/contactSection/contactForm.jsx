import React from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
// import { useState, useTransition } from "react";
export default function ContactForm() {
    // const [isPending, startTransition] = useTransition();
    // const [status, setStatus] = useState<{
    //     type: "success" | "error" | null;
    //     message: string;
    // }>({ type: null, message: "" });
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e);
    //
    //     startTransition(async () => {
    //         const result = await submitContactForm(formData);
    //
    //         if (result.success) {
    //             setStatus({
    //                 type: "success",
    //                 message: "Thank you! Your message has been sent successfully.",
    //             });
    //             // Reset the form
    //             (e).reset();
    //             // Clear success message after 5 seconds
    //             setTimeout(() => {
    //                 setStatus({ type: null, message: "" });
    //             }, 5000);
    //         } else {
    //             setStatus({
    //                 type: "error",
    //                 message: result.error || "Something went wrong. Please try again.",
    //             });
    //         }
    //     });
    // };
    return (
        <div className="@container/form bg-card border rounded-lg p-4 @md/form:p-6">
            <h3 className="text-xl @md/form:text-2xl font-semibold mb-6">
                Send a Message
            </h3>

            {/*{status.type && (*/}
            {/*    <div*/}
            {/*        className={`mb-4 p-3 rounded-lg text-sm ${*/}
            {/*            status.type === "success"*/}
            {/*                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"*/}
            {/*                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"*/}
            {/*        }`}*/}
            {/*    >*/}
            {/*        {status.message}*/}
            {/*    </div>*/}
            {/*)}*/}

            <form className="space-y-3 @md/form:space-y-4"
                  // onSubmit={handleSubmit}
            >
                <div>
                    <Label
                        htmlFor="name"
                        className="block text-xs @md/form:text-sm font-medium mb-2"
                    >
                        Name
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm @md/form:text-base"
                        placeholder="Your name"
                        required
                    />
                </div>

                <div>
                    <Label
                        htmlFor="email"
                        className="block text-xs @md/form:text-sm font-medium mb-2"
                    >
                        Email
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm @md/form:text-base"
                        placeholder="your.email@example.com"

                        required
                    />
                </div>

                <div>
                    <Label
                        htmlFor="subject"
                        className="block text-xs @md/form:text-sm font-medium mb-2"
                    >
                        Subject
                    </Label>
                    <Input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm @md/form:text-base"
                        placeholder="What's this about?"

                        required
                    />
                </div>

                <div>
                    <Label
                        htmlFor="message"
                        className="block text-xs @md/form:text-sm font-medium mb-2"
                    >
                        Message
                    </Label>
                    <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm @md/form:text-base"
                        placeholder="Tell me about your project..."

                        required
                    />
                </div>

                <Button
                    type="submit"
                    // disabled={isPending}
                    className="w-full px-4 py-2 @md/form:px-6 @md/form:py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm @md/form:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send Message
                    {/*{isPending ? "Sending..." : "Send Message"}*/}
                </Button>
            </form>
        </div>
    )
}