function findAuthorById(authors, id) {
  const foundAuthor = authors.find((author) => author.id === id)
  return foundAuthor
}

function findBookById(books, id) {
  const foundBook = books.find((book) => book.id === id)
  return foundBook
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter((book) => {
    const returnStat = book.borrows;
    const returned = returnStat.some((statData) => {
      const borrowStatus = statData.returned;
      return !borrowStatus;
    })
    return returned
  })
  const returnedBooks = books.filter((book) => {
    const returnStat = book.borrows;
    const returned = returnStat.every((statData) => {
      const borrowStatus = statData.returned;
      return borrowStatus;
    })
    return returned
  })
  const borrowedOrReturned = []
  borrowedOrReturned.push(borrowedBooks)
  borrowedOrReturned.push(returnedBooks)
  return borrowedOrReturned
}

function getBorrowersForBook(book, accounts) {
  const returnStats = book.borrows;
  const borrowerIds = returnStats.map((log) => {
    const borrowerId = log.id
    const returnedStat = log.returned
    const idObject = accounts.find((account) => account.id === borrowerId)
    const idAndReturn = { ...idObject}
    idAndReturn["returned"] = returnedStat
    return idAndReturn
  })
  for (let i = borrowerIds.length - 1; i > 9; i--) {
    borrowerIds.pop()
  }
  return borrowerIds
  //I'm going to try to use .map() and .find() to create the return array
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
