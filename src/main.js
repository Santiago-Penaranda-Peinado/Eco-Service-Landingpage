// main.js - VERSIÓN CORREGIDA

import './scss/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  
  // --- LÓGICA PARA EL PRELOADER ---
  const initPreloader = () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      // El evento 'load' espera a que TODO (imágenes, scripts, etc.) se haya cargado
      window.addEventListener('load', () => {
        preloader.classList.add('is-hidden');
      });
    }
  };

  // --- LÓGICA MEJORADA PARA EL CARRUSEL DE IMÁGENES DEL HERO ---
  const initHeroSlider = () => {
    const imageSlider = document.querySelector('.shape-1');
    
    if (imageSlider) {
      const images = imageSlider.querySelectorAll('.slide-image');
      let currentIndex = 0;
      const slideInterval = 4000;
      
      if (images.length > 1) {
        const nextSlide = () => {
          images[currentIndex].classList.remove('is-active');
          currentIndex = (currentIndex + 1) % images.length;
          images[currentIndex].classList.add('is-active');
        };
        
        let sliderInterval = setInterval(nextSlide, slideInterval);
        
        imageSlider.addEventListener('mouseenter', () => {
          clearInterval(sliderInterval);
        });
        
        imageSlider.addEventListener('mouseleave', () => {
          sliderInterval = setInterval(nextSlide, slideInterval);
        });
        
        imageSlider.addEventListener('touchstart', () => {
          clearInterval(sliderInterval);
        });
      } else if (images.length === 1) {
        images[0].classList.add('is-active');
      }
    }
  };

  // --- LÓGICA BASE PARA TABS DE SERVICIOS (CORREGIDA) ---
    const initServicesTabs = () => {
      // EL CAMBIO CLAVE ESTÁ AQUÍ: Buscamos la clase correcta.
      const layout = document.querySelector('.services-interactive-area'); 
      if (!layout) return;

      const navItems = layout.querySelectorAll('.service-nav-item');
      const detailPanels = layout.querySelectorAll('.service-detail');

      navItems.forEach(button => {
        button.addEventListener('click', () => {
          const targetService = button.dataset.service;

          navItems.forEach(item => item.classList.remove('is-active'));
          detailPanels.forEach(panel => panel.classList.remove('is-active'));

          button.classList.add('is-active');

          const targetPanel = layout.querySelector(`.service-detail[data-service="${targetService}"]`);
          if (targetPanel) {
            targetPanel.classList.add('is-active');
          }
        });
      });
    };

  // --- LÓGICA HEADER FIJO (optimizada) ---
  const initHeaderScroll = () => {
    const header = document.querySelector('.site-header');
    if (header) {
      let lastScrollY = window.scrollY;
      
      const handleScroll = () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
      };
      
      // Throttle para mejor performance
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  };

  // --- LÓGICA MENÚ MÓVIL MEJORADA ---
  const initMobileMenu = () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (menuToggle && mainNav) {
      const navLinks = mainNav.querySelectorAll('li');
      
      const openMenu = () => {
        mainNav.classList.add('is-active');
        menuToggle.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
        
        // Animación en cascada mejorada
        navLinks.forEach((link, index) => {
          link.style.animationDelay = `${index * 80 + 200}ms`;
        });
      };
      
      const closeMenu = () => {
        mainNav.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        
        // Reset delays
        navLinks.forEach(link => {
          link.style.animationDelay = '0ms';
        });
      };
      
      const toggleMenu = () => {
        const isActive = mainNav.classList.contains('is-active');
        
        if (isActive) {
          closeMenu();
        } else {
          openMenu();
        }
      };

      // Event listeners
      menuToggle.addEventListener('click', toggleMenu);
      
      // Cerrar menú al hacer clic en un link
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          // Solo cerrar si es un enlace de ancla
          if (e.target.getAttribute('href').startsWith('#')) {
            closeMenu();
          }
        });
      });
      
      // Cerrar menú al presionar Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('is-active')) {
          closeMenu();
        }
      });
      
      // Cerrar menú al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (mainNav.classList.contains('is-active') && 
            !mainNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
          closeMenu();
        }
      });
    }
  };

  // --- LÓGICA ANIMACIONES SCROLL ---
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };

  // --- INICIALIZAR TODAS LAS FUNCIONES ---
  initPreloader();
  initHeroSlider();
  initServicesTabs();
  initHeaderScroll();
  initMobileMenu();
  initScrollAnimations();

});