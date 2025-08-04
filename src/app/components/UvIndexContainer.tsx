import "../styles/location.css";
import CurrentUvIndex from "./CurrentUvIndex";
import { flaskData } from "../types/flaskData"
export default function UvIndexContainer({ data }: { data: flaskData }) {
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
