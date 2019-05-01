function validateBook() {
	const title = document.getElementById("bookTitle").value;
	let retval = true;
	if (title.length > 20) {
		document.getElementById("titleError").classList.remove("errorMessage");
		retval = false;
	}
	const author = document.getElementById("bookAuthor");
	const authorIndex = author.options[author.selectedIndex].value;
	if (authorIndex && authorIndex > 0) {
		document.getElementById("authorError").classList.add("errorMessage");
	} else {
		document.getElementById("authorError").classList.remove("errorMessage");
		retval = false;
	}
	const publisher = document.getElementById("bookPublisher");
	const publisherIndex = publisher.options[publisher.selectedIndex].value;
	if (publisherIndex && publisherIndex > 0) {
		document.getElementById("publisherError").classList.add("errorMessage");
	} else {
		document.getElementById("publisherError").classList.remove("errorMessage");
		retval = false;
	}
	// TODO: create the book object and store it in localStorage (overwriting prior data in 'edit' case)
	return retval;
}
