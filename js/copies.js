// Note that getAllCopies(), which every other method below calls, requires getBook() and getBranch().
if (!localStorage.getItem("copies")) {
	localStorage.setItem("copies", JSON.stringify([{"bookId": 2, "branchId": 2, "noOfCopies": 2}, {"bookId": 2, "branchId": 3, "noOfCopies": 2}, {"bookId": 2, "branchId": 4, "noOfCopies": 1}, {"bookId": 3, "branchId": 2, "noOfCopies": 4}, {"bookId": 3, "branchId": 3, "noOfCopies": 3}, {"bookId": 3, "branchId": 4, "noOfCopies": 3}, {"bookId": 4, "branchId": 2, "noOfCopies": 1}, {"bookId": 4, "branchId": 4, "noOfCopies": 1}, {"bookId": 6, "branchId": 4, "noOfCopies": 3}, {"bookId": 6, "branchId": 5, "noOfCopies": 2}, {"bookId": 7, "branchId": 2, "noOfCopies": 2}]));
}
function getAllCopies() {
	const copies = JSON.parse(localStorage.getItem("copies"));
	if (copies) {
		for (record of copies) {
			Object.defineProperty(record, 'book',
				{ get: function()
					{ return getBook(record.bookId); } });
			Object.defineProperty(record, 'branch',
				{ get: function()
					{ return getBranch(record.branchId); } });
		}
		return copies;
	} else {
		return [];
	}
}
function getCopies(book, branch) {
	const retval = getAllCopies().find(
		(record) => ((record.bookId === book.bookId || record.bookId === book) && 
			(record.branchId === branch.branchId || record.branchId === branch)));
	if (retval) {
		return retval.noOfCopies;
	} else {
		return 0;
	}
}
function setCopies(book, branch, copies) {
	const existing = getAllCopies();
	let buffer = [];
	let found = false;
	for (record of existing) {
		if ((record.bookId === book.bookId || record.bookId === book) && 
				(record.branchId === branch.branchId || record.branchId === branch)) {
			buffer.push({
				bookId: record.bookId,
				branchId: record.branchId,
				noOfCopies: copies
			});
			found = true;
		} else {
			buffer.push({
				bookId: record.bookId,
				branchId: record.branchId,
				noOfCopies: record.noOfCopies
			});
		}
	}
	if (!found) {
		buffer.push({
			bookId: (book.bookId) ? book.bookId : book,
			branchId: (branch.branchId) ? branch.branchId : branch,
			noOfCopies: copies
		});
	}
	localStorage.setItem("copies", JSON.stringify(buffer));
}
