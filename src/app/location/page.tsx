
import "../styles/layout-components.css";
import HomeLink from "../components/HomeLink"
import UvIndexContainer from "../components/UvIndexContainer";
export default async function Location() {
	return (
		<div className="flex flex-col justify-between items-center">
			<div className="background"></div>
			<HomeLink />
			<UvIndexContainer />
		</div>
	);
}
