"use client";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "flowbite-react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";

export default function CookieModal({
	openModal,
	openModalChange,
	address,
}: {
	openModal: boolean;
	openModalChange: React.Dispatch<React.SetStateAction<boolean>>;
	address: string | undefined;
}) {
	const handleAccept = () => {
		redirect("/location");
	};

	const handleDecline = () => {
		Cookies.remove("locationData");
		openModalChange(false);
	};
	console.log("address in modal", address);

	return (
		<Modal show={openModal} onClose={() => openModalChange(false)}>
			<ModalHeader>Terms of Service</ModalHeader>
			<ModalBody>
				<div className="space-y-6">
					<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						{`You previously entered "${address}". Would you like the UV index data for that same location?`}
					</p>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button onClick={handleAccept}>Yes</Button>
				<Button color="alternative" onClick={handleDecline}>
					No
				</Button>
			</ModalFooter>
		</Modal>
	);
}
