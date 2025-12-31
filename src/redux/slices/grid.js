import { createSlice } from "@reduxjs/toolkit";

import { COLUMNS, ROWS } from "../../utils/constants";
import { createGrid } from "./../../utils/grid";

const initialState = {
	grid: createGrid(),
	rows: ROWS,
	columns: COLUMNS,
	isClear: true,
	isStartCell: false,
	isEndCell: false,
	startCellCords: {},
	endCellCords: {},
};

export const gridSlice = createSlice({
	name: "grid",
	initialState,
	reducers: {
		updateGrid: (state, action) => {
			state.grid = action.payload;
			state.isClear = false;
		},
		clearGrid: (state, _) => {
			state.grid = createGrid();
			state.isClear = true;
			state.isStartCell = false;
			state.isEndCell = false;
			state.startCellCords = {};
			state.endCellCords = {};
		},
		setStartCell: (state, action) => {
			state.isStartCell = action.payload.isStartCell;
			if (action.payload.isStartCell) {
				state.startCellCords = action.payload.startCell;
			} else {
				state.startCellCords = {};
			}
		},
		setEndCell: (state, action) => {
			state.isEndCell = action.payload.isEndCell;
			if (action.payload.isEndCell) {
				state.endCellCords = action.payload.endCell;
			} else {
				state.endCellCords = {};
			}
		},
	},
});

export const { updateGrid, clearGrid, setStartCell, setEndCell } =
	gridSlice.actions;

export default gridSlice.reducer;
