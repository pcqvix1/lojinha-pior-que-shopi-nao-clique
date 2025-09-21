let cartCount = 0;

// seleciona todos os botões "Adicionar ao carrinho"
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;
  });
});

// clique no carrinho para exibir alerta (fake)
document.getElementById("cart-btn").addEventListener("click", () => {
  alert(`Você tem ${cartCount} item(s) no carrinho 🛒`);
});
