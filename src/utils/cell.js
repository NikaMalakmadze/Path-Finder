import {
	CLOSED_STYLE_STATIC,
	END_STYLE_ANIMATION,
	END_STYLE_STATIC,
	OPEN_STYLE_STATIC,
	PATH_STYLE_STATIC,
	START_STYLE_ANIMATION,
	START_STYLE_STATIC,
	WALL_STYLE_ANIMATION,
	WALL_STYLE_STATIC,
} from "./constants";

class Cell {
	constructor(
		row,
		col,
		totalRows,
		totalColumns,
		isWall = false,
		isStart = false,
		isEnd = false,
		style = ""
	) {
		this.row = row;
		this.col = col;
		this.id = `${row}-${col}`;
		this.totalRows = totalRows;
		this.totalColumns = totalColumns;
		this.isStart = isStart;
		this.isEnd = isEnd;
		this.isWall = isWall;
		this.style = style;
		this.neighbors = [];
	}

	getPos() {
		return [this.row, this.col];
	}

	makeStart(isAnimation = true) {
		this.isStart = true;
		this.isWall = false;
		this.isEnd = false;
		this.style = isAnimation
			? START_STYLE_ANIMATION + " isAnimation"
			: START_STYLE_STATIC;
	}

	makeEnd(isAnimation = true) {
		this.isStart = false;
		this.isWall = false;
		this.isEnd = true;
		this.style = isAnimation
			? END_STYLE_ANIMATION + " isAnimation"
			: END_STYLE_STATIC;
	}

	makeWall(isAnimation = true) {
		if (this.isWall) return;
		this.isWall = true;
		this.style = isAnimation
			? WALL_STYLE_ANIMATION + " isAnimation"
			: WALL_STYLE_STATIC;
	}

	makeOpen() {
		this.isWall = false;
		this.style = OPEN_STYLE_STATIC;
	}

	makeClosed() {
		this.isWall = false;
		this.style = CLOSED_STYLE_STATIC;
	}

	makePath() {
		this.isWall = false;
		this.style = PATH_STYLE_STATIC;
	}

	updateType(isStart, isEnd) {
		if (this.isWall || this.isStart || this.isEnd) return;

		if (!isStart && !isEnd) {
			this.makeStart();
			return;
		}
		if (isStart && !isEnd) {
			this.makeEnd();
			return;
		}
		if (isEnd && !isStart) {
			this.makeStart();
			return;
		}
		this.makeWall();
	}

	makeEmpty() {
		this.isWall = false;
		this.isStart = false;
		this.isEnd = false;
		this.style = "";
	}

	updateNeighbors(maze, isMaze = false) {
		this.neighbors = [];

		const minCord = isMaze ? 1 : 0;
		const padding = isMaze ? 2 : 1;
		const maxRow = this.totalRows - padding;
		const maxCol = this.totalColumns - padding;

		// UP
		if (this.row !== minCord && !maze[this.row - padding][this.col].isWall) {
			this.neighbors.push(maze[this.row - padding][this.col]);
		}

		// RIGHT
		if (this.col !== maxCol && !maze[this.row][this.col + padding].isWall) {
			this.neighbors.push(maze[this.row][this.col + padding]);
		}

		// DOWN
		if (this.row !== maxRow && !maze[this.row + padding][this.col].isWall) {
			this.neighbors.push(maze[this.row + padding][this.col]);
		}

		// LEFT
		if (this.col !== minCord && !maze[this.row][this.col - padding].isWall) {
			this.neighbors.push(maze[this.row][this.col - padding]);
		}
	}

	getRandomNeighbor() {
		return this.neighbors[Math.floor(Math.random() * this.neighbors.length)];
	}

	serialize() {
		return {
			row: this.row,
			col: this.col,
			totalRows: this.totalRows,
			totalColumns: this.totalColumns,
			isStart: this.isStart,
			isEnd: this.isEnd,
			isWall: this.isWall,
			style: this.style,
		};
	}
}

export default Cell;
