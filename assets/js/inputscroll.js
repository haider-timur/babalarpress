document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.newsletter-form input').forEach(function (input) {
    input.addEventListener('focus', function () {
      setTimeout(function () {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);   // slight delay lets the keyboard finish animating open first
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const miniFooter = document.querySelector('.mini-footer');

  document.querySelectorAll('.newsletter-form input').forEach(function (input) {
    input.addEventListener('focus', function () {
      miniFooter.style.display = 'none';
    });

    input.addEventListener('blur', function () {
      miniFooter.style.display = 'flex';
    });
  });
});