import { editAlbumById, deleteAlbumById, getAlbumById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (album, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.title}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: ${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->

            ${buttonControls(album,isOwner,onDelete )}


        </div>
    </div>
</section>`;

const buttonControls = (album, isOwner, onDelete) => {
    if (isOwner) {
        return html`<div class="actionBtn">
    <a href="/edit/${album._id}" class="edit">Edit</a>
    <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>
</div>`
    }else {
        return null;
    }
}

export async function detailsPage(context) {
    const album = await getAlbumById(context.params.id);

    const userData = getUserData();
    const isOwner = userData && album._ownerId == userData.id;


    console.log(context.params);
    context.render(detailsTemplate(album,  isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this album?');

        if (choice) {
            await deleteAlbumById(context.params.id);
            context.page.redirect('/catalog');
        }
    }
}