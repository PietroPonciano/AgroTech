function EnviaForm() {

    let Nome = document
        .getElementById('nome-completo')
        .value;

    let Email = document
        .getElementById('email')
        .value;

    let Mensagem = document
        .getElementById('mensagem')
        .value;

    const erro = document.getElementById("erro");

    const form = document.getElementById("formulario");

    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(Email);

    erro.classList.remove("hidden");
    erro.classList.add("erro");

    if (!Nome.trim().includes(" ")) {

        erro.innerHTML =
            "Digite nome e sobrenome";

        return;
    }

    if (!emailValido) {

        erro.innerHTML =
            "Digite um email válido";

        return;
    }

    if (Mensagem.trim() === '') {

        erro.innerHTML =
            "Digite uma mensagem";

        return;
    }

    erro.classList.add("hidden");

    form.submit();
}