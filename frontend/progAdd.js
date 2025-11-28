// Carrega carrinho existente
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Função para adicionar produto
function adicionarProduto(botao) {
  const nome = botao.dataset.nome;
  const preco = Number(botao.dataset.preco);
  const codProd = botao.dataset.codprod;

  // Pega o input correto dentro do card
  const card = botao.closest(".item");
  const input = card.querySelector(".input-qtde");

  const qtde = Number(input.value);

  const produto = { nome, preco, codProd, qtde };

  produtos.push(produto);
  localStorage.setItem('produtos', JSON.stringify(produtos));

  alert(`${qtde}x ${nome} adicionado(s) ao carrinho!`);
}

// Associa todos os botões automaticamente
document.querySelectorAll(".btn-add").forEach(botao => {
  botao.addEventListener("click", () => adicionarProduto(botao));
});
