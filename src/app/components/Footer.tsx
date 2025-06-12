import "../styles/layout-components.css";

export default function Footer() {
	return (
		<div className="w-full footer flex flex-row justify-center items-center">
			<p className="text-white">
				Created by Myco Davenport |{" "}
				<a
					className="text-gray underline"
					target="_blank"
					href="https://github.com/mjs001"
				>
					Github
				</a>{" "}
				|{" "}
				<a
					className="text-gray underline"
					target="_blank"
					href="https://github.com/mjs001/uv-index-notifier-frontend"
				>
					Repo
				</a>
			</p>
		</div>
	);
}
