const formulario = document.getElementById("formulario");
const sucesso = document.getElementById("sucesso");
const botao = document.getElementById("btn");

function mostrarCamposInvalidos() {
  formulario.classList.add("formulario-validado");
}

botao.addEventListener("click", mostrarCamposInvalidos);
formulario.addEventListener("invalid", mostrarCamposInvalidos, true);

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  mostrarCamposInvalidos();

  // Se HTML5 validar tudo
  if (formulario.checkValidity()) {

    sucesso.classList.add("mostrar");

    botao.classList.add("btn-sucesso");

    setTimeout(() => {
      botao.classList.remove("btn-sucesso");
    }, 600);

    formulario.reset();
    formulario.classList.remove("formulario-validado");

    setTimeout(() => {
      sucesso.classList.remove("mostrar");
    }, 4000);
  }
});
