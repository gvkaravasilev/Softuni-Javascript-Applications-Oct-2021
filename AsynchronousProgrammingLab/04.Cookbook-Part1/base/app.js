async function getRecipes() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';

    const response = await fetch(url);
    const recipes = await response.json();

    console.log(recipes);

    return Object.values(recipes);
}


window.addEventListener('load', visualize);

function visualize(){
    const mainSection = document.querySelector('main');

    createRecipe();
}

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/details/' + id);

    const recipe = await response.json();

    return recipe;
}

function createRecipe() {
    const article = document.createElement("article");

    article.innerHTML = `<h2>{recipe.name}</h2>
                         <div class="band">
                            <div class="thumb">
                                <img src = {..recipe.img}>
                            </div>
                            <div class ="ingredients">
                                <h3>Ingredients:</h3>
                                <ul>
                                </ul>
                            </div>
                         </div>
                         <div class="description">
                            <h3>Preparation:</h3>
                            <p>Prepare ingredients</p>
                            <p>Mix ingredients</p>
                            <p>Cook ingredients</p>
                         </div>`;
                         
    console.log(article);
                            
}
