document.addEventListener('DOMContentLoaded', function () {
  const menuWidget = document.getElementById('menu-widget');
  const menuToggle = document.getElementById('menu-toggle');
  const menuLabel = menuToggle.querySelector('.menu-toggle-label');
  const sidebarClose = document.getElementById('sidebar-close');

  const labelOpen = menuToggle.dataset.labelOpen;
  const labelClose = menuToggle.dataset.labelClose;

  menuToggle.addEventListener('click', function () {
    const isOpen = menuWidget.classList.toggle('open');
    menuLabel.textContent = isOpen ? labelClose : labelOpen;
  });

  sidebarClose.addEventListener('click', function () {
    menuWidget.classList.remove('open');
    menuLabel.textContent = labelOpen;
  });
});