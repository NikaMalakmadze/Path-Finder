import React from "react";

import Visualization from "./pages/visualization";
import NotAvailable from "./pages/NotAvailable";

function App() {
	const [isAvaliableWidth, setIsAvaliableWidth] = React.useState(true);

	React.useLayoutEffect(() => {
		const matches1000px = window.matchMedia("(max-width:1000px)");
		const checkWidth = () =>
			matches1000px.matches
				? setIsAvaliableWidth(false)
				: setIsAvaliableWidth(true);
		checkWidth();
		matches1000px.addEventListener("change", checkWidth);
		return () => matches1000px.removeEventListener("change", checkWidth);
	}, []);

	return isAvaliableWidth ? <Visualization /> : <NotAvailable />;
}

export default App;
