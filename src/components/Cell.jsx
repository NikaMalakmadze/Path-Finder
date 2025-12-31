import { twMerge } from "tailwind-merge";

import {
	CLOSED_STYLE_STATIC,
	END_STYLE_STATIC,
	OPEN_STYLE_STATIC,
	PATH_STYLE_STATIC,
	ROWS,
	START_STYLE_STATIC,
	STYLES_TO_CLEAR,
	WALL_STYLE_STATIC,
} from "../utils/constants";

function Cell({
	cell,
	rowIndex,
	columnIndex,
	handleMouseDown,
	handleMouseUp,
	handleMouseEnter,
}) {
	const boderStyleBottom = rowIndex !== ROWS - 1 ? "border-b" : "";
	const borderStyleRight = columnIndex !== 0 ? "border-l" : "";

	return (
		<div
			className={twMerge(
				"w-[20px] h-[20px] flex justify-center items-center border-blue-800 bg-white",
				boderStyleBottom,
				borderStyleRight,
				cell.style
			)}
			id={`${rowIndex}-${columnIndex}`}
			onAnimationEnd={e => {
				const docCell = e.target;
				docCell.classList.remove("bg-white");

				if (e.animationName === "closedCellAnimation") {
					docCell.classList.remove(...STYLES_TO_CLEAR);
					docCell.classList.add(CLOSED_STYLE_STATIC);
					return;
				}

				if (e.animationName === "openCellAnimation") {
					docCell.classList.remove(...STYLES_TO_CLEAR);
					docCell.classList.add(OPEN_STYLE_STATIC);
					return;
				}

				if (e.animationName === "pathAnimation") {
					docCell.classList.remove(...STYLES_TO_CLEAR);
					docCell.classList.add(PATH_STYLE_STATIC);
					return;
				}

				cell.isStart
					? (docCell.className += ` ${START_STYLE_STATIC}`)
					: cell.isEnd
					? (docCell.className += ` ${END_STYLE_STATIC}`)
					: (docCell.className += ` ${WALL_STYLE_STATIC}`);
			}}
			onMouseDown={e => handleMouseDown(e, rowIndex, columnIndex)}
			onMouseUp={handleMouseUp}
			onMouseEnter={e => handleMouseEnter(e, rowIndex, columnIndex)}
		></div>
	);
}

export default Cell;
