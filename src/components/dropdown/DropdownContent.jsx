import { twMerge } from "tailwind-merge";

import DropdownItem from "./DropdownItem";

function DropdownContent({
	id,
	isDropDown,
	setIsDropDown,
	values,
	setCurrent,
}) {
	return (
		<div
			className={twMerge(
				"w-full mt-2.5 px-1.5 py-2 absolute",
				"flex flex-col gap-1 bg-white",
				"border-1 border-cyan-700 rounded-md shadow",
				"transition-opacity opacity-0",
				isDropDown ? "opacity-100" : "",
				!isDropDown ? "pointer-events-none" : ""
			)}
		>
			{values.map(value => (
				<DropdownItem
					value={value}
					isDropDown={isDropDown}
					setIsDropDown={setIsDropDown}
					setCurrent={setCurrent}
					key={`${id}__select-${value}`}
				/>
			))}
		</div>
	);
}

export default DropdownContent;
