import { configureStore } from "@reduxjs/toolkit";

import gridSlice from "./slices/grid";
import interfaceSlice from "./slices/interface";
import analyticsSlice from "./slices/analytics";

export const store = configureStore({
	reducer: {
		gridSlice: gridSlice,
		interface: interfaceSlice,
		analytics: analyticsSlice,
	},
});
