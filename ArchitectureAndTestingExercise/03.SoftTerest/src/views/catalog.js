import {getAllIdeas} from '../api/data.js';

const section = document.getElementById('dashboard-holder');
section.remove();

export async function showCatalogPage(context){
    context.showSection(section);
    loadIdeas();
}

async function loadIdeas(){
    const ideas = await getAllIdeas();
    const fragment = document.createDocumentFragment();

    ideas.map(createIdeaCard).forEach(i => fragment.appendChild(i));
    
    section.replaceChildren(fragment);
}

function createIdeaCard(idea){
    const element = document.createElement('div');
    element.className = 'card overflow-hidden current-card details';
    element.style.width = '20rem';
    element.style.height = '18rem';

    element.innerHTML = `
<div class="card-body">
<p class="card-text">${idea.title}</p>
</div>
<img class="card-image" src="${idea.img}"
alt="Card image cap">
<a data-id = "${idea.id}" class="btn" href="">Details</a>
 `
   return element;
}

/*<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
<div class="card-body">
    <p class="card-text">Best Pilates Workouts to Do at Home</p>
</div>
<img class="card-image" src="./images/best-pilates-youtube-workouts-2__medium_4x3.jpg"
    alt="Card image cap">
<a class="btn" href="">Details</a>
</div>*/