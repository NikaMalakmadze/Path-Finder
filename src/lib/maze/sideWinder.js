import {
	createWall,
	createWallAnimation,
	destroyWall,
	flipCoin,
} from "./../../utils/maze";
import isMazeAnimationSelector from "../../redux/selectors/isMazeAnimationSelector";
import rowsColsSelector from "./../../redux/selectors/rowsColsSelector";
import { isStartOrEnd, sleep } from "./../../utils/helpers";
import { getGridCopy } from "./../../utils/grid";

function getRandomCellFromRunSet(runSet) {
	const arrFromSet = Array.from(runSet);
	return arrFromSet[Math.floor(Math.random() * runSet.size)];
}

async function carveToNorth(mazeCopy, runSet, delay, isMazeAnimation) {
	const randomCellCords = getRandomCellFromRunSet(runSet);

	const northCell = mazeCopy[randomCellCords.row - 1][randomCellCords.col];
	if (isStartOrEnd(northCell)) return;
	isMazeAnimation
		? await destroyWall(northCell, randomCellCords.col, delay)
		: null;
	northCell.makeEmpty();

	runSet.clear();
}

export async function sideWinder(grid) {
	const { rows, columns } = rowsColsSelector();
	const isMazeAnimation = isMazeAnimationSelector();

	const mazeCopy = getGridCopy(grid);
	let delay = 0.003;

	if (isMazeAnimation) {
		await createWallAnimation(mazeCopy, delay);
		await sleep(900);
	}

	createWall(mazeCopy);

	const runSet = new Set([]);

	for (let col = 2; col < columns - 1; col += 2) {
		const firstRowCell = mazeCopy[1][col];
		if (isStartOrEnd(firstRowCell)) continue;
		isMazeAnimation ? await destroyWall(firstRowCell, col, delay) : null;
		firstRowCell.makeEmpty();
	}

	for (let row = 3; row < rows - 1; row += 2) {
		for (let col = 1; col < columns - 1; col += 2) {
			runSet.add({ row, col });

			if (flipCoin() && col !== columns - 2) {
				const eastCell = mazeCopy[row][col + 1];
				if (isStartOrEnd(eastCell)) continue;
				isMazeAnimation ? await destroyWall(eastCell, col + 1, delay) : null;
				eastCell.makeEmpty();
			} else await carveToNorth(mazeCopy, runSet, delay, isMazeAnimation);
		}
	}

	return mazeCopy;
}
