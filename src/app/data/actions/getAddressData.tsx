import axios from "axios";
import formatSearch from "../../utilities/formatInputData";
import { redirect } from "next/navigation";
import { locationData } from "../../types/locationData";
import { redirect } from "next/navigation";
export async function getAddressData(
	prevState: locationData,
	formData: FormData
): Promise<locationData> {
	if (String(formData.get("hasCookie")) === "true") {
		return { error: "", data: { address: "", lon: "", lat: "" }, cookie: true };
	}
	//let data = { address: "", lon: "", lat: "" };
	let data = { address: "Smiths Grove, KY", lon: "86.2078", lat: "37.0525" };
	let error = "";
	const location = String(formData.get("location"));
	const formattedInput = formatSearch(location);
	console.log(formattedInput, process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY);
	// const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${formattedInput}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;
	// axios
	// 	.get(url)
	// 	.then((res) => {
	// 		console.log(res.data);
	// 		if (res.data.results.length === 0) {
	// 			error = "Could not find a valid location. Please try again.";
	// 		} else {
	// 			const address = res.data.results[0].formatted;
	// 			const lon = res.data.results[0].lon;
	// 			const lat = res.data.results[0].lat;
	// 			data = {address: address, lon: lon, lat: lat};
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		error = err.message;
	// 	});
	const allData = { error: error, data: data, cookie: false };
	const environment = process.env.NODE_ENV;
	let domain = "";
	if (environment === "development") {
		domain = "http://localhost:3000";
	}
	axios
		.post(`${domain}/api/location`, allData)
		.then((res) => console.log(res))
		.catch((err) => console.error(err.message));

	return allData;
}
