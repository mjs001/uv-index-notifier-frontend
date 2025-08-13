"use client";

import "../styles/layout-components.css";

export default function Footer() {
	return (
		<div className="w-full footer flex p-3 flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
			<span className="text-white ">Created by Myco Davenport</span>
			<div className="flex items-center gap-2">
				<a
					className="text-white underline"
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/mjs001"
				>
					Github
				</a>
				<span className="text-white ">|</span>
				<a
					className="text-white underline"
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/mjs001/uv-index-notifier-frontend"
				>
					Repo
				</a>
			</div>
		</div>
	);
}
