const form = document.getElementById("formContato");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const mensagem = document.getElementById("mensagem");

  let valido = true;

  limparErros();

  // Nome completo
  const nomeCompleto = nome.value.trim();
  const partesNome = nomeCompleto.split(" ").filter(parte => parte.length > 0);

  if (!nomeCompleto) {
    mostrarErro(nome, "O nome é obrigatório.");
    valido = false;
  } else if (partesNome.length < 2) {
    mostrarErro(nome, "Informe nome e sobrenome.");
    valido = false;
  } else {
    const nomeValido = partesNome.every(
      parte => parte.length >= 2
    );

    if (!nomeValido) {
      mostrarErro(
        nome,
        "Nome e sobrenome devem possuir pelo menos 2 letras."
      );
      valido = false;
    }
  }

  // E-mail
  const regexEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value.trim()) {
    mostrarErro(email, "O e-mail é obrigatório.");
    valido = false;
  } else if (!regexEmail.test(email.value)) {
    mostrarErro(email, "Digite um e-mail válido.");
    valido = false;
  }

  // Mensagem
  const textoMensagem = mensagem.value.trim();

  if (!textoMensagem) {
    mostrarErro(
      mensagem,
      "A descrição da mensagem é obrigatória."
    );
    valido = false;
  } else if (textoMensagem.length > 500) {
    mostrarErro(
      mensagem,
      "A mensagem deve possuir no máximo 500 caracteres."
    );
    valido = false;
  }

  if (valido) {
    const mensagemSucesso =
      document.querySelector(".mensagem-sucesso");

    mensagemSucesso.classList.add("mostrar");

    form.reset();

    setTimeout(() => {
      mensagemSucesso.classList.remove("mostrar");
    }, 5000);
  }
});

function mostrarErro(campo, mensagem) {
  campo.classList.add("is-invalid");

  const feedback =
    campo.parentElement.querySelector(".invalid-feedback");

  feedback.textContent = mensagem;
}

function limparErros() {
  document
    .querySelectorAll(".is-invalid")
    .forEach(campo => campo.classList.remove("is-invalid"));

  document
    .querySelectorAll(".invalid-feedback")
    .forEach(div => div.textContent = "");
}


// contador de caracteres

const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contadorMensagem");

mensagem.addEventListener("input", () => {
  contador.textContent =
    `${mensagem.value.length} / 500 caracteres`;
});