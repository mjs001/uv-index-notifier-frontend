"use client";
import { useState, useEffect } from "react";
import { TextInput, Button } from "flowbite-react";
import "../styles/home.css";
import { getAddressData } from "../data/actions/getAddressData";
import { useActionState } from "react";
import Cookies from "js-cookie";
import CookieModal from "./CookieModal";
import { redirect } from "next/navigation";

const initialState = {
	error: "",
	data: { address: "", lat: "", lon: "", timezone: "" },
	cookie: false,
};

export default function SearchBar() {
	const [state, formAction] = useActionState(getAddressData, initialState);
	const [openModal, setOpenModal] = useState(false);
	const [hydrated, setHydrated] = useState(false);
	const [address, setAddress] = useState<string | undefined>(undefined);

	// Only set address and openModal after hydration
	useEffect(() => {
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (hydrated) {
			const locationData = Cookies.get("locationData");
			if (locationData) {
				try {
					const parsedData = JSON.parse(locationData);
					if (parsedData?.data?.address) {
						setAddress(parsedData.data.address);
						setOpenModal(true);
					}
				} catch (error) {
					console.error("Error parsing location data from cookie:", error);
				}
			}
		}
	}, [hydrated]);

	useEffect(() => {
		if (hydrated && state.data && state.data.address) {
			Cookies.set("locationData", JSON.stringify(state), { expires: 14 });
			if (!state.error) {
				redirect("/location");
			}
		}
	}, [state, hydrated]);

	return (
		<div>
			{!hydrated ? (
				<div className="mt-4">
					<p>Loading...</p>
				</div>
			) : (
				<>
					{address && openModal && (
						<div>
							<CookieModal
								openModal={openModal}
								openModalChange={setOpenModal}
								address={address}
							/>
						</div>
					)}
					<div className="flex justify-center items-center">
						{state.error && (
							<p className="errorText mt-10 text-center">{state.error}</p>
						)}
					</div>
					<form
						className="relative searchForm flex justify-center items-center mt-20 shadow-md"
						action={formAction}
					>
						<TextInput
							className="h-[40px] w-[70vw]"
							placeholder="Enter your location..."
							name="location"
						/>
						<Button className="searchButton bg-[#A6979C]" type="submit">
							Search
						</Button>
					</form>
				</>
			)}
		</div>
	);
}