import rowsColsSelector from "../../redux/selectors/rowsColsSelector";
import { clearPath, getCellNeihbors, getGridCopy } from "../../utils/grid";
import {
	areSameCell,
	getStartEndCellsObj,
	makeCellClosed,
	makeCellOpen,
	sleep,
} from "../../utils/helpers";
import reconstructPath from "./reconstructPath";

export default async function dfs(grid) {
	const gridCopy = getGridCopy(grid);
	const [startCell, endCell] = getStartEndCellsObj(gridCopy);
	const { rows, columns } = rowsColsSelector();

	clearPath(gridCopy);
	getCellNeihbors(gridCopy, 0, 0, rows, columns, 1);

	let totalClosedCells = 0;
	let totalOpenCells = 0;
	let iterations = 0;
	let pathLengh;

	const visited = new Set([]);
	const stack = [startCell];
	const cameFrom = new Map([]);

	while (stack.length !== 0) {
		const cell = stack.pop();
		iterations++;

		if (areSameCell(cell, endCell)) {
			pathLengh = await reconstructPath(cameFrom, cell);
			cell.makeEnd(false);
			totalOpenCells--;
			break;
		}

		if (visited.has(cell)) continue;
		visited.add(cell);

		for (const neighbor of cell.neighbors) {
			if (visited.has(neighbor)) continue;
			cameFrom.set(neighbor, cell);
			stack.push(neighbor);
			if (!neighbor.isEnd) {
				makeCellOpen(neighbor);
				totalOpenCells++;
			}
		}

		if (!areSameCell(cell, startCell)) {
			makeCellClosed(cell);
			totalClosedCells++;
			totalOpenCells--;
		}

		await sleep(10);
	}
	return [gridCopy, pathLengh, totalOpenCells, totalClosedCells, iterations];
}
