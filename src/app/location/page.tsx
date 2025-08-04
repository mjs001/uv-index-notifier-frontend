"use client"
import "../styles/layout-components.css";
import HomeLink from "../components/HomeLink"
import UvIndexContainer from "../components/UvIndexContainer";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getDomainForNextApp } from "../utilities/getDomain"
import { flaskData } from "../types/flaskData"

export default function Location() {
	const [data, setData] = useState<flaskData | null>(null);
	const [error, setError] = useState("");
	const [hydrated, setHydrated] = useState(false);
	const domain = getDomainForNextApp();

	useEffect(() => {
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (hydrated) {
			const locationData = Cookies.get("locationData");
			if (locationData) {
				axios
					.post(`${domain}/api/location`, JSON.parse(locationData))
					.then((res) => {
						setData(res.data);
						console.log("RETURN FROM FLASK", res.data);
					})
					.catch((err) => {
						console.error(err.message);
						setError(err.message);
					});
			}
		}
	}, [domain, hydrated]);

	return (
		<div className="flex flex-col justify-between items-center">
			<div className="background"></div>
			<HomeLink />
			{error ? (
				<p className="text-red-500">
					An error occurred while trying to retrieve the UV forecast data. {error}
				</p>
			) : null}
			{data ? (
				<UvIndexContainer data={data} />
			) : (
				<p>Loading UV data...</p>
			)}
		</div>
	);
}
