class QueueElement {
	constructor(priority, count, cell) {
		this.priority = priority;
		this.count = count;
		this.cell = cell;
	}
}

class PriorityQueue {
	constructor() {
		this.elements = [];
	}

	isEmpty() {
		return this.elements.length === 0;
	}

	add(priority, count, cell) {
		const newElement = new QueueElement(priority, count, cell);
		if (this.isEmpty()) {
			this.elements.push(newElement);
			return;
		}

		for (let i = 0; i < this.elements.length; i++) {
			if (this.elements[i].priority > newElement.priority) {
				this.elements.splice(i, 0, newElement);
				break;
			} else if (
				this.elements[i].priority === newElement.priority &&
				this.elements[i].count > newElement.count
			) {
				this.elements.splice(i, 0, newElement);
				break;
			} else if (i === this.elements.length - 1) {
				this.elements.push(newElement);
				break;
			}
		}
	}

	pop() {
		return !this.isEmpty() ? this.elements.shift().cell : null;
	}
}

export default PriorityQueue;
