function loadRepos() {

   const div = document.querySelector('div');
   const request = new XMLHttpRequest();

   const url = 'https://api.github.com/users/testnakov/repos';

   request.addEventListener('readystatechange', (e) => {
      if(request.readyState == 4 && request.status == 200){
         div.appendChild(request.responseText);
      }
   });

   request.open('GET', url);
   request.send();
}