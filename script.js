// --- Effetto scroll e line-height dinamico ---
  document.addEventListener('DOMContentLoaded', () => {
    const sectionsText = document.querySelectorAll('section p, section li');
    let lastLineHeight = null;

    const smoothLineHeight = () => {
        if (window.innerWidth <= 600) return;
      const scrollPos = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scaleFactor = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
      const newLineHeight = (1.4 + (scaleFactor * 0.6)).toFixed(2);

      // Applica solo se cambia visibilmente
      if (newLineHeight !== lastLineHeight) {
        sectionsText.forEach(el => {
          el.style.lineHeight = newLineHeight;
        });
        lastLineHeight = newLineHeight;
      }
    };

    // Usa requestAnimationFrame per ottimizzare lo scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          smoothLineHeight();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Intersection Observer per l’animazione d’entrata
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // osserva solo 1 volta
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    smoothLineHeight(); // iniziale
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
