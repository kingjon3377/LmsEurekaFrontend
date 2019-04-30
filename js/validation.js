function validateBook() {
	const title = document.getElementById("bookTitle").value;
	let retval = true;
	if (title.length > 20) {
		document.getElementById("titleError").classList.remove("errorMessage");
		retval = false;
	}
	const author = document.getElementById("bookAuthor").value;
	// FIXME: Switch to a list of authors rather than freeform input and check that one is chosen.
	if (author.length > 20) {
		document.getElementById("authorError").classList.remove("errorMessage");
		retval = false;
	}
	const publisher = document.getElementById("bookPublisher").value;
	// FIXME: Switch to a list of publishers rather than freeform input and check that one is chosen.
	if (publisher.length > 20) {
		document.getElementById("publisherError").classList.remove("errorMessage");
		retval = false;
	}
	// TODO: create the book object and store it in localStorage (overwriting prior data in 'edit' case)
	return retval;
}
