const API_URL = "http://localhost:3000/estoque";

// Botão cadastrar
document.getElementById("btnCadastrarEstoque").onclick = async () => {

    const novoEstoque = {
        idProduto: document.getElementById("idProduto").value,
        quantidade_atual: document.getElementById("quantidade_atual").value,
        quantidade_minima: document.getElementById("quantidade_minima").value
    };

    if (!novoEstoque.idProduto || novoEstoque.quantidade_atual === "" || novoEstoque.quantidade_minima === "") {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoEstoque)
        });

        const data = await response.json();
        alert(data.message);

        listarEstoques();

    } catch (err) {
        console.error(err);
        alert("Erro ao cadastrar estoque!");
    }
};

// Listar
async function listarEstoques() {
    try {
        const response = await fetch(API_URL);
        const lista = await response.json();

        const tabela = document.getElementById("tabelaEstoque");
        tabela.innerHTML = "";

        lista.forEach(e => {
            tabela.innerHTML += `
                <tr>
                    <td>${e.codEstoque}</td>
                    <td>${e.idProduto}</td>
                    <td>${e.quantidade_atual}</td>
                    <td>${e.quantidade_minima}</td>
                </tr>
            `;
        });

    } catch (err) {
        console.error(err);
        alert("Erro ao carregar estoques!");
    }
}

listarEstoques();
