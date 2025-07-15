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
	data: { address: "", lat: "", lon: "" },
	cookie: false,
};

export default function SearchBar() {



	const [state, formAction] = useActionState(getAddressData, initialState);
	const [openModal, setOpenModal] = useState(false);
	const [cookie, setCookie] = useState({ address: "", lat: "", lon: "" });
	const [hydrated, setHydrated] = useState(false);
	const rawCookie = Cookies.get("locationData");
	const [address, setAddress] = useState(rawCookie ? JSON.parse(rawCookie).address : undefined)
	useEffect(() => {
		setHydrated(true);
		if (Cookies.get("locationData") !== undefined) {
			setOpenModal(true);
		}
	}, []);

	useEffect(() => {
		if (hydrated && state.data && state.data.address) {
			Cookies.set("locationData", JSON.stringify(state.data), { expires: 14 });
			setCookie(state.data);
			console.log("address", state.data.address)
			console.log("inside useeffect", state);
			if (!state.error) {
				redirect("/location");
			}
		}
	}, [state, hydrated]);

	return (
		<div suppressHydrationWarning>
			{!hydrated ? (
				<div className="mt-4">
					<p>Loading...</p>
				</div>
			) : (
				<>
					<CookieModal
						openModal={openModal}
						openModalChange={setOpenModal}
						address={address}
					/>
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
