// --- Effetto scroll e line-height dinamico ---
    document.addEventListener('DOMContentLoaded', () => {
      const adjustLineHeight = () => {
        const sections = document.querySelectorAll('section p, section li');
        const scrollPos = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scaleFactor = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
        const lineHeight = 1.4 + (scaleFactor * 0.6);
        sections.forEach(section => {
          section.style.lineHeight = lineHeight;
        });
      };

      window.addEventListener('scroll', adjustLineHeight);

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          } else {
            entry.target.classList.remove('visible');
          }
        });
      }, { threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
      });

      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });

      adjustLineHeight();
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