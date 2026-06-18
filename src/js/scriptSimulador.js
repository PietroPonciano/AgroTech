document.addEventListener("DOMContentLoaded", () => {
    const culturas = {
        milho: {
            nome: "Milho",
            produtividade: 5426,
            fonte: "IBGE/PAM 2024"
        },
        feijao: {
            nome: "Feijão",
            produtividade: 1147,
            fonte: "IBGE/PAM 2024"
        },
        tomate: {
            nome: "Tomate",
            produtividade: 72760,
            fonte: "IBGE/PAM 2024"
        },
        alface: {
            nome: "Alface",
            produtividade: 18600,
            fonte: "Embrapa"
        },
        mandioca: {
            nome: "Mandioca",
            produtividade: 15465,
            fonte: "IBGE/PAM 2024"
        }
    };

    const formulario = document.getElementById("simulador-form");
    const campoCultura = document.getElementById("simulador-cultura");
    const campoArea = document.getElementById("simulador-area");
    const producaoEstimada = document.getElementById("simulador-producao");
    const dica = document.getElementById("simulador-dica");

    if (!formulario || !campoCultura || !campoArea || !producaoEstimada || !dica) {
        return;
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
    });
    formulario.addEventListener("input", calcularProducao);
    formulario.addEventListener("change", calcularProducao);

    calcularProducao();

    function calcularProducao() {
        const cultura = culturas[campoCultura.value];
        const area = obterArea();
        const producao = area * cultura.produtividade;

        producaoEstimada.textContent = formatarPeso(producao);
        dica.textContent = `${cultura.nome}: ${formatarNumero(cultura.produtividade)} kg/ha. Fonte: ${cultura.fonte}.`;
    }

    function obterArea() {
        const area = Number(campoArea.value);
        return Number.isFinite(area) && area > 0 ? area : 0;
    }

    function formatarNumero(valor) {
        return new Intl.NumberFormat("pt-BR", {
            maximumFractionDigits: 1
        }).format(valor);
    }

    function formatarPeso(valor) {
        if (valor >= 1000) {
            return `${formatarNumero(valor / 1000)} t`;
        }

        return `${formatarNumero(valor)} kg`;
    }
});
