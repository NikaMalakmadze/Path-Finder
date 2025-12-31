import { MAZE_ALGORITHMS, PATH_FINDER_ALGORITHMS } from "../../utils/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentMazeAlgorithm: MAZE_ALGORITHMS[0],
	currentPathAlgorithm: PATH_FINDER_ALGORITHMS[0],
	isMazeAnimation: false,
	isAnimation: false,
};

const interfaceSlice = createSlice({
	name: "interface",
	initialState,
	reducers: {
		setCurrentMazeAlgorithm: (state, action) => {
			state.currentMazeAlgorithm = action.payload;
		},
		setCurrentPathAlgorithm: (state, action) => {
			state.currentPathAlgorithm = action.payload;
		},
		setIsAnimation: (state, action) => {
			state.isAnimation = action.payload;
		},
		setIsMazeAnimation: (state, action) => {
			state.isMazeAnimation = action.payload;
		},
	},
});

export const {
	setCurrentMazeAlgorithm,
	setCurrentPathAlgorithm,
	setIsAnimation,
	setIsMazeAnimation,
} = interfaceSlice.actions;

export default interfaceSlice.reducer;
