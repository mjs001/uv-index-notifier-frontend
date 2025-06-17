"use client";
import { useState } from "react";
import { TextInput, Button } from "flowbite-react";
import "../styles/home.css";
export default function SearchBar() {
	const [location, setLocation] = useState("");
	const handleSubmit = (e) => {};
	return (
		<div>
			<form
				className="relative searchForm justify-center items-center flex mt-20 shadow-md"
				onSubmit={(e) => handleSubmit(e)}
			>
				<TextInput
					className="h-[40px] w-[70vw]"
					placeholder="Enter your location..."
				/>
				<Button className="searchButton bg-[#A6979C]" type="submit">
					Search
				</Button>
			</form>
		</div>
	);
}
