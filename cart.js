// js/cart.js
document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  const buttons = document.querySelectorAll(".add-to-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");

  // Recupera carrinho do localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Atualiza contador
  const updateCartCount = () => {
    if (cartCount) {
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = total;
    }
  };

  // Salva no localStorage
  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  };

  // Adiciona ao carrinho
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      const existing = cart.find((item) => item.name === name);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      saveCart();
      alert(`${name} adicionado ao carrinho!`);
    });
  });

  // Renderiza carrinho em carrinho.html
  const renderCart = () => {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p class='text-gray-600'>Seu carrinho está vazio.</p>";
      if (cartTotal) cartTotal.textContent = "Total: R$ 0,00";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      cartItemsContainer.innerHTML += `
        <div class="flex justify-between items-center border-b py-3">
          <span>${item.name} (x${item.quantity})</span>
          <div class="flex items-center gap-4">
            <span>R$ ${itemTotal.toFixed(2)}</span>
            <button class="remove-item bg-red-500 text-white px-2 py-1 rounded text-sm" data-index="${index}">❌</button>
          </div>
        </div>
      `;
    });

    if (cartTotal) {
      cartTotal.textContent = "Total: R$ " + total.toFixed(2);
    }

    // Eventos de remover
    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart.splice(index, 1);
        saveCart();
      });
    });
  };

  // Esvaziar carrinho
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
        cart = [];
        saveCart();
      }
    });
  }

  // Inicializa
  updateCartCount();
  renderCart();
});
