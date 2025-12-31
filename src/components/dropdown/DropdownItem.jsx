import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

function DropdownItem({ value, isDropDown, setIsDropDown, setCurrent }) {
	const dispatch = useDispatch();

	return (
		<div
			className={twMerge(
				"rounded-md text-center text-neutral-800 font-medium",
				"hover:bg-neutral-50 hover:text-neutral-700 transition-colors",
				isDropDown ? "cursor-pointer" : ""
			)}
			onClick={() => {
				if (!isDropDown) return;
				setIsDropDown(false);
				dispatch(setCurrent(value));
			}}
		>
			{value}
		</div>
	);
}

export default DropdownItem;
