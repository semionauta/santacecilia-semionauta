  document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});

// --- Navbar ---
    const navbar = document.getElementById("navbar");
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      toggle.classList.toggle("active");
      navbar.classList.toggle("menu-open");
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("visible");
      } else {
        navbar.classList.remove("visible");
        menu.classList.remove("active");
        toggle.classList.remove("active");
        navbar.classList.remove("menu-open");
      }
    });
  
// --- Slideshow ---
  const currentIndices = {};

  function nextSlide(id) {
    const slideshow = document.getElementById(id);
    const images = slideshow.querySelectorAll('img');
    if (!currentIndices[id] && currentIndices[id] !== 0) currentIndices[id] = 0;

    images[currentIndices[id]].style.display = 'none';
    currentIndices[id] = (currentIndices[id] + 1) % images.length;
    images[currentIndices[id]].style.display = 'block';
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.slideshow').forEach(slideshow => {
      const id = slideshow.id;
      const images = slideshow.querySelectorAll('img');
      currentIndices[id] = 0;
      images.forEach((img, i) => {
        img.style.display = (i === 0) ? 'block' : 'none';
      });

      // Avvio dello scorrimento automatico ogni 4 secondi
      setInterval(() => nextSlide(id), 4000);
    });
  });