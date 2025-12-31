import { useDispatch, useSelector } from "react-redux";

import { MAZE_ALGORITHMS_FUNCS } from "../../utils/constants";
import { updateGrid } from "../../redux/slices/grid";
import { serializeGrid } from "../../utils/grid";
import { twMerge } from "tailwind-merge";
import { setIsAnimation } from "../../redux/slices/interface";
import { clearAnalytics } from "../../redux/slices/analytics";

function GenerateMaze() {
	const dispatch = useDispatch();
	const { currentMazeAlgorithm, isAnimation, isMazeAnimation } = useSelector(
		state => state.interface
	);
	const { grid } = useSelector(state => state.gridSlice);

	return (
		<button
			className={twMerge(
				"px-3 py-2 flex items-center justify-center",
				"border-2 border-cyan-700 rounded-md text-blue-50 shadow",
				"text-neutral-800 font-medium",
				"hover:bg-neutral-50 hover:text-neutral-700 transition-colors",
				isAnimation ? "cursor-default" : "cursor-pointer"
			)}
			onClick={async () => {
				if (isAnimation) return;
				isMazeAnimation ? dispatch(setIsAnimation(true)) : null;
				const mazeAlgorithm = MAZE_ALGORITHMS_FUNCS.get(currentMazeAlgorithm);
				const mazeGrid = await mazeAlgorithm(grid);
				dispatch(clearAnalytics());
				dispatch(updateGrid(serializeGrid(mazeGrid)));
				isMazeAnimation ? dispatch(setIsAnimation(false)) : null;
			}}
		>
			Maze It! 🌽
		</button>
	);
}

export default GenerateMaze;
