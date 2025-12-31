export default function hueristic(firstCell, SecondCell) {
	const [x1, y1] = firstCell.getPos();
	const [x2, y2] = SecondCell.getPos();

	return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}
