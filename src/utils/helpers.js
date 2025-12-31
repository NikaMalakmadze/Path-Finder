import startEndCellSelector from "../redux/selectors/startEndCellSelector";
import { CLOSED_STYLE_ANIMATION, OPEN_STYLE_ANIMATION } from "./constants";

export function invalidCellAction(cell, mouseBtn) {
	return (
		(cell.isWall && mouseBtn === 1) ||
		(!cell.isWall && !cell.isStart && !cell.isEnd && mouseBtn === 2)
	);
}

export function sleep(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

export function isStartOrEnd(cell) {
	return cell.isStart || cell.isEnd;
}

export function areSameCell(firstCell, secondCell) {
	return firstCell.row === secondCell.row && firstCell.col === secondCell.col;
}

export function makeCellOpen(cell) {
	cell.makeOpen();
	const neighborEl = document.getElementById(cell.id);
	neighborEl ? neighborEl.classList.add(OPEN_STYLE_ANIMATION) : null;
}

export function makeCellClosed(cell) {
	cell.makeClosed();
	const docCell = document.getElementById(cell.id);
	if (docCell) {
		docCell.classList.remove(OPEN_STYLE_ANIMATION);
		docCell.classList.add(CLOSED_STYLE_ANIMATION);
	}
}

export function getStartEndCellsObj(gridCopy) {
	const { startCellCords, endCellCords } = startEndCellSelector();

	const startCell = gridCopy[startCellCords.row][startCellCords.col];
	const endCell = gridCopy[endCellCords.row][endCellCords.col];

	return [startCell, endCell];
}
