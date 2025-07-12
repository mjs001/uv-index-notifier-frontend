"use client";
import SearchBar from "./components/SearchBar";
import { useEffect } from "react";
import "./styles/layout-components.css";
export default function Home() {
	useEffect(() => {
		document.body.style.backgroundColor = "white";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);

	return (
		<div
			className="flex flex-col justify-center items-center"
			role="presentation" suppressHydrationWarning
		>
			<div className="yellowBackgroundContainer flex flex-col items-center">
				<div className="square"></div>
				<div className="blurredHalfCircle"></div>
			</div>
			<p className="font-roboto font-bold mt-10 text-[#264653] text-center">
				Enter your location to see what time of day the UV index is below 1.
			</p>
			<SearchBar />
		</div>
	);
}
