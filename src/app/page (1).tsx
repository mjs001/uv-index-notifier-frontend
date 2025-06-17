import SearchBar from "./components/SearchBar";

export default function Home() {
	return (
		<div
			className="flex flex-col justify-center items-center"
			role="presentation"
		>
			<p className="font-roboto font-bold mt-10 text-[#264653]">
				Enter your location to see what time of day the UV index is below 1.
			</p>
			<SearchBar />
		</div>
	);
}
