const formulario = document.getElementById("formulario");
const sucesso = document.getElementById("sucesso");
const botao = document.getElementById("btn");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  // Se HTML5 validar tudo
  if (formulario.checkValidity()) {

    sucesso.classList.add("mostrar");

    botao.classList.add("btn-sucesso");

    setTimeout(() => {
      botao.classList.remove("btn-sucesso");
    }, 600);

    formulario.reset();

    setTimeout(() => {
      sucesso.classList.remove("mostrar");
    }, 4000);
  }
});