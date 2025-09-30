// main.js

import './scss/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  
  // LÓGICA PARA EL HEADER FIJO
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // LÓGICA PARA ANIMACIONES AL HACER SCROLL
  // Seleccionamos todos los elementos que tengan el atributo 'data-animate-on-scroll'
  const animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Se dispara cuando el 10% del elemento es visible
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
});