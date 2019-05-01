// Note that getLoans(), which every other method below calls, requires getBook(), getBranch(), and getBorrower().
if (!localStorage.getItem("loans")) {
	localStorage.setItem("loans", JSON.stringify([{"bookId": 2, "cardNo": 2, "dateOut": "2019-02-25 10:24:15.000000", "dueDate": "2019-03-18 18:00:00.000000", "branchId": 2}]));
}
function getLoans() {
	const loans = JSON.parse(localStorage.getItem("loans"));
	if (loans) {
		for (loan of loans) {
			Object.defineProperty(loan, 'book', 
				{ get: function()
					{ return getBook(record.bookId); } });
			Object.defineProperty(loan, 'branch',
				{ get: function()
					{ return getBranch(record.branchId); } });
			Object.defineProperty(loan, 'borrower',
				{ get: function()
					{ return getBorrower(record.borrowerId); } });
		}
		return loans;
	} else {
		return []
	}
}
function getLoan(book, branch, borrower) {
	return getLoans().find(
		(loan) => ((loan.bookId === book.bookId || loan.bookId === book) &&
			(loan.branchId === branch.branchId || loan.branchId === branch) &&
			(loan.borrowerId === borrower.cardNo || loan.borrowerId === borrower)));
}
function saveLoan(loan) {
	const original = getLoans();
	let buffer = [];
	let found = false;
	for (item of original) {
		if (item.bookId == loan.bookId && item.branchId ==
				loan.branchId && item.borrowerId == loan.borrowerId) {
			buffer.push(loan);
			found = true;
		} else {
			buffer.push(item);
		}
	}
	if (!found) {
		buffer.push(loan);
	}
	localStorage.setItem("loans", JSON.stringify(buffer));
}
function deleteLoan(loan) {
	const original = getLoans();
	let buffer = [];
	for (item of original) {
		if (item.bookId != loan.bookId ||
				item.branchId != loan.branchId ||
				item.borrowerId != loan.borrowerId) {
			buffer.push(item);
		}
	}
	localStorage.setItem("loans", JSON.stringify(buffer));
}
