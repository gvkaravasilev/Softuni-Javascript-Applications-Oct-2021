import * as api from './api/data.js';
import {getUserData} from './util.js';
import {page, render} from './lib.js';
import {homePage} from './views/home.js';
import {loginPage} from './views/login.js';
import {registerPage} from './views/register.js';
import {logout} from './api/data.js';
import { catalogPage } from './views/catalog.js';
import {createPage} from './views/create.js'
import { detailsPage } from './views/details.js';
import {editPage} from './views/edit.js'



const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);


updateUserNav();
page.start();

function decorateContext(context, next) {
    context.render = (content) => render(content, root);
    context.updateUserNav = updateUserNav;
    next();
}

export function updateUserNav(){
    const userData = getUserData();

    if(userData){
        document.getElementById('catalogBtn').style.display = 'inline';
        document.getElementById('searchBtn').style.display = 'inline';
        document.getElementById('createBtn').style.display = 'inline';
        document.getElementById('logoutBtn').style.display = 'inline';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';

    }else{
        document.getElementById('catalogBtn').style.display = 'inline';
        document.getElementById('searchBtn').style.display = 'inline';
        document.getElementById('createBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('loginBtn').style.display = 'inline';
        document.getElementById('registerBtn').style.display = 'inline';
    }
}

function onLogout(){
    logout();
    updateUserNav();
    page.redirect('/');
}