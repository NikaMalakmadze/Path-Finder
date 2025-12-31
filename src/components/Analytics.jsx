import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";

function Analytics() {
	const { efficienty, pathFound, pathLengh, openCells, closedCells } =
		useSelector(state => state.analytics);

	return (
		<ul className="flex gap-2.5 items-center list-none">
			<li className="flex items-center">
				<span className="font-bold">Efficienty:</span>
				<Skeleton
					dataToShow={efficienty ? `${efficienty}%` : "No Info"}
					widthPx={28}
				/>
			</li>
			<li className="flex items-center">
				<span className="font-bold">Is Path:</span>
				<Skeleton dataToShow={pathFound ? "Yes" : "No"} widthPx={28} />
			</li>
			<li className="flex items-center">
				<span className="font-bold">Path Lengh:</span>
				<Skeleton dataToShow={pathFound ? pathLengh : "No Info"} widthPx={30} />
			</li>
			<li className="flex items-center">
				<span className="font-bold">Total Closed Cells:</span>
				<Skeleton dataToShow={closedCells} widthPx={40} />
			</li>
			<li className="flex items-center">
				<span className="font-bold">Total Open Cells:</span>
				<Skeleton dataToShow={openCells} widthPx={40} />
			</li>
		</ul>
	);
}

export default Analytics;
