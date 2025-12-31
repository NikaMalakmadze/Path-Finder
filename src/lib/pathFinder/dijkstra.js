import rowsColsSelector from "../../redux/selectors/rowsColsSelector";
import { clearPath, getCellNeihbors, getGridCopy } from "../../utils/grid";
import {
	areSameCell,
	getStartEndCellsObj,
	makeCellClosed,
	makeCellOpen,
	sleep,
} from "../../utils/helpers";
import PriorityQueue from "../priorityQueue";
import reconstructPath from "./reconstructPath";

export default async function dijkstra(grid) {
	const gridCopy = getGridCopy(grid);
	const [startCell, endCell] = getStartEndCellsObj(gridCopy);
	const { rows, columns } = rowsColsSelector();

	clearPath(gridCopy);
	getCellNeihbors(gridCopy, 0, 0, rows, columns, 1);

	let totalClosedCells = 0;
	let totalOpenCells = 0;
	let iterations = 0;
	let pathLengh;

	let count = 0;

	const openSet = new PriorityQueue();
	openSet.add(0, count, startCell);
	const openSetHash = new Set([startCell.id]);

	const gScore = {};
	for (const row of gridCopy) {
		for (const cell of row) {
			gScore[cell.id] = Infinity;
		}
	}
	gScore[startCell.id] = 0;
	const cameFrom = new Map([]);

	while (!openSet.isEmpty()) {
		iterations++;
		const current = openSet.pop();
		openSetHash.delete(current.id);

		if (areSameCell(current, endCell)) {
			pathLengh = await reconstructPath(cameFrom, current);
			current.makeEnd(false);
			totalOpenCells--;
			break;
		}

		for (const neighbor of current.neighbors) {
			const tempGScore = gScore[current.id] + 1;

			if (tempGScore < gScore[neighbor.id]) {
				cameFrom.set(neighbor, current);

				gScore[neighbor.id] = tempGScore;

				if (openSetHash.has(neighbor)) continue;

				count++;

				openSet.add(gScore[neighbor.id], count, neighbor);

				openSetHash.add(neighbor.id);

				if (!neighbor.isEnd) {
					makeCellOpen(neighbor);
					totalOpenCells++;
				}
			}
		}

		if (!areSameCell(current, startCell)) {
			makeCellClosed(current);
			totalClosedCells++;
			totalOpenCells--;
		}

		await sleep(10);
	}
	return [gridCopy, pathLengh, totalOpenCells, totalClosedCells, iterations];
}
