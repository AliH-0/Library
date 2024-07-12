const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = this.read === 'read' ? 'not read' : 'read';
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const container = document.getElementById('library-container');
    container.innerHTML = ''; // Clear the container before displaying books

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.index = index; // Set data-index attribute

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        bookCard.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(bookPages);

        const bookRead = document.createElement('p');
        bookRead.textContent = `Read: ${book.read}`;
        bookCard.appendChild(bookRead);

        // Add Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeBookFromLibrary(index);
        });
        bookCard.appendChild(removeButton);

        // Add Toggle Read Status button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Read Status';
        toggleButton.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks();
        });
        bookCard.appendChild(toggleButton);

        container.appendChild(bookCard);
    });
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// Modal functionality
const modal = document.getElementById("newBookModal");
const btn = document.getElementById("newBookBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('newBookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;

    addBookToLibrary(title, author, pages, read);
    modal.style.display = "none";
    this.reset();
});

// Manually add a few books for display
addBookToLibrary('1984', 'George Orwell', 328, 'read');
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, 'not read');
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'read');
