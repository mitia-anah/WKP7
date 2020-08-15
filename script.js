const books = [{
        title: 'Ny angano',
        author: 'Dox',
        genre: 'Fantasy',
        pages: 300,
        status: "read",
    },
    {
        title: 'Ny vano',
        author: 'patrick',
        genre: 'Mystery',
        pages: 800,
        status: "not",
    },
    {
        title: 'Ny rano',
        author: 'jean Narivony',
        genre: 'Design',
        pages: 100,
        status: "read",
    },
];

const myLibrary = document.querySelector('.form');
const listForm = document.querySelector('.list-form');
const bookLibrary = document.querySelector('.book-library');
const listOfBook = document.querySelector('.lists-of-book');
const submitBtn = document.querySelector('.add-button');

// Generate the element using .map();
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
            <button class="remove" arial-label="Remove">x
        </button>
            </span>
        </li>`)
        .join(" ");
    listOfBook.insertAdjacentHTML('beforeend', html);
};
displayBooks();

let library = [];

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

const deleteBook = id => {
    console.log('deleting book', id);
    library = library.filter(libraries => libraries.id !== id);
    listOfBook.dispatchEvent(new CustomEvent('libraryUpdated'));
};

const markAsRead = id => {
    console.log(id);
    const bookRead = library.library.find(libraries => libraries.id === id);
    bookRead.status = !bookRead.status;
    listOfBook.dispatchEvent(new CustomEvent('libraryUpdated'));
};
// Set an item to localStorage
const mirrorToLocalStorage = () => {
    console.log('mirroring book to local storage');
    localStorage.setItem('library', JSON.stringify(library));
};

const restoreFromLocalStorage = () => {
    console.log('Restoring from Ls(localStorage)');
    const localBook = JSON.parse(localStorage.getItem('library'));
    if (localBook) {
        library.push(...localBook);
    };
    listOfBook.dispatchEvent(new CustomEvent('libraryUpdated'));
};

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