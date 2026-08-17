document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    document.body.appendChild(lightbox);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  const mainImg = document.querySelector('.pub-main-image img');
  const thumbs = document.querySelectorAll('.pub-thumb-item');

  // Build the ordered list of images to navigate through
  const images = thumbs.length
    ? Array.from(thumbs).map(t => ({ src: t.src, alt: t.alt }))
    : Array.from(document.querySelectorAll('.pub-gallery img, .pub-body img')).map(img => ({ src: img.src, alt: img.alt }));

  let currentIndex = 0;

  function setMainImage(index) {
    if (!mainImg) return;
    currentIndex = index;
    mainImg.src = images[index].src;
    mainImg.alt = images[index].alt;
    thumbs.forEach(t => t.classList.remove('active'));
    if (thumbs[index]) thumbs[index].classList.add('active');
  }

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    lightbox.classList.add('open');
  }

  function showLightboxImage(index) {
    currentIndex = (index + images.length) % images.length; // wraps around both directions
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  // Click main image -> open lightbox at current index
  if (mainImg) {
    mainImg.addEventListener('click', () => {
      const idx = images.findIndex(i => i.src === mainImg.src);
      openLightbox(idx >= 0 ? idx : 0);
    });
  }

  // Click thumbnail -> swap main image (not lightbox)
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      setMainImage(parseInt(thumb.dataset.index, 10));
    });
  });

  // Fallback: any other gallery/body image opens lightbox directly
  document.querySelectorAll('.pub-gallery img:not(.pub-thumb-item), .pub-body img').forEach(img => {
    if (img === mainImg) return;
    img.addEventListener('click', () => {
      const idx = images.findIndex(i => i.src === img.src);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showLightboxImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => showLightboxImage(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') showLightboxImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(currentIndex + 1);
    if (e.key === 'Escape') closeLightbox();
  });
});