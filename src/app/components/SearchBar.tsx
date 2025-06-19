"use client";
import { useState, useEffect } from "react";
import { TextInput, Button } from "flowbite-react";
import axios from "axios";
import "../styles/home.css";
import { getAddressData } from "../data/actions/getAddressData";
import { useActionState } from "react";
import Cookies from "js-cookie";
import Spinner from "./Spinner";
import CookieModal from "./CookieModal";
import { redirect } from "next/navigation";
const initialState = {
	error: "",
	data: { address: "", lon: "", lat: "" },
	cookie: false,
};

export default function SearchBar() {
	const [state, formAction] = useActionState(getAddressData, initialState);
	const [openModal, setOpenModal] = useState(false);
	const [hasCookie, setHasCookie] = useState(false);
	const [cookie, setCookie] = useState({ address: "", lon: "", lat: "" });
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
		if (Cookies.get("locationData") !== undefined) {
			setHasCookie(true);
			setOpenModal(true);
		} else {
			setHasCookie(false);
		}
	}, []);

	useEffect(() => {
		if (hydrated && state.data && state.data.address) {
			Cookies.set("locationData", JSON.stringify(state.data), { expires: 14 });
			setCookie(state.data);
			if (!state.error) {
				redirect("/location")
			}
		}
	}, [state, hydrated]);

	return (
		<div>
			{!hydrated ? (
				<div className="mt-4">
					<Spinner />
				</div>
			) : (
				<>
					<CookieModal
						openModal={openModal}
						openModalChange={setOpenModal}
						address={cookie.address}
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
						<input
							type="hidden"
							value={hasCookie.toString()}
							name="hasCookie"
						/>
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
