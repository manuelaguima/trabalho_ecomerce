// Controller de autenticação
const logado = localStorage.getItem("vendedorLogado");

// Se não estiver logado → volta para login
if (logado !== "true") {
    window.location.href = "login.html";
}
