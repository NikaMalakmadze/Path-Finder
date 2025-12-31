import { createSelector } from "@reduxjs/toolkit";
import { store } from "../store";

export default function startEndCellSelector() {
	const state = store.getState();

	const gridState = state => state.gridSlice;

	const selector = createSelector([gridState], grid => ({
		startCellCords: grid.startCellCords,
		endCellCords: grid.endCellCords,
	}));

	return selector(state);
}
