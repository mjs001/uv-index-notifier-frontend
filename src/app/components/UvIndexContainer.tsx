"use client"
import "../styles/location.css";
import CurrentUvIndex from "./CurrentUvIndex";
import { flaskData } from "../types/flaskData"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UvTimeBlocks from "./UvTimeBlocks";
export default function UvIndexContainer({ data }: { data: flaskData }) {
	const [hydrated, setHydrated] = useState(false);
	const [location, setLocation] = useState("");

	useEffect(() => {
		setHydrated(true);
	}, []);

	useEffect(() => {
		const locationData = Cookies.get("locationData");
		if (locationData) {
			try {
				const parsedData = JSON.parse(locationData);
				if (parsedData?.data?.address) {
					setLocation(parsedData.data.address);
				}
			} catch (error) {
				console.error("Error parsing location data from cookie:", error);
				Cookies.remove("locationData");
			}
		}
	}, [hydrated]);

	if (!data || typeof data.current_uv_index !== 'number' || !Array.isArray(data.uv_index_forecast)) {
		return <div className="text-center text-red-500">Error: Invalid data received</div>;
	}

	const currentDate = data.current_date || "N/A";
	const currentTime = data.current_time || "N/A";
	const uvIndex = data.current_uv_index;
	const uvIndexForecast = data.uv_index_forecast;

	return (
		<div className="container flex flex-col self-center w-[98vw] sm:w-[80vw] mb-3 sm:mb-0">

			<div className="flex flex-col self-center w-[90%] pb-2 sm:pb-0">
				<div className="top-container">
					<div className=" flex flex-col md:flex-row pb-4 justify-center items-center md:justify-normal">
						<CurrentUvIndex uvIndex={uvIndex} />
						<div className="flex flex-col mt-3 items-center flex-1 flex-wrap ">
							<h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">{location}</h1>
							<div className="flex sm:flex-row flex-col text-lg md:text-xl lg:text-2xl mt-2 flex-wrap items-center"><h2 className="sm:mr-2 text-center">{currentDate}</h2><h2 className="text-center">{currentTime}</h2></div>
						</div>
					</div>
					<div className="bottomBox flex items-center justify-center md:text-2xl text-lg text-center"><h1>UV index remains 1 or below between:</h1></div>
				</div>
				<UvTimeBlocks uvTimeData={uvIndexForecast} />
			</div>

		</div >
	);
}
