// main.js
document.addEventListener('DOMContentLoaded', function() {
  // Navegación
  const menuItems = document.querySelectorAll('.menu-item');
  const sections = document.querySelectorAll('.section');
  const buttons = document.querySelectorAll('[data-section]');
  
  // Función para cambiar de sección
  function navigateTo(sectionId) {
    // Ocultar todas las secciones
    sections.forEach(section => section.classList.remove('active'));
    
    // Desactivar todos los items del menú
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Activar el item del menú correspondiente
    document.querySelector(`.menu-item[data-section="${sectionId}"]`).classList.add('active');
    
    // Scroll al inicio
    window.scrollTo(0, 0);
  }
  
  // Event listeners para navegación
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      navigateTo(section);
    });
  });
  
  // Event listeners para botones CTA
  buttons.forEach(button => {
    if (button.hasAttribute('data-section')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('data-section');
        navigateTo(section);
      });
    }
  });
  
  // Parallax en hero section
  const hero = document.querySelector('.hero-kinetic');
  const gradientSphere = document.querySelector('.gradient-sphere');
  
  window.addEventListener('mousemove', (e) => {
    if (!hero || !gradientSphere) return;
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const moveX = (x - 0.5) * 40;
    const moveY = (y - 0.5) * 40;
    
    gradientSphere.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
  });
  
  // Feature cards hover effect
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
      
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.left = `${x - 50}px`;
        glow.style.top = `${y - 50}px`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
});
