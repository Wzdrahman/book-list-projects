class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
        // Create Element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>
        `
        list.appendChild(row);
    }
    showAlert(message, className){
         // Create Div
        const div = document.createElement('div');
        // add classes
        div.className = `alert ${className}`;
        // add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // get form
        const form = document.querySelector('#book-form');
        // insert alert
        container.insertBefore(div, form);

        // Timeout after three secound
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    deleteBook (target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    clearFields () {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
//  Event Listener for add
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get Form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');        
    }else{

        // Add book to list
        ui.addBookToList(book);

        // Show success notification
        ui.showAlert('Book added Successfully', 'success');
    
        // After Submit input Field should be clear
        ui.clearFields();
    }
    e.preventDefault();
});
// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    // Instantiate UI
    const ui = new UI();
    ui.deleteBook(e.target);

    // Show massage
    ui.showAlert('Book Removed Successfully', 'success');

    e.preventDefault();
});