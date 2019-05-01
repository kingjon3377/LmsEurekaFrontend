if (!localStorage.getItem("publishers")) {
	localStorage.setItem("publishers", JSON.stringify([{"publisherId": 1, "publisherName": "Baen Books", "publisherPhone": null, "publisherAddress": "Wake Forest, North Carolina"}, {"publisherId": 2, "publisherName": "Scholastic", "publisherPhone": "8007246527", "publisherAddress": "557 Broadway, New York City, New York, 10012"}, {"publisherId": 3, "publisherName": "HarperCollins", "publisherPhone": "8554153654", "publisherAddress": "195 Broadway, New York City"}, {"publisherId": 4, "publisherName": "Ace Books", "publisherPhone": null, "publisherAddress": null}, {"publisherId": 5, "publisherName": "Trans Atlantic Press", "publisherPhone": null, "publisherAddress": null}, {"publisherId": 6, "publisherName": "Picador", "publisherPhone": null, "publisherAddress": null}, {"publisherId": 7, "publisherName": "test publisher", "publisherPhone": "1-800-800-8000", "publisherAddress": "one way"}]));
}
function getPublishers() {
	const publishers = JSON.parse(localStorage.getItem("publishers"));
	if (publishers) {
		return publishers;
	} else {
		return [];
	}
}
function getPublisher(id) {
	return getPublishers().find((publisher) => publisher.publisherId == id);
}
function savePublisher(publisher) {
	const original = getPublishers();
	let buffer = [];
	let found = false;
	for (item of original) {
		if (item.publisherId == publisher.publisherId) {
			buffer.push(publisher);
			found = true;
		} else {
			buffer.push(item);
		}
	}
	if (!found) {
		buffer.push(publisher);
	}
	localStorage.setItem("publishers", JSON.stringify(buffer));
}
function deletePublisher(publisher) {
	const original = getPublishers();
	let buffer = [];
	for (item of original) {
		if (item.publisherId != publisher.publisherId) {
			buffer.push(item);
		}
	}
	localStorage.setItem("publishers", JSON.stringify(buffer));
}
