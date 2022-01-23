import {page} from './lib.js';

page('/', () => console.log('home'));
page('/create', () => console.log('createView'));
page('/details/:id', () => console.log('details'));
page('/edit/:id', () => console.log('edit View'));
page('/login', () => console.log('login View'));
page('/register', () => console.log('register View'));
page('/my-furniture', () => console.log('my-furniture View'));

page.start();