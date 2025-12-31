import {
	createWallAnimation,
	createWall,
	destroyWall,
	flipCoin,
} from "./../../utils/maze";
import isMazeAnimationSelector from "../../redux/selectors/isMazeAnimationSelector";
import rowsColsSelector from "./../../redux/selectors/rowsColsSelector";
import { isStartOrEnd, sleep } from "./../../utils/helpers";
import { getGridCopy } from "./../../utils/grid";

export async function binaryMaze(grid) {
	const { rows, columns } = rowsColsSelector();
	const isMazeAnimation = isMazeAnimationSelector();

	const mazeCopy = getGridCopy(grid);
	let delay = 0.003;

	if (isMazeAnimation) {
		await createWallAnimation(mazeCopy, delay);
		await sleep(900);
	}

	createWall(mazeCopy);

	for (let row = 1; row < rows - 1; row += 2) {
		for (let col = 1; col < columns - 1; col += 2) {
			if ((row === rows - 2 && col > 1) || (col === columns - 2 && row > 1)) {
				const cellVertical = mazeCopy[row][col - 1];
				if (isStartOrEnd(cellVertical)) continue;
				isMazeAnimation
					? await destroyWall(cellVertical, col - 1, delay)
					: null;
				cellVertical.makeEmpty();

				const cellHorizontal = mazeCopy[row - 1][col];
				if (isStartOrEnd(cellHorizontal)) continue;
				isMazeAnimation ? await destroyWall(cellHorizontal, col, delay) : null;
				cellHorizontal.makeEmpty();

				continue;
			}

			if ((row === 1 && col === columns - 2) || (row === rows - 2 && col === 1))
				continue;

			let [rowToDestroy, colToDestroy] = [row, col];
			flipCoin() ? rowToDestroy++ : colToDestroy++;

			const cell = mazeCopy[rowToDestroy][colToDestroy];
			if (isStartOrEnd(cell)) continue;
			isMazeAnimation ? await destroyWall(cell, colToDestroy, delay) : null;
			cell.makeEmpty();
		}
	}

	return mazeCopy;
}
