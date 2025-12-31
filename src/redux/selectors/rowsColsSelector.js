import { createSelector } from "@reduxjs/toolkit";
import { store } from "../store";

export default function rowsColsSelector() {
	const state = store.getState();

	const gridState = state => state.gridSlice;

	const rowColSelector = createSelector([gridState], grid => ({
		rows: grid.rows,
		columns: grid.columns,
	}));

	return rowColSelector(state);
}
