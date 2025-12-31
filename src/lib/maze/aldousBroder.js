import isMazeAnimationSelector from "../../redux/selectors/isMazeAnimationSelector";
import { createWall, createWallAnimation, destroyWall } from "../../utils/maze";
import rowsColsSelector from "../../redux/selectors/rowsColsSelector";
import { isStartOrEnd, sleep } from "../../utils/helpers";
import { getGridCopy } from "../../utils/grid";

function getRandomEmptyCell(emptyCellsArr) {
	return emptyCellsArr[Math.floor(Math.random() * emptyCellsArr.length)];
}

export async function aldousBroderMaze(grid) {
	const { rows, columns } = rowsColsSelector();
	const isMazeAnimation = isMazeAnimationSelector();

	const mazeCopy = getGridCopy(grid);
	let delay = 0.003;

	if (isMazeAnimation) {
		await createWallAnimation(mazeCopy, delay);
		await sleep(900);
	}

	createWall(mazeCopy);

	const totalEmptyCells = [];
	for (let row = 1; row < rows - 1; row += 2) {
		for (let col = 1; col < columns - 1; col += 2) {
			const emptyCell = mazeCopy[row][col];
			emptyCell.updateNeighbors(mazeCopy, true);
			totalEmptyCells.push(emptyCell);
		}
	}

	let currentCell = getRandomEmptyCell(totalEmptyCells);
	const runSet = new Set([currentCell.id]);

	while (runSet.size < totalEmptyCells.length) {
		const randomNeighbor = currentCell.getRandomNeighbor();

		if (runSet.has(randomNeighbor.id)) {
			currentCell = randomNeighbor;
			continue;
		}

		runSet.add(randomNeighbor.id);

		const [rowDiff, colDiff] = [
			Math.sign(currentCell.row - randomNeighbor.row),
			Math.sign(currentCell.col - randomNeighbor.col),
		];

		const cellToDestroy =
			mazeCopy[currentCell.row - rowDiff][currentCell.col - colDiff];
		if (isStartOrEnd(cellToDestroy)) continue;
		if (isMazeAnimation) {
			await destroyWall(cellToDestroy, currentCell.col + colDiff, delay);
			await sleep(delay * runSet.size);
		}
		cellToDestroy.makeEmpty();

		currentCell = randomNeighbor;
	}

	return mazeCopy;
}
