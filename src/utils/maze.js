import {
	COLUMNS,
	ROWS,
	STYLES_TO_CLEAR,
	WALL_STYLE_ANIMATION,
	WALL_STYLE_STATIC,
} from "./constants";
import { sleep } from "./helpers";

export async function createWallAnimation(maze, delay) {
	for (let row = 0; row < ROWS; row++) {
		await sleep(delay * (ROWS / 2) * row);
		for (let col = 0; col < COLUMNS; col++) {
			const cell = maze[row][col];
			if (row % 2 === 0 || col % 2 === 0) {
				if (!cell.isWall) {
					const docCell = document.getElementById(cell.id);
					docCell.classList.remove(...STYLES_TO_CLEAR);
					docCell.classList.add(WALL_STYLE_ANIMATION);
					await sleep(delay * col);
				}
			} else {
				!cell.isStart || !cell.isEnd
					? await destroyWall(cell, col, delay)
					: null;
			}
		}
	}
}

export function createWall(maze) {
	for (let row = 0; row < ROWS; row++) {
		for (let col = 0; col < COLUMNS; col++) {
			const cell = maze[row][col];
			if (row % 2 === 0 || col % 2 === 0) {
				cell.isStart
					? cell.makeStart(false)
					: cell.isEnd
					? cell.makeEnd(false)
					: !cell.isWall
					? cell.makeWall(false)
					: null;
			} else {
				cell.isWall ||
				(!cell.isWall && !cell.isStart && !cell.isEnd && cell.style)
					? cell.makeEmpty()
					: null;
			}
		}
	}
}

export async function destroyWall(cell, col, delay) {
	if (!cell.isWall) {
		document.getElementById(cell.id).classList.remove(...STYLES_TO_CLEAR);
		return;
	}

	document
		.getElementById(cell.id)
		.classList.remove(WALL_STYLE_ANIMATION, WALL_STYLE_STATIC);
	await sleep(delay * col);
}

export function flipCoin() {
	return Math.floor(Math.random() * 2);
}
