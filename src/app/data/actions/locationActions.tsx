"use server";
import axios from "axios";
import formatSearch from "./../../utilities/formatInputData";
export async function getFormattedAddress(formData: FormData) {
	let data = {};
	let error = "";
	const location = String(formData.get("location"));
	const formattedInput = formatSearch(location);
	console.log(formattedInput, process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY);
	const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${formattedInput}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;
	axios
		.get(url)
		.then((res) => {
			console.log(res.data);
			if (res.data.results.length === 0) {
				error = "Could not find a valid location. Please try again.";
			} else {
				const address = res.data.results[0].formatted;
				const lon = res.data.results[0].lon;
				const lat = res.data.results[0].lat;
				data = { address: address, lon: lon, lat: lat };
			}
		})
		.catch((err) => {
			console.log(err);
			error = err.message;
		});
	return [data, error];
}
