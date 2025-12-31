import React from "react";

import DropdownContent from "./DropdownContent";
import DropdownBtn from "./DropdownBtn";

function DropDown({ id, currentValue, values, setCurrent }) {
	const [isDropDown, setIsDropDown] = React.useState(false);

	React.useEffect(() => {
		const closeDropDown = e => {
			if (e.target.closest(`#dropdown__${id}`)) return;
			setIsDropDown(false);
		};

		document.addEventListener("click", closeDropDown);

		return () => removeEventListener("click", closeDropDown);
	}, []);

	return (
		<div className="w-[200px] relative" id={`dropdown__${id}`}>
			<DropdownBtn current={currentValue} setIsDropDown={setIsDropDown} />
			<DropdownContent
				id={id}
				isDropDown={isDropDown}
				setIsDropDown={setIsDropDown}
				values={values}
				setCurrent={setCurrent}
			/>
		</div>
	);
}

export default DropDown;
