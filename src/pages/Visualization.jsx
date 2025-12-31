import Navigation from "../components/navigation/Navigation";
import Analytics from "../components/Analytics";
import Grid from "../components/grid";

function Visualization() {
	return (
		<div className="h-fit pb-6 flex flex-col items-center bg-neutral-100">
			<Navigation />
			<Grid />
			<Analytics />
		</div>
	);
}

export default Visualization;
