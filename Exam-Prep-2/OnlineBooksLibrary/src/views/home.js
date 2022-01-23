import { html } from '../lib.js';
import { getAllBooks } from '../api/data.js';


const homeTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>

    ${books.length == 0 ? html`<p class="no-books">No books in database!</p>`  : 
    html`<ul class="other-books-list">
        ${books.map(bookCard)}
    </ul>`
    }
</section>`

const bookCard = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`

export async function homePage(context) {

    const books = await getAllBooks();
    context.render(homeTemplate(books));
}