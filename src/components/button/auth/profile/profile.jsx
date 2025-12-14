"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState} from "react";

export default function ProfileSection() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const viewProfile = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/auth/profile");
            const userId = res.data.data._id;
            router.push(`/profile/${userId}`);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center p-4 gap-4'>
            <div>
                <Button onClick={viewProfile} disabled={loading}>
                    {loading ? "Loading..." : "View Full Profile"}
                </Button>
            </div>
        </div>
    );
}