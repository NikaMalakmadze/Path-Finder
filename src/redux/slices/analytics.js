import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	efficienty: null,
	pathFound: null,
	pathLengh: 0,
	openCells: 0,
	closedCells: 0,
};

const analyticsSlice = createSlice({
	name: "analytics",
	initialState,
	reducers: {
		setPath: (state, action) => {
			const { pathLengh, iterations } = action.payload;
			if (pathLengh) {
				state.pathFound = true;
				state.pathLengh = pathLengh;
				state.efficienty = Math.floor((pathLengh / iterations) * 100);
			}
		},
		setOpenClosedCells: (state, action) => {
			const { openCells, closedCells } = action.payload;
			openCells ? (state.openCells = openCells) : null;
			closedCells ? (state.closedCells = closedCells) : null;
		},
		clearAnalytics: (state, _) => {
			for (const stateProp in initialState) {
				state[stateProp] = initialState[stateProp];
			}
		},
	},
});

export const { setPath, setOpenClosedCells, clearAnalytics } =
	analyticsSlice.actions;

export default analyticsSlice.reducer;
