document.getElementById("btn-login").addEventListener("click", () => {
    const user = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    if (user === "vendedor" && senha === "1234") {
        localStorage.setItem("vendedorLogado", "true");
        window.location.href = "painel.html";
    } else {
        erro.textContent = "Usuário ou senha incorretos!";
    }
});
