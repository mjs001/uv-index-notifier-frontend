import "../styles/location.css";
import CurrentUvIndex from "./CurrentUvIndex";

export default async function UvIndexContainer() {
	return (
		<>
			<div className="container flex flex-column justify-center self-center">
				<div className="top-container flex flex-row items-center">
					<CurrentUvIndex />
				</div>
			</div>

		</>
	);
}
