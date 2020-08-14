const books = [{
        tilte: 'Ny angano',
        author: 'S.william',
        genre: 'Fantasy',
        numbers: 300,
        status: read,
    },
    {
        tilte: 'Ny vano',
        author: 'Peter',
        genre: 'Mystery',
        numbers: 800,
        status: not,
    },
    {
        tilte: 'Ny rano',
        author: 'jean Narivony',
        genre: 'Design',
        numbers: 100,
        status: read,
    },
];

const bookLibrary = document.querySelector('.book-library');
const listOfBook = document.querySelector('.list-of-book');

// Generate the element using .map();
const html = books.map(book => {
        return `
        <li>
            <span>${book.title}</span>
            <span>${book.author}</span>
            <span>${book.genre}</span>
            <span>${book.numbers}</span>
            <span>${book.status}</span>
        </li>
    `;
    })
    .join(" ");
listOfBook.innerHTML = html;