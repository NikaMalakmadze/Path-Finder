import { useDispatch, useSelector } from "react-redux";

import { clearGrid } from "../../redux/slices/grid";
import { twMerge } from "tailwind-merge";
import { clearAnalytics } from "../../redux/slices/analytics";

function ClearGrid() {
	const { isClear } = useSelector(state => state.gridSlice);
	const { isAnimation } = useSelector(state => state.interface);
	const dispatch = useDispatch();

	return (
		<button
			className={twMerge(
				"px-3 py-2 flex items-center justify-center",
				"border-2 border-cyan-700 rounded-md text-blue-50 shadow",
				"text-neutral-800 font-medium",
				"hover:bg-neutral-50 hover:text-neutral-700 transition-colors",
				isAnimation ? "cursor-default" : "cursor-pointer"
			)}
			onClick={() => {
				if (!isClear && !isAnimation) {
					dispatch(clearAnalytics());
					dispatch(clearGrid());
				}
			}}
		>
			Clear 🧹
		</button>
	);
}

export default ClearGrid;
