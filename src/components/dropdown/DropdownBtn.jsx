import { twMerge } from "tailwind-merge";

function DropdownBtn({ current, setIsDropDown }) {
	return (
		<div
			className={twMerge(
				"px-1 py-2 flex justify-center items-center",
				"border-2 border-cyan-700 rounded-md cursor-pointer shadow",
				"text-neutral-800 font-medium",
				"hover:bg-neutral-50 hover:text-neutral-700 transition-colors"
			)}
			onClick={() => setIsDropDown(prev => !prev)}
		>
			{current} 🔻
		</div>
	);
}

export default DropdownBtn;
