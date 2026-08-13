document.addEventListener("DOMContentLoaded", function () {

  function setupSnipcartHeaderHide() {
    Snipcart.events.on('theme.routechanged', function (routesChange) {
      const header = document.querySelector('header');

      if (routesChange.from === "/" && routesChange.to !== "/") {
        // cart opened
        header.classList.add('header-hidden');
      }

      if (routesChange.from !== "/" && routesChange.to === "/") {
        // cart closed
        header.classList.remove('header-hidden');
      }
    });
  }

  if (window.Snipcart) {
    setupSnipcartHeaderHide();
  } else {
    document.addEventListener('snipcart.ready', setupSnipcartHeaderHide);
  }

  // ... your existing price-list code stays exactly the same below this
  document.querySelectorAll(".purchase-option").forEach(function (section) {
    const list = section.querySelector(".price-list");
    const buyButton = section.querySelector(".purchase-button");
    if (!list || !buyButton) return;

    const prefix = list.dataset.target.replace("-price", "");

    list.addEventListener("click", function (e) {
      const btn = e.target.closest(".price-option");
      if (!btn) return;

      list.querySelectorAll(".price-option").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      buyButton.dataset.selectedPrice = btn.dataset.price;
    });

    buyButton.addEventListener("click", function () {
      const price = buyButton.dataset.selectedPrice;
      const product = document.getElementById(prefix + "-product-" + price);
      if (product) {
        product.click();
      }
    });
  });

});