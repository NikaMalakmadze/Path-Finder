import { createSelector } from "@reduxjs/toolkit";
import { store } from "../store";

export default function isMazeAnimationSelector() {
	const state = store.getState();

	const interfaceState = state => state.interface;

	const selector = createSelector(
		[interfaceState],
		interfaceSlice => interfaceSlice.isMazeAnimation
	);

	return selector(state);
}
