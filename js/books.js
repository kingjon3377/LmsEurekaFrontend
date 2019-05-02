// Note that getBooks(), which every other method below calls, requires getAuthor() and getPublisher()
// Also, validateAndAddBook() requires validateBook().
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
function getNextBookId() {
	let highestBookId = parseInt(localStorage.getItem("highestBookId"), 10);
	if (highestBookId) {
		localStorage.setItem("highestBookId", 1 + highestBookId);
		return highestBookId + 1;
	} else {
		highestBookId = 0;
		for (book of getBooks()) {
			if (book.bookId > parseInt(highestBookId)) {
				highestBookId = Number(book.bookId);
			}
		}
		localStorage.setItem("highestBookId", highestBookId + 1);
		return highestBookId + 1;
	}
}
function validateAndAddBook() {
	if (validateBook()) {
		const authorNode = document.getElementById("bookAuthor");
		const publisherNode = document.getElementById("bookPublisher");
		saveBook({
			title: document.getElementById("bookTitle").value,
			authId: authorNode.options[authorNode.selectedIndex].value,
			pubId: publisherNode.options[publisherNode.selectedIndex].value,
			bookId: getNextBookId()
		});
		return true;
	} else {
		return false;
	}
}
function validateAndUpdateBook() {
	if (validateBook()) {
		const urlSearch = new URLSearchParams(document.location.search.substring(1));
		const authorNode = document.getElementById("bookAuthor");
		const publisherNode = document.getElementById("bookPublisher");
		saveBook({
			title: document.getElementById("bookTitle").value,
			authId: authorNode.options[authorNode.selectedIndex].value,
			pubId: publisherNode.options[publisherNode.selectedIndex].value,
			bookId: urlSearch.get("id")
		});
		return true;
	} else {
		return false;
	}
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
function confirmDeleteBook(bookId) {
	const book = getBook(bookId);
	// FIXME: Show modal dialog asking the user to confirm before actually deleting.
	if (book) {
		deleteBook(book);
		let i = 0;
		const table = document.getElementById("booksTable");
		for (row of table.rows) {
			if (row.cells[0].tagName.toLowerCase() == "th" && row.cells[0].innerText == bookId) {
				table.deleteRow(i);
				break;
			}
			i++;
		}
	}
	return false;
}
