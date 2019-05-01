if (!localStorage.getItem("authors")) {
	localStorage.setItem("authors", JSON.stringify([{"authorId": 1, "authorName": "Lois McMaster Bujold"}, {"authorId": 2, "authorName": "Patricia Wrede"}, {"authorId": 3, "authorName": "Robert Jordan"}, {"authorId": 4, "authorName": "Charles Williams"}, {"authorId": 5, "authorName": "Robin McKinley"}, {"authorId": 6, "authorName": "Jane Austen"}, {"authorId": 7, "authorName": "Dorothy Sayers"}, {"authorId": 8, "authorName": "C. S. Lewis"}, {"authorId": 9, "authorName": "J. R. R. Tolkien"}, {"authorId": 10, "authorName": "Tamora Pierce"}, {"authorId": 11, "authorName": "Aubrey Hansen"}, {"authorId": 12, "authorName": "Jordan Smith"}, {"authorId": 13, "authorName": "Jonathan Lovelace"}, {"authorId": 14, "authorName": "Mark Lee"}, {"authorId": 34, "authorName": "Ibn Khaldoun"}, {"authorId": 40, "authorName": "Najoua Bahba"}]));
}
function getAuthors() {
	const authors = JSON.parse(localStorage.getItem("authors"));
	if (authors) {
		return authors;
	} else {
		return [];
	}
}
	
function getAuthor(id) {
	return getAuthors().find((author) => author.authorId == id);
}

function saveAuthor(author) {
	const original = getAuthors();
	let buffer = [];
	let found = false;
	for (item of original) {
		if (item.authorId == author.authorId) {
			buffer.push(author);
			found = true;
		} else {
			buffer.push(item);
		}
	}
	if (!found) {
		buffer.push(author);
	}
	localStorage.setItem("authors", JSON.stringify(buffer));
}
function deleteAuthor(author) {
	const original = getAuthors();
	let buffer = [];
	for (item of original) {
		if (item.authorId != author.authorId) {
			buffer.push(item);
		}
	}
	localStorage.setItem("authors", JSON.stringify(buffer));
}
