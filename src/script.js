// Gestion du formulaire de connexion et d'inscription
const { app, BrowserWindow, ipcMain } = require('electron');
const inscriptionLink = document.getElementById('inscription-link');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const content = document.querySelector('.content');
const hero = document.querySelector('.hero');


// Lorsque l'utilisateur clique sur "Inscrivez-vous ici", afficher le formulaire d'inscription
inscriptionLink.addEventListener('click', (e) => {
  e.preventDefault();
 // loginForm.style.display = 'none';
 /*
  signupForm.style.display = 'block';
  content.style.overflowY = 'scroll';
  hero.style.height= '100%';*/
  const newWin = window.open('page2.html');
        newWin.focus();
});
