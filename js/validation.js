function validateBook() {
	const title = document.getElementById("bookTitle").value;
	let retval = true;
	if (title.length > 20) {
		document.getElementById("titleError").classList.remove("errorMessage");
		retval = false;
	} else {
		document.getElementById("titleError").classList.add("errorMessage");
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
	return retval;
}
function validateAuthor() {
	const name = document.getElementById("authorName").value;
	if (name.length > 20) {
		document.getElementById("tooLongError").classList.remove("errorMessage");
		document.getElementById("tooShortError").classList.add("errorMessage");
		return false;
	} else if (name.length == 0) {
		document.getElementById("tooLongError").classList.add("errorMessage");
		document.getElementById("tooShortError").classList.remove("errorMessage");
		return false;
	} else {
		return true;
	}
}
