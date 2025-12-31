import { PATH_STYLE_ANIMATION, STYLES_TO_CLEAR } from "../../utils/constants";
import { sleep } from "../../utils/helpers";

export default async function reconstructPath(cameFrom, current) {
	let currentCell = current;
	let pathLengh = 0;

	while (cameFrom.has(currentCell)) {
		currentCell = cameFrom.get(currentCell);

		const el = document.getElementById(currentCell.id);
		if (el) el.classList.add(PATH_STYLE_ANIMATION);

		currentCell.makePath();
		pathLengh++;

		await sleep(50);
	}
	document.getElementById(currentCell.id).classList.remove(...STYLES_TO_CLEAR);
	currentCell.makeStart(false);

	await sleep(900);

	return pathLengh;
}
