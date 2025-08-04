"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function HomeLink() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const clearLocationCookie = () => {
        if (hydrated) {
            Cookies.remove("locationData");
        }
    }

    return (
        <Link href="/" onClick={clearLocationCookie} className="mt-3 mb-5 underline text-[#264653] hover:text-[#A6979C]">
            &larr; Home
        </Link>
    )
}