btnCadastrarProduto = document.getElementById("btnCadastrarProduto")
let tabela = document.getElementById('tabela-corpo')

btnCadastrarProduto.addEventListener('click', () => {

    const nome = document.getElementById("nome").value
    const descricao = document.getElementById("descricao").value
    const modelo = document.getElementById("modelo").value
    const preco = document.getElementById("preco").value
    const ativo = document.getElementById("ativo").value === "true"

    const res = document.getElementById("res")

    const valores = {
        nome: nome,
        descricao: descricao,
        modelo:modelo,
        preco:preco,
        ativo:ativo
    }

    fetch('http://localhost:3000/produto',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados => {
        if (!dados.error) {
            res.innerHTML = `
            nome: ${dados.produto.nome}<br>
            descricao: ${dados.produto.descricao}<br>
            modelo:${dados.produto.modelo}<br>
            preco:${dados.produto.preco}<br>
            `
        } else {
            res.innerHTML = dados.error ? dados.error : "Erro ao cadastrar"
        }
    })
    .catch((err)=>{
        alert('Erro ao cadastrar os produtos')
        console.error('Erro ao cadastrar os produtos',err)
    })
})

function listarProdutos() {
    fetch("http://localhost:3000/produto")
        .then(r => r.json())
        .then(produtos => {
            tabela.innerHTML = ""

            produtos.forEach(p => {
                tabela.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.nome}</td>
                        <td>${p.modelo}</td>
                        <td>R$ ${p.preco}</td>
                        <td>${p.ativo ? "Sim" : "Não"}</td>
                        <td>
                            <button onclick="editarProduto(${p.id})">Editar</button>
                            <button onclick="deletarProduto(${p.id})">Excluir</button>
                        </td>
                    </tr>
                `
            })
        })
}

// APAGAR
function deletarProduto(id) {
    if (!confirm("Deseja excluir este produto?")) return

    fetch(`http://localhost:3000/produto/${id}`, {
        method: "DELETE"
    })
    .then(r => r.json())
    .then(dados => {
        alert(dados.mensagem)
        listarProdutos()
    })
}

// EDITAR (PATCH)
function editarProduto(id) {
    const novoNome = prompt("Novo nome:")
    if (!novoNome) return

    fetch(`http://localhost:3000/produto/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome })
    })
    .then(r => r.json())
    .then(() => listarProdutos())
}

window.onload = () => {
    listarProdutos()
}