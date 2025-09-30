// main.js

import './scss/style.scss'; // Asegúrate de que la ruta sea correcta

// LÓGICA PARA EL HEADER FIJO
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    // Si el scroll vertical es mayor a 50px...
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});