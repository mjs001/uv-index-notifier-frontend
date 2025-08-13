"use client";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import "./styles/layout-components.css";

export default function Home() {
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
		document.body.style.backgroundColor = "white";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);


	if (!hydrated) {
		return null;
	}

	return (
		<div
			className="flex flex-col justify-center items-center"
			role="presentation"
		>
			<div className="yellowBackgroundContainer flex flex-col items-center">
				<div className="square"></div>
				<div className="blurredHalfCircle"></div>
			</div>
			<p className="font-roboto font-bold mt-10 text-[#264653] text-center">
				Enter your location to see what time of day the UV index is at or below 1.
			</p>
			{hydrated ? <SearchBar /> : <div>Loading...</div>}
		</div>
	);
}

