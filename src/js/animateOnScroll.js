// src/js/animateOnScroll.js

// Opciones por defecto, se pueden sobreescribir si es necesario
const defaultOptions = {
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.1,
};

// La función que crea y activa el observador
const createScrollObserver = (
  targetSelector = '[data-animate-on-scroll]', 
  triggerClass = 'is-visible', 
  options = defaultOptions
) => {
  const elementsToAnimate = document.querySelectorAll(targetSelector);
  
  if (elementsToAnimate.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(triggerClass);
        // Opcional: deja de observar el elemento una vez animado para ahorrar recursos
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
};

// Exportamos la función para poder usarla en otros archivos
export default createScrollObserver;