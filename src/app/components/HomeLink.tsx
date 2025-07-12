"use client";
import Link from "next/link";
import Cookies from "js-cookie";

export default function HomeLink() {

    const clearLocationCookie = () => {
        Cookies.remove("locationData");
    }

    return (
        <Link href="/" onClick={clearLocationCookie} className="mt-3 mb-5 underline text-[#264653] hover:text-[#A6979C]">
            &larr; Home
        </Link>
    )

}