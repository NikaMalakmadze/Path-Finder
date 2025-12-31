import { useSelector } from "react-redux";

function Skeleton({ dataToShow, widthPx }) {
	const { isAnimation } = useSelector(state => state.interface);

	return isAnimation ? (
		<div
			className="h-6 ml-1.5 inline-block bg-gray-300 rounded-full animate-pulse"
			style={{ width: `${widthPx}px` }}
		></div>
	) : (
		<span className="ml-1.5">{dataToShow}</span>
	);
}

export default Skeleton;
