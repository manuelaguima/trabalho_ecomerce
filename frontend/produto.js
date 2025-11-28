// BOTÕES
const btnCadastrarProduto = document.getElementById("btnCadastrarProduto");
const btnListar = document.getElementById("btnListar");
let tabela = document.getElementById("tabela-corpo");

// CADASTRAR
btnCadastrarProduto.addEventListener("click", () => {

    const valores = {
        nome: document.getElementById("nome").value,
        descricao: document.getElementById("descricao").value,
        modelo: document.getElementById("modelo").value,
        preco: document.getElementById("preco").value,
        ativo: document.getElementById("ativo").value === "true"
    };

    fetch("http://localhost:3000/produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valores)
    })
    .then(r => r.json())
    .then(dados => {
        const res = document.getElementById("res");

        if (dados.error) {
            res.innerHTML = dados.error;
            return;
        }

        res.innerHTML = `
            Produto cadastrado com sucesso! <br>
            Nome: ${dados.produto.nome}<br>
            Modelo: ${dados.produto.modelo}<br>
            Preço: R$ ${dados.produto.preco}
        `;
    })
    .catch(err => {
        alert("Erro ao cadastrar produto");
        console.error(err);
    });

});

// LISTAR PRODUTOS
btnListar.addEventListener("click", listarProdutos);

function listarProdutos() {
    fetch("http://localhost:3000/produto")
        .then(r => r.json())
        .then(produtos => {
            tabela.innerHTML = "";

            produtos.forEach(p => {
                tabela.innerHTML += `
                    <tr>
                        <td>${p.codProduto}</td>
                        <td>${p.nome}</td>
                        <td>${p.modelo}</td>
                        <td>R$ ${p.preco}</td>
                        <td>${p.ativo ? "Sim" : "Não"}</td>
                        <td>
                            <button onclick="editarProduto(${p.codProduto})">Editar</button>
                            <button onclick="deletarProduto(${p.codProduto})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// EXCLUIR
function deletarProduto(id) {
    if (!confirm("Deseja excluir este produto?")) return;

    fetch(`http://localhost:3000/produto/${id}`, {
        method: "DELETE"
    })
    .then(r => r.json())
    .then(() => listarProdutos());
}

// EDITAR (PATCH)
function editarProduto(id) {
    const novoNome = prompt("Novo nome:");
    if (!novoNome) return;

    fetch(`http://localhost:3000/produto/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome })
    })
    .then(r => r.json())
    .then(() => listarProdutos());
}
