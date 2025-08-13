"use server"
import axios from "axios";
import formatSearch from "../../utilities/formatInputData";
import { locationData } from "../../types/locationData";
import { getIP } from "@/app/utilities/getIP";
import { rateLimiter } from "../../utilities/rateLimiter"

export async function getAddressData(
	prevState: locationData,
	formData: FormData
): Promise<locationData> {
	let data = { address: "", lat: "", lon: "", timezone: "" };
	let error = "";
	try {
		await rateLimiter.consume((await getIP()).toString(), 1);
	} catch {
		error = "Too many requests";
		console.error("Too many requests")
	}

	try {
		const location = String(formData.get("location"));
		const formattedInput = formatSearch(location);

		const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${formattedInput}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;
		const res = await axios.get(url);

		if (res.data.results.length === 0) {
			error = "Could not find a valid location. Please try again.";
		} else {
			const address = res.data.results[0].formatted;
			const lon = res.data.results[0].lon;
			const lat = res.data.results[0].lat;
			const timezone = res.data.results[0].timezone.name;
			data = { address: address, lat: lat, lon: lon, timezone: timezone };
		}
	} catch (err) {
		console.error(err);
		error = err instanceof Error ? err.message : "An error occurred";
	}

	const allData = { error: error, data: data, cookie: false };

	return allData;
}
