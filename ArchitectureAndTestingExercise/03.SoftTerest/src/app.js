import { showHomePage } from './views/home.js';
import { showCatalogPage } from './views/catalog.js';
import { showLoginPage } from './views/login.js';
import { showRegisterPage } from './views/register.js';
import { showCreatePage } from './views/createPage.js';
import {showDetailsPage} from './views/details.js';
import {showSection} from './dom.js'

const links = {
    'homeLink': 'home',
    'getStartedLink': 'home',
    'catalogLink': 'catalog',
    'loginLink': 'login',
    'registerLink': 'register',
    'createLink': 'create'
};

const views = {
    'home': showHomePage,
    'catalog': showCatalogPage,
    'login': showLoginPage,
    'register': showRegisterPage,
    'create': showCreatePage,
    'details': showDetailsPage
};

const context = {
    goTo, 
    showSection,
    updateNav
}

goTo('home');



const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

function onNavigate(event){
    const name = links[event.target.id];

    if(name){
        event.preventDefault();
        goTo(name);
    }
}

function goTo(name, ...params){
    const view = views[name];

    if(typeof view == 'function'){
        view(context);
    }
}

function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if(userData != null){
        [...nav.querySelectorAll('.user')].forEach(l => l.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(l => l.style.display = 'none');
    }else{
        [...nav.querySelectorAll('.user')].forEach(l => l.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(l => l.style.display = 'block');
    }
}