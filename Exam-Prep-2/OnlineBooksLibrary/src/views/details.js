import { html } from '../lib.js';
import { getBookById, deleteBookById } from '../api/data.js';
import {getUserData} from '../util.js';


const detailsTemplate = (book, isOwner, onDelete) => html`<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            

            ${bookControls(book, isOwner, onDelete)}
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`

const bookControls = (book, isOwner, onDelete) => {
    if(isOwner) {
        return html`
        <a class="button" href="/edit/${book._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
    }else{
        return null;
    }
};

export async function detailsPage(context) {

    const book = await getBookById(context.params.id);

    const userData = getUserData();

    const isOwner = userData && userData.id == book._ownerId;

    context.render(detailsTemplate(book, isOwner, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this book');

        if(choice){
            await deleteBookById(context.params.id);
            context.page.redirect('/')
        }
    }
}