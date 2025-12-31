import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { setEndCell, setStartCell, updateGrid } from "./../redux/slices/grid";
import { getGridCopy, serializeGrid } from "./../utils/grid";
import { invalidCellAction } from "../utils/helpers";
import Cell from "./Cell";

function Grid() {
	const dispatch = useDispatch();
	const { grid, isStartCell, isEndCell } = useSelector(
		state => state.gridSlice
	);
	const { isAnimation } = useSelector(state => state.interface);
	const [visualGrid, setVisualGrid] = useState(getGridCopy(grid));
	const [mouseEvent, setMouseEvent] = React.useState({
		isPressed: false,
		button: null,
	});

	const handleMouseDown = (e, row, col) => {
		if (isAnimation) return;
		const buttonType = e.button === 0 ? 1 : e.button === 2 ? 2 : null;
		setMouseEvent({ isPressed: true, button: buttonType });
		if (!buttonType) return;

		const gridCopy = getGridCopy(visualGrid);
		const cell = gridCopy[row][col];

		if (buttonType === 1) {
			cell.updateType(isStartCell, isEndCell);
			if (!cell.isWall && !isStartCell) {
				dispatch(
					setStartCell({ isStartCell: true, startCell: { row: row, col: col } })
				);
			}
			if (!cell.isWall && isStartCell && !isEndCell) {
				dispatch(
					setEndCell({ isEndCell: true, endCell: { row: row, col: col } })
				);
			}
		} else if (buttonType === 2) {
			cell.isStart ? dispatch(setStartCell({ isStartCell: false })) : null;
			cell.isEnd ? dispatch(setEndCell({ isEndCell: false })) : null;
			cell.makeEmpty();
		}

		setVisualGrid(serializeGrid(gridCopy));
	};

	const handleMouseUp = () => {
		dispatch(updateGrid(visualGrid));
		setMouseEvent(prev => ({ ...prev, isPressed: false }));
	};

	const handleMouseEnter = (e, row, col) => {
		if (
			isAnimation ||
			!mouseEvent.isPressed ||
			invalidCellAction(visualGrid[row][col], mouseEvent.button)
		)
			return;
		const gridCopy = getGridCopy(visualGrid);
		const cell = gridCopy[row][col];

		if (
			mouseEvent.button === 1 &&
			!e.target.classList.contains("isAnimation")
		) {
			cell.updateType(isStartCell, isEndCell);
			if (!isStartCell) {
				dispatch(
					setStartCell({ isStartCell: true, startCell: { row: row, col: col } })
				);
			}
			if (isStartCell && !isEndCell) {
				dispatch(
					setEndCell({ isEndCell: true, endCell: { row: row, col: col } })
				);
			}
		} else if (mouseEvent.button === 2) {
			cell.isStart ? dispatch(setStartCell({ isStartCell: false })) : null;
			cell.isEnd ? dispatch(setEndCell({ isEndCell: false })) : null;
			cell.makeEmpty();
		}
		setVisualGrid(serializeGrid(gridCopy));
	};

	React.useEffect(() => {
		const handleContextMenu = e => e.preventDefault();

		document.addEventListener("contextmenu", handleContextMenu);

		return () => document.removeEventListener("contextmenu", handleContextMenu);
	}, []);

	React.useEffect(() => {
		setVisualGrid(grid);
	}, [grid]);

	return (
		<div
			className="my-6 flex flex-col justify-center items-center border-blue-800 border-2 w-fit"
			onMouseLeave={() => {
				if (mouseEvent.isPressed) {
					dispatch(updateGrid(visualGrid));
					setMouseEvent(prev => ({ ...prev, isPressed: false }));
				}
			}}
		>
			{visualGrid.map((row, rowIndex) => (
				<div key={rowIndex} className="flex">
					{row.map((cell, columnIndex) => (
						<Cell
							key={`${rowIndex}:${columnIndex}`}
							cell={cell}
							rowIndex={rowIndex}
							columnIndex={columnIndex}
							handleMouseDown={handleMouseDown}
							handleMouseUp={handleMouseUp}
							handleMouseEnter={handleMouseEnter}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default Grid;
