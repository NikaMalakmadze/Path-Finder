import { ROWS, COLUMNS, STYLES_TO_CLEAR } from "./constants";
import Cell from "./cell";

export function createGrid() {
	const arr = [];
	for (let row = 0; row < ROWS; row++) {
		arr.push(createRow(row));
	}
	return arr;
}

function createRow(rowIndex) {
	const currentRow = [];
	for (let col = 0; col < COLUMNS; col++) {
		const cellObject = new Cell(rowIndex, col, ROWS, COLUMNS).serialize();
		currentRow.push(cellObject);
	}
	return currentRow;
}

export function getGridCopy(grid) {
	return grid.map(row =>
		row.map(
			cell =>
				new Cell(
					cell.row,
					cell.col,
					cell.totalRows,
					cell.totalColumns,
					cell.isWall,
					cell.isStart,
					cell.isEnd,
					cell.style
				)
		)
	);
}

export function serializeGrid(grid) {
	return grid.map(row => row.map(cell => cell.serialize()));
}

export function getCellNeihbors(
	mazeCopy,
	startRow,
	startCol,
	rows,
	columns,
	step
) {
	for (let row = startRow; row < rows; row += step) {
		for (let col = startCol; col < columns; col += step) {
			const emptyCell = mazeCopy[row][col];
			emptyCell.updateNeighbors(mazeCopy);
		}
	}
}

export function clearPath(mazeCopy) {
	for (let row = 0; row < ROWS; row++) {
		for (let col = 0; col < COLUMNS; col++) {
			const cell = mazeCopy[row][col];
			const docCell = document.getElementById(cell.id);
			docCell.classList.remove(...STYLES_TO_CLEAR);
			cell.isWall || cell.isStart || cell.isEnd ? null : cell.makeEmpty();
		}
	}
}
