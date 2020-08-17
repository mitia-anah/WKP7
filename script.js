// Create the object within a n array of books insidde of it 
const books = [{
        title: 'The Light We Lost',
        author: 'Jill Santopolo',
        genre: 'Romance novel',
        pages: 352,
        status: "read",
    },
    {
        title: 'Passing the Tests of Life',
        author: 'George Davis',
        genre: 'christian literature',
        pages: 240,
        status: "not",
    },
    {
        title: 'The Summer House',
        author: 'james Patterson',
        genre: 'Mystery',
        pages: 448,
        status: "read",
    },
];

// Generate the useful elements from the html
const myLibrary = document.querySelector('.form');
const listForm = document.querySelector('.list-form');
const bookLibrary = document.querySelector('.book-library');
const listOfBook = document.querySelector('.lists-of-book');
const submitBtn = document.querySelector('.add-button');

// Create list of book to show in the table 
const displayBooks = () => {
    const html = books.map(book =>
            `<li class="book-list">
            <span>${book.title}</span>
            <span>${book.author}</span>
            <span>${book.genre}</span>
            <span>${book.pages}</span>
            <input value="${book.status}"
            ${book.status === "read" ? 'checked' : '' } 
            type="checkbox">
            <span>
            <button class="remove" arial-label="Remove">sx
        </button>
            </span>
        </li>`)
        .join(" ");
    listOfBook.insertAdjacentHTML('beforeend', html);
};
displayBooks();

let library = [];

// This handle the new list we are going to add to the list
const handleSubmit = e => {
    e.preventDefault(); // prevent the page from loading
    const myBook = e.currentTarget;
    const title = myBook.titleBook.value;
    const author = myBook.authorBook.value;
    const pages = myBook.pagesBook.value;
    const genre = myBook.genreBook.value;
    const status = myBook.statusBook.value;

    const newBook = {
        title: title,
        author: author,
        genre: genre,
        pages: pages,
        status: "read",
    };
    // push it into our state
    library.push(newBook);
    // clear the form
    e.target.reset();

    // fire off a custom event that will tell anyone else who cares
    listOfBook.dispatchEvent(new CustomEvent('libraryUpdated'));
};

//Here is the html we will get later
const handleNewbook = () => {
    const newBookhtml = library.map(item =>
            `<li class="book-list">
                <span>${item.title}</span>
                <span>${item.author}</span>
                <span>${item.genre}</span>
                <span>${item.pages}</span>
                <input value="${item.status}"
                ${item.status === "read" ? 'checked' : '' } 
                type="checkbox">
                <span>
                    <button class="remove" arial-label="Remove 
                        ${item.title} 
                        ${item.author}
                        ${item.genre}
                        ${item.pages}"
                    value="${item.id}">&times;
                    </button>
                </span>
        </li>`)
        .join(" ");
    listOfBook.innerHTML += newBookhtml;
}

// Delete the book from the list
const deleteBook = id => {
    console.log('deleting book', id);
    library = library.filter(libraries => libraries.id !== id);
    listOfBook.dispatchEvent(new CustomEvent('libraryUpdated'));
};

// Mark the boo as 'read'
const markAsRead = id => {
    console.log(id);
    const bookRead = library.library.find(libraries => libraries.id === id);
    bookRead.status = !bookRead.status;
    listOfBook.dispatchEvent(new CustomEvent('libraryUpdated'));
};
// Set the book to localStorage
const mirrorToLocalStorage = () => {
    console.log('mirroring book to local storage');
    localStorage.setItem('library', JSON.stringify(library));
};

// Restore it form the local storage
const restoreFromLocalStorage = () => {
    console.log('Restoring from Ls(localStorage)');
    const localBook = JSON.parse(localStorage.getItem('library'));
    if (localBook) {
        library.push(...localBook);
    };
    listOfBook.dispatchEvent(new CustomEvent('libraryUpdated'));
};

// Listen for the event
myLibrary.addEventListener('submit', handleSubmit);
listOfBook.addEventListener('libraryUpdated', handleNewbook);
listOfBook.addEventListener('libraryUpdated', mirrorToLocalStorage);
listOfBook.addEventListener('click', function(e) {
    const id = e.currentTarget.value;
    if (e.target.matches('.remove')) {
        deleteBook(id);
    }
    if (e.target.matches('input[type="checkbox"]')) {
        console.log('marking as complete', id);
    }
});
restoreFromLocalStorage();