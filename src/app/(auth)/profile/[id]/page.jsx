"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page(props) {
	const params = use(props.params);
	const router = useRouter();
	const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const res = await axios.get("/api/auth/profile");
				setProfileData(res.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
				router.push("/profile");
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchProfileData();
		}
	}, [params.id, router]);

	if (loading) {
		return <div className='container mx-auto p-4 text-center'>Loading...</div>;
	}

	if (!profileData) {
		return (
			<div className='container mx-auto p-4 text-center'>Profile not found</div>
		);
	}

	return (
		<div className='container mx-auto p-4'>
			<div className='max-w-md mx-auto rounded-lg shadow-md p-6'>
				<h1 className='text-2xl font-bold mb-4'>Profile Details</h1>
				<div className='space-y-3'>
					<p>
						<span className='font-semibold'>User ID:</span> {profileData._id}
					</p>
					<p>
						<span className='font-semibold'>Username:</span>{" "}
						{profileData.username}
					</p>
					<p>
						<span className='font-semibold'>Email:</span> {profileData.email}
					</p>
					<p>
						<span className='font-semibold'>Role:</span>{" "}
						{profileData.isAdmin ? "Admin" : "User"}
					</p>
				</div>
				<div className='mt-6'>
					<Button onClick={() => router.push("/")}>Back to Profile</Button>
				</div>
			</div>
		</div>
	);
}