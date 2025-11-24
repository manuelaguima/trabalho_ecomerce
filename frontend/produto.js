btnCadastrarProduto = document.getElementById("btnCadastrarProduto")

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
        if (resp.status === 201) {
            res.innerHTML = "Produto cadastrado com sucesso!"
        } else {
            res.innerHTML = dados.erro || "Erro ao cadastrar"
        }
    })
    .catch((err)=>{
        alert('Erro ao cadastrar os produtos')
        console.error('Erro ao cadastrar os produtos',err)
    })

    // try {
    //     const resp = await fetch("http://localhost:3000/produtos", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(valores)
    //     })

    //     const dados = await resp.json()

    //     if (resp.status === 201) {
    //         res.style.color = "green"
    //         res.textContent = "Produto cadastrado com sucesso!"
    //     } else {
    //         res.style.color = "red"
    //         res.textContent = dados.erro || "Erro ao cadastrar"
    //     }

    // } catch (err) {
    //     res.style.color = "red"
    //     res.textContent = "Erro de conexão com o servidor"
    // }
})
