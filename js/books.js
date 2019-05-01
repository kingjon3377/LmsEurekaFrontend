// Note that getBooks(), which every other method below calls, requires getAuthor() and getPublisher()
if (!localStorage.getItem("books")) {
	localStorage.setItem("books", JSON.stringify([{"pubId": 3, "title": "The Curse of Chalion", "authId": 1, "bookId": 2}, {"pubId": 5, "title": "Persuasion", "authId": 6, "bookId": 3}, {"pubId": 4, "title": "The Blue Sword", "authId": 5, "bookId": 4}, {"pubId": null, "title": "A Year In Verse", "authId": 13, "bookId": 5}, {"pubId": 6, "title": "The Lost Tribe", "authId": 14, "bookId": 6}, {"pubId": 3, "title": "Paladin of Souls", "authId": 1, "bookId": 7}]));
}
function getBooks() {
	const books = JSON.parse(localStorage.getItem("books"));
	if (books) {
		for (book of books) {
			Object.defineProperty(book, 'author',
				{ get: function()
					{ return getAuthor(this.authId); } });
			Object.defineProperty(book, 'publisher',
				{ get: function()
					{ return getPublisher(this.pubId); } });
		}
		return books;
	} else {
		return [];
	}
}
function getBook(id) {
	return getBooks().find((book) => book.bookId == id);
}
function saveBook(book) {
	function simplify(item) {
		return {
			bookId: item.bookId,
			title: item.title,
			authId: item.author ? item.author.authorId : item.authId,
			pubId: item.publisher ? item.publisher.publisherId : item.pubId
		};
	}
	const original = getBooks();
	let buffer = [];
	let found = false;
	for (item of original) {
		if (item.bookId == book.bookId) {
			buffer.push(simplify(book));
			found = true;
		} else {
			buffer.push(simplify(item));
		}
	}
	if (!found) {
		buffer.push(simplify(book));
	}
	localStorage.setItem("books", JSON.stringify(buffer));
}
function deleteBook(book) {
	const original = getBooks();
	let buffer = [];
	for (item of original) {
		if (item.bookId != book.bookId) {
			buffer.push(item);
		}
	}
	localStorage.setItem("books", JSON.stringify(buffer));
}
