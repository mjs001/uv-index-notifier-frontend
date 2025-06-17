"use client";
import { useState } from "react";
import { TextInput, Button } from "flowbite-react";
import axios from "axios";
import "../styles/home.css";
export default function SearchBar() {
	const [location, setLocation] = useState("");
	const [data, setData] = useState({ address: {}, lon: "", lat: "" });
	const [error, setError] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		const formattedInput = formatSearch(location);
		console.log(formattedInput, process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY);
		const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${formattedInput}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;
		axios
			.get(url)
			.then((res) => {
				console.log(res.data);
				if (res.data.results.length === 0) {
					setError("Could not find a valid location. Please try again.");
				} else {
					let address = res.data.results[0].formatted;
					let lon = res.data.results[0].lon;
					let lat = res.data.results[0].lat;
					setData({ address: address, lon: lon, lat: lat });
				}
			})
			.catch((err) => {
				console.log(err);
				setError(err.message);
			});
		setLocation("");
		//START HERE

		//NEED TO SEND DATA OVER TO /location and put the address in the url and need to make second request
	};

	
	return (
		<div>
			<div className="flex justify-center items-center">
				{error && <p className="errorText mt-10 text-center">{error}</p>}
			</div>
			<form
				className="relative searchForm flex justify-center items-center mt-20 shadow-md"
				onSubmit={(e) => handleSubmit(e)}
			>
				<TextInput
					className="h-[40px] w-[70vw]"
					placeholder="Enter your location..."
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				/>
				<Button className="searchButton bg-[#A6979C]" type="submit">
					Search
				</Button>
			</form>
		</div>
	);
}
