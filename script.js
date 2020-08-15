const books = [{
        title: 'Ny angano',
        author: 'Dox',
        genre: 'Fantasy',
        pages: 300,
        status: true,
    },
    {
        title: 'Ny vano',
        author: 'patrick',
        genre: 'Mystery',
        pages: 800,
        status: false,
    },
    {
        title: 'Ny rano',
        author: 'jean Narivony',
        genre: 'Design',
        pages: 100,
        status: true,
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
            ${book.complete ? 'checked' : '' } 
            type="checkbox">
            <span>
                <img class="icon" src="./delete-24px.png"/>
            </span>
        </li>`)
        .join(" ");
    listOfBook.insertAdjacentHTML('beforeend', html);
};
displayBooks();

let library = [];

const handleSubmit = e => {
    e.preventDefault(); // prevent the page from loading
    const myBook = e.currentTarget.newBook;
    // if it is empty, then don't submit it.
    if (!myBook) return;
    console.log(myBook);

    const newBook = {
        title: title,
        author: author,
        genre: genre,
        pages: pages,
        status: false,
    };
    // push it into our state
    library.push(newBook);
    // clear the form
    e.target.reset();

    // fire off a custom event that will tell anyone else who cares
    listOfBook.dispatchEvent(new CustomEvent('libraryUpdated'));
};

const handleButtonSubmit = e => {
    e.preventDefault();

}
myLibrary.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('submit', handleSubmit)