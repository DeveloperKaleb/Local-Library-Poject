const importFunctions = require("./books.js")
const partition = importFunctions.partitionBooksByBorrowedStatus

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBorrowedBooks(books) {
  const borrowedBooks = []
  books.forEach((book) => {
    const { borrows } = book
    const borrowed = borrows.some((stat) => stat.returned === false)
    if (borrowed) borrowedBooks.push(book)
  })
  return borrowedBooks
}

function getBooksBorrowedCount(books) {
  const borrowedBooks = getBorrowedBooks(books)
  return borrowedBooks.length
}

function getMostCommonGenres(books) {
  const commonGenres = [];
  for (let i = 0; i < books.length; i++) {
    const {genre} = books[i]
    const genreCheck = commonGenres.some((ranking) => ranking.name === genre)
    //If a genre ranking already exists genreCheck is true
    const currentBook = books[i]
    if (!genreCheck) {
      const newGenre = Object.keys(currentBook).reduce((newObj, detail) => {
        if (detail === "genre") {
          const descrip = currentBook[detail]
          newObj["name"] = descrip
          newObj["count"] = 1
        }
        return newObj
      }, {})
      commonGenres.push(newGenre)
    } else {
      const extantGenre = commonGenres.find((ranking) => ranking.name === genre)
      extantGenre.count += 1
    }
  }
  commonGenres.sort((genreA, genreB) => genreB.count - genreA.count)
  for (let i = commonGenres.length -1; i > 4; i--) {
    commonGenres.pop()
  }
  return commonGenres
  //I need to make an ARRAY of OBJECTS which consist of TWO KEYS EACH. 
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => {
    const title = book.title;
    const borrowStats = book.borrows;
    const count = borrowStats.length;
    const ranking = {};
    ranking["name"] = title;
    ranking["count"] = count;
    return ranking;
  })
  popularBooks.sort((rankingA, rankingB) => rankingB.count - rankingA.count);
  for (let i = popularBooks.length -1; i > 4; i--) {
    popularBooks.pop()
  }
  return popularBooks
  //I need to creat an ARRAY of OBJECTS each with TWO KEYS: name (of the book) and count (number of times it has been borrowed)
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.map((author) => {
    const fullName = author.name
    const id = author.id
    const popularity = books.reduce((total, book) => {
      if (book.authorId === id) {
        const borrowStats = book.borrows
        const count = borrowStats.length
        total += count
      }
      return total
    }, 0)
    authorOb = {}
    authorOb["name"] = `${fullName.first} ${fullName.last}`
    authorOb["count"] = popularity
    return authorOb
  })
  popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count)
  const slicedAuthors = popularAuthors.slice(0, 5)
  return slicedAuthors
  //I will use .map() on the ARRAY authors to return an array of OBJECTS each with TWO KEYS: name (of the author) and count (number of times the authors books have been borrowed)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
