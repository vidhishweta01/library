const myLibrary = [];
const submitButton = document.querySelector('.submit-btn');
const form = document.querySelector('form');

// FUNCTIONS
function validateForm() {
  const x = document.getElementById('title').value;
  let bool = true;

  if (x === '') {
    alert('Book cannot be empty');
    bool = false;
  }
  return bool;
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function saveData() {
  localStorage.setItem('length', parseInt(myLibrary.length)); // eslint-disable-line

  for (let i = 0; i < myLibrary.length; i + 1) {
    let j = parseInt(i); // eslint-disable-line
    localStorage.setItem(j, JSON.stringify(myLibrary[i]));
  }
}

function deleteBook() {
  myLibrary.splice(this.parentNode, 1);
  this.parentNode.remove();
}

function previousData() {
  const l = localStorage.getItem('length');

  for (let j = 0; j < l; j + 1) {
    let k = parseInt(j); // eslint-disable-line
    let obj = JSON.parse(localStorage.getItem(k));// eslint-disable-line
    document.getElementById('demo').innerHTML = obj.title + ' ' + obj.author + ' ' + obj.read;// eslint-disable-line
  }
}

function display() {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const title = document.createElement('h3');
    title.classList.add('book-title');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.classList.add('book-author');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.classList.add('book-pages');
    pages.textContent = `Pages: ${book.pages}`;

    const read = document.createElement('button');
    read.classList.add('book-read');
    read.textContent = book.read === 'Not yet read' ? 'Not yet read' : 'Finished reading.';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';

    bookDiv.append(title, author, pages, read, deleteButton);
    container.appendChild(bookDiv);

    read.addEventListener('click', (e) => {
      book.read = book.read === 'Not yet read'
        ? 'Finished reading'
        : 'Not yet read';
      e.target.textContent = e.target.textContent === 'Not yet read'
        ? 'Finished reading'
        : 'Not yet read';
    });

    deleteButton.addEventListener('click', deleteBook);
  });
}

// EVENT LISTENERS

submitButton.addEventListener('click', (bookData) => {
  bookData.preventDefault();
  previousData();

  if (validateForm()) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    pages = parseInt(pages); // eslint-disable-line
    let read = '';
    if (document.getElementById('Notyetread').checked) {
      read = document.getElementById('Notyetread').value;
    } else {
      read = document.getElementById('Finishedreading').value;
    }
    addBookToLibrary(title, author, pages, read);
  }
  saveData();
  form.reset();
  display();
});
