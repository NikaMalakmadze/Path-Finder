import { useSelector } from "react-redux";

import { MAZE_ALGORITHMS, PATH_FINDER_ALGORITHMS } from "../../utils/constants";
import MazeAnimToggle from "./MazeAnimToggle";
import DropDown from "../dropdown/DropDown";
import GenerateMaze from "./GenerateMaze";
import ClearGrid from "./ClearGrid";
import FindPath from "./FindPath";
import {
	setCurrentMazeAlgorithm,
	setCurrentPathAlgorithm,
} from "../../redux/slices/interface";

function Navigation() {
	const { currentMazeAlgorithm, currentPathAlgorithm } = useSelector(
		state => state.interface
	);

	return (
		<div className="w-full flex justify-center gap-8 py-4 bg-gray-200 border-b-2 border-b-gray-300">
			<ClearGrid />
			<div className="flex gap-7">
				<DropDown
					id="maze-algorithms"
					currentValue={currentMazeAlgorithm}
					values={MAZE_ALGORITHMS}
					setCurrent={setCurrentMazeAlgorithm}
				/>
				<DropDown
					id="path-algorithms"
					currentValue={currentPathAlgorithm}
					values={PATH_FINDER_ALGORITHMS}
					setCurrent={setCurrentPathAlgorithm}
				/>
				<MazeAnimToggle />
				<GenerateMaze />
			</div>
			<FindPath />
		</div>
	);
}

export default Navigation;
