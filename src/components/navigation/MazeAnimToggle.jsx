import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import { setIsMazeAnimation } from "../../redux/slices/interface";

function MazeAnimToggle() {
	const dispatch = useDispatch();
	const { isMazeAnimation } = useSelector(state => state.interface);

	return (
		<div
			className={twMerge(
				"w-[40px] flex justify-center items-center border-2 border-cyan-700 rounded-md select-none text-center relative transition-colors",
				isMazeAnimation ? "bg-gray-700" : "bg-gray-400"
			)}
		>
			<input
				className="w-full h-full appearance-none outline-0 scale-100"
				type="checkbox"
				value={isMazeAnimation}
				onChange={() => {
					dispatch(setIsMazeAnimation(!isMazeAnimation));
				}}
			/>
			<span
				className={twMerge(
					"absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none transition-colors",
					isMazeAnimation ? "text-neutral-100" : "text-neutral-800"
				)}
			>
				{isMazeAnimation ? "On" : "Off"}
			</span>
		</div>
	);
}

export default MazeAnimToggle;
