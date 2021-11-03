function findAccountById(accounts, id) {
  const idObj = accounts.find((object) => object.id === id)
  return idObj
}

function sortAccountsByLastName(accounts) {
  accounts.sort((idA, idB) => {
    const namesA = idA.name;
    const namesB = idB.name;
    return namesA.last > namesB.last ? 1 : -1
  })
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  //I need to look in an account OBJECT and determine how many times that objects id KEY appears in the borrowed array within the books array
  const id = account.id
  const borrowTotal = books.reduce((total, book) => {
    const borrowArr = book.borrows;
    for (let i = 0; i < borrowArr.length; i++) {
      const borrowId = borrowArr[i].id;
      if (borrowId === id) {
        total += 1;
       }
    }
    return total; 
  }, 0)
  return borrowTotal
}

function getBooksPossessedByAccount(account, books, authors) {
  const id = account.id;
  const borrowedBooks = books.filter((book) => {
    const returnStat = book.borrows;
    const returned = returnStat.some((statData) => {
      const borrowId = statData.id;
      const borrowStatus = statData.returned;
      return borrowId === id && !borrowStatus;
    })
    return returned
  })
  const formattedBooks = []
  for (let i = 0; i < borrowedBooks.length; i++) {
    const writerId = borrowedBooks[i].authorId
    const bookAuthor = authors.find((author) => author.id === writerId)
    const newObs = { ...borrowedBooks[i]}
    newObs["author"] = { ...bookAuthor }
    formattedBooks.push(newObs)
  }
  return formattedBooks
  // I'm definintely going to use .filter on books to filter for returned: false
  //What if I used .filter() on the books ARRAY and then used .reduce on the new array, with a .find() function inside of it
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
