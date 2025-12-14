"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            router.push("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className='flex  items-center justify-center p-4 gap-4'>
            <div>
                <Button variant='destructive' onClick={logout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}