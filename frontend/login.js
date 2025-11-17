function viewChange(temConta){
            
    if(temConta){
        document.getElementById('login').style.display = 'none'
        document.getElementById('cadastrar').style.display = 'flex'
    } else {
        document.getElementById('login').style.display = 'flex'
        document.getElementById('cadastrar').style.display = 'none'
    }

}

const btnLogin = document.getElementById('btnLogin')
const btnCadastrar = document.getElementById('btnCadastrar')

btnLogin.addEventListener('click', ()=>{

    
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email,senha})
    })
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)
        if(dados.error){
            alert(dados.error)
        }
        else{
            sessionStorage.setItem('statusLog', dados.statusLog)
            sessionStorage.setItem('nome', dados.nome)
            alert(dados.message)
        }
    })
    .catch((err)=>{
        alert('Erro')
        console.error(err)
    })

})

btnCadastrar.addEventListener('click', ()=>{

    let nome = document.getElementById('nome').value
    let email = document.getElementById('emailCadastrar').value
    let telefone = document.getElementById('telefone').value
    let senha = document.getElementById('senhaCadastrar').value
    let confirmarSenha = document.getElementById('confirmarSenha').value

    const valores = {
        nome,
        email,
        telefone,
        senha
    }

    if(senha === confirmarSenha){
        fetch('http://localhost:3000/cliente', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(valores)
        })
        .then(resp => resp.json())
        .then(dados => {
            if(dados.error){
                alert(dados.error)
            }
            else{
                alert(dados.message)
            }
        })
        .catch((err)=>{
            alert('Erro')
            console.error(err)
        })
    } else {
        alert('As senha não coincidem')
    }


})