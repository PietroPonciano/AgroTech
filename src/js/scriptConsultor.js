document.addEventListener("DOMContentLoaded", () => {
    const chaveResultado = "consultorAgroTechResultado";
    const chaveAberto = "consultorAgroTechAberto";

    // Dados das soluções
    const solucoes = {
        plantio: {
            titulo: "Plantio Inteligente",
            descricao: "Ajuda você a planejar melhor o momento de plantar e tomar decisões com mais segurança."
        },
        clima: {
            titulo: "Monitoramento Climático",
            descricao: "Ajuda você a acompanhar mudanças no clima e agir antes que o prejuízo aconteça."
        },
        gestao: {
            titulo: "Gestão da Produção",
            descricao: "Ajuda você a organizar informações, etapas e decisões importantes da sua produção."
        },
        sustentabilidade: {
            titulo: "Recomendações Sustentáveis",
            descricao: "Ajuda você a reduzir desperdícios e usar melhor os recursos disponíveis no campo."
        }
    };

    // Perguntas do diagnóstico
    const perguntas = [
        {
            texto: "Como você define o melhor momento para plantar?",
            opcoes: [
                { texto: "Tenho dificuldade para decidir o melhor momento", pontos: { plantio: 3 } },
                { texto: "Decido pela experiência e observação do campo", pontos: { plantio: 2 } },
                { texto: "Uso previsão, dados ou ferramentas digitais", pontos: { plantio: 0 } }
            ]
        },
        {
            texto: "Como você acompanha mudanças no clima que podem afetar sua produção?",
            opcoes: [
                { texto: "Não acompanho com frequência", pontos: { clima: 3 } },
                { texto: "Acompanho por aplicativos ou previsão comum", pontos: { clima: 2 } },
                { texto: "Uso informações organizadas para tomar decisões", pontos: { clima: 0 } }
            ]
        },
        {
            texto: "Como você organiza as informações da sua produção?",
            opcoes: [
                { texto: "Fica tudo na memória ou em anotações soltas", pontos: { gestao: 3 } },
                { texto: "Uso caderno ou planilha simples", pontos: { gestao: 2 } },
                { texto: "Uso algum sistema ou controle mais organizado", pontos: { gestao: 0 } }
            ]
        },
        {
            texto: "Como você controla o uso de água, insumos e recursos da produção?",
            opcoes: [
                { texto: "Não tenho um controle definido", pontos: { sustentabilidade: 3 } },
                { texto: "Faço controle básico quando percebo necessidade", pontos: { sustentabilidade: 2 } },
                { texto: "Já acompanho e tento reduzir desperdícios", pontos: { sustentabilidade: 0 } }
            ]
        },
        {
            texto: "O que você gostaria de melhorar primeiro?",
            opcoes: [
                { texto: "Aumentar produtividade", pontos: { plantio: 2 } },
                { texto: "Evitar prejuízos com clima", pontos: { clima: 2 } },
                { texto: "Organizar melhor a produção", pontos: { gestao: 2 } },
                { texto: "Reduzir desperdícios", pontos: { sustentabilidade: 2 } }
            ]
        },
        {
            texto: "Depois dessas perguntas, qual você considera seu maior desafio hoje?",
            opcoes: [
                { texto: "Planejar o plantio", pontos: { plantio: 3 } },
                { texto: "Lidar com o clima", pontos: { clima: 3 } },
                { texto: "Organizar a produção", pontos: { gestao: 3 } },
                { texto: "Usar melhor os recursos", pontos: { sustentabilidade: 3 } }
            ]
        }
    ];

    // Elementos do consultor
    const consultor = document.querySelector(".consultor");
    const botaoAbrir = document.querySelector(".consultor__botao");
    const botaoChamada = document.querySelector(".consultor__chamada");
    const botaoFechar = document.querySelector(".consultor__fechar");
    const painel = document.querySelector(".consultor__painel");
    const conteudo = document.querySelector("[data-consultor-conteudo]");

    let perguntaAtual = 0;
    let pontuacao = criarPontuacao();

    aplicarDestaquesSolucoes();

    if (!consultor || !botaoAbrir || !botaoChamada || !botaoFechar || !painel || !conteudo) {
        return;
    }

    mostrarInicio();

    if (localStorage.getItem(chaveAberto) !== "sim") {
        setTimeout(() => {
            if (!consultor.classList.contains("consultor--aberto")) {
                consultor.classList.add("consultor--chamada-visivel");
            }
        }, 3500);
    }

    botaoAbrir.addEventListener("click", abrirPainel);
    botaoChamada.addEventListener("click", abrirPainel);
    botaoFechar.addEventListener("click", fecharPainel);

    // Abre e fecha o painel
    function abrirPainel() {
        consultor.classList.add("consultor--aberto");
        consultor.classList.remove("consultor--chamada-visivel");
        botaoAbrir.setAttribute("aria-expanded", "true");
        painel.setAttribute("aria-hidden", "false");
        localStorage.setItem(chaveAberto, "sim");
    }

    function fecharPainel() {
        consultor.classList.remove("consultor--aberto");
        botaoAbrir.setAttribute("aria-expanded", "false");
        painel.setAttribute("aria-hidden", "true");
    }

    function criarPontuacao() {
        return {
            plantio: 0,
            clima: 0,
            gestao: 0,
            sustentabilidade: 0
        };
    }

    function mostrarInicio() {
        conteudo.innerHTML = `
            <div class="consultor__mensagem">
                Olá! Eu sou o Consultor AgroTech.<br>
                Responda algumas perguntas rápidas para descobrir quais soluções combinam mais com sua necessidade no campo.
            </div>
            <div class="consultor__acoes">
                <button class="consultor__acao" type="button" data-iniciar-consultor>Começar diagnóstico</button>
            </div>
        `;

        conteudo.querySelector("[data-iniciar-consultor]").addEventListener("click", iniciarDiagnostico);
    }

    function iniciarDiagnostico() {
        perguntaAtual = 0;
        pontuacao = criarPontuacao();
        mostrarPerguntaAtual();
    }

    // Mostra a pergunta atual
    function mostrarPerguntaAtual() {
        const pergunta = perguntas[perguntaAtual];
        const opcoes = pergunta.opcoes.map((opcao, indice) => `
            <button class="consultor__resposta" type="button" data-resposta="${indice}">
                ${opcao.texto}
            </button>
        `).join("");

        conteudo.innerHTML = `
            <p class="consultor__progresso">Pergunta ${perguntaAtual + 1} de ${perguntas.length}</p>
            <h3 class="consultor__pergunta">${pergunta.texto}</h3>
            <div class="consultor__acoes">
                ${opcoes}
            </div>
        `;

        conteudo.querySelectorAll("[data-resposta]").forEach((botao) => {
            botao.addEventListener("click", () => registrarResposta(Number(botao.dataset.resposta)));
        });
    }

    // Registra resposta
    function registrarResposta(indiceResposta) {
        const resposta = perguntas[perguntaAtual].opcoes[indiceResposta];

        Object.keys(resposta.pontos).forEach((solucao) => {
            pontuacao[solucao] += resposta.pontos[solucao];
        });

        perguntaAtual += 1;

        if (perguntaAtual < perguntas.length) {
            mostrarPerguntaAtual();
            return;
        }

        const resultado = calcularResultado();
        salvarResultado(resultado);
        mostrarResultado(resultado);
    }

    // Calcula resultado
    function calcularResultado() {
        const ranking = Object.keys(pontuacao)
            .map((chave) => ({ chave, pontos: pontuacao[chave] }))
            .sort((a, b) => b.pontos - a.pontos);

        const principal = ranking[0].chave;
        const secundarias = ranking
            .slice(1)
            .filter((item) => item.pontos > 0)
            .slice(0, 2)
            .map((item) => item.chave);

        return { principal, secundarias };
    }

    // Mostra resultado
    function mostrarResultado(resultado) {
        const solucaoPrincipal = solucoes[resultado.principal];
        const listaSecundarias = resultado.secundarias.map((chave) => `
            <li>${solucoes[chave].titulo}</li>
        `).join("");

        const ajuda = resultado.secundarias.length > 0
            ? `
                <div class="consultor__resultado-bloco">
                    <p class="consultor__resultado-label">Também pode ajudar:</p>
                    <ul class="consultor__lista-ajuda">${listaSecundarias}</ul>
                </div>
            `
            : "";

        conteudo.innerHTML = `
            <h3 class="consultor__resultado-titulo">Seu diagnóstico AgroTech</h3>
            <div class="consultor__resultado-bloco">
                <p class="consultor__resultado-label">Necessidade principal:</p>
                <p class="consultor__resultado-nome">${solucaoPrincipal.titulo}</p>
                <p class="consultor__resultado-texto">${solucaoPrincipal.descricao}</p>
            </div>
            ${ajuda}
            <div class="consultor__acoes">
                <button class="consultor__acao" type="button" data-ver-solucoes>Ver soluções indicadas</button>
                <button class="consultor__acao consultor__acao--secundaria" type="button" data-refazer-consultor>Refazer diagnóstico</button>
                <button class="consultor__acao consultor__acao--secundaria" type="button" data-fechar-consultor>Fechar</button>
            </div>
        `;

        conteudo.querySelector("[data-ver-solucoes]").addEventListener("click", irParaSolucoes);
        conteudo.querySelector("[data-refazer-consultor]").addEventListener("click", iniciarDiagnostico);
        conteudo.querySelector("[data-fechar-consultor]").addEventListener("click", fecharPainel);
    }

    // Salva resultado no navegador
    function salvarResultado(resultado) {
        localStorage.setItem(chaveResultado, JSON.stringify(resultado));
    }

    function irParaSolucoes() {
        const emPaginaInterna = window.location.pathname.includes("/src/pages/");
        window.location.href = emPaginaInterna ? "solucoes.html" : "src/pages/solucoes.html";
    }

    // Aplica destaque na página Soluções
    function aplicarDestaquesSolucoes() {
        const cards = document.querySelectorAll("[data-solucao]");

        if (cards.length === 0) {
            return;
        }

        const resultadoSalvo = localStorage.getItem(chaveResultado);

        if (!resultadoSalvo) {
            return;
        }

        let resultado;

        try {
            resultado = JSON.parse(resultadoSalvo);
        } catch (erro) {
            localStorage.removeItem(chaveResultado);
            return;
        }

        if (!resultado.principal || !Array.isArray(resultado.secundarias)) {
            return;
        }

        cards.forEach((card) => {
            const tipoSolucao = card.dataset.solucao;
            card.classList.remove("solucao-recomendada", "solucao-secundaria");

            const seloAntigo = card.querySelector(".solucoes__selo");

            if (seloAntigo) {
                seloAntigo.remove();
            }

            if (tipoSolucao === resultado.principal) {
                adicionarSelo(card, "Recomendado para você");
                card.classList.add("solucao-recomendada");
            }

            if (resultado.secundarias.includes(tipoSolucao)) {
                adicionarSelo(card, "Também pode ajudar");
                card.classList.add("solucao-secundaria");
            }
        });
    }

    function adicionarSelo(card, texto) {
        const selo = document.createElement("span");
        selo.className = "solucoes__selo";
        selo.textContent = texto;
        card.prepend(selo);
    }
});
