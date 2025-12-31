import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import { setOpenClosedCells, setPath } from "../../redux/slices/analytics";
import { PATH_FINDER_ALGORITHMS_FUNCS } from "../../utils/constants";
import { setIsAnimation } from "../../redux/slices/interface";
import { updateGrid } from "../../redux/slices/grid";
import { serializeGrid } from "../../utils/grid";

function FindPath() {
	const { grid, isStartCell, isEndCell } = useSelector(
		state => state.gridSlice
	);
	const { currentPathAlgorithm, isAnimation } = useSelector(
		state => state.interface
	);
	const dispatch = useDispatch();

	return (
		<button
			className={twMerge(
				"px-3 py-2 flex items-center justify-center",
				"border-2 border-cyan-700 rounded-md text-blue-50 shadow",
				"text-neutral-800 font-medium",
				"hover:bg-neutral-50 hover:text-neutral-700 transition-colors",
				!isAnimation && (!isStartCell || !isEndCell)
					? "cursor-default"
					: "cursor-pointer"
			)}
			onClick={async () => {
				if (!isStartCell || !isEndCell || isAnimation) return;
				dispatch(setIsAnimation(true));
				const pathAlgorithm =
					PATH_FINDER_ALGORITHMS_FUNCS.get(currentPathAlgorithm);
				const [pathGrid, pathLengh, openCells, closedCells, iterations] =
					await pathAlgorithm(grid);
				dispatch(setIsAnimation(false));
				dispatch(updateGrid(serializeGrid(pathGrid)));
				dispatch(setOpenClosedCells({ openCells, closedCells }));
				dispatch(setPath({ pathLengh, iterations }));
			}}
		>
			Find Path 🐍
		</button>
	);
}

export default FindPath;
