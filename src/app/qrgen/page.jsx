"use client";

import axios from "axios";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Page() {
    const [qrCode, setQrCode] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        axios.post("/api/auth/2fa/setup")
            .then(res => {
                console.log(res.data)
                    setQrCode(res.data.qr)
                setToken(res.data.secret)
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="flex flex-col item-center justify-items p-8 mt-6">
            2FA Setup Page
            {qrCode ? (
                <Image src={qrCode} width={250} height={150} alt="QR Code" />
            ) : (
                <p className="text-white">Generating QR Code...</p>
            )}
            {token && <h2 className="text-xl">{token}</h2>}
        </div>
    );
}
