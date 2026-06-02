document.addEventListener("DOMContentLoaded", () => {
    inicializarAcessibilidadeEModos();
    inicializarMenuMobile();
    inicializarCardsExpansiveis();
    inicializarGaleriaFiltros();
    inicializarSimuladorClima();
    inicializarCalculadoraEco();
    inicializarAnimacaoScroll();
    inicializarQuizComMedalhas();
});

/* 1. ACESSIBILIDADE, MODO ESCURO E ALTO CONTRASTE */
function inicializarAcessibilidadeEModos() {
    const btnDark = document.getElementById("btn-dark-mode");
    const btnContraste = document.getElementById("btn-alto-contraste");
    const btnDislexia = document.getElementById("btn-dislexia");

    if (btnDark) {
        btnDark.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("dark-mode");
            document.body.classList.remove("alto-contraste");
            btnDark.setAttribute("aria-pressed", ativo);
        });
    }

    if (btnContraste) {
        btnContraste.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("alto-contraste");
            document.body.classList.remove("dark-mode");
            btnContraste.setAttribute("aria-pressed", ativo);
        });
    }

    if (btnDislexia) {
        btnDislexia.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("fonte-dislexia");
            btnDislexia.setAttribute("aria-pressed", ativo);
        });
    }
}

/* 2. MENU MOBILE RESPONSIVO */
function inicializarMenuMobile() {
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            const ativo = navbar.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", ativo);
        });
    }
}

/* 3. CARDS EXPANSÍVEIS */
function inicializarCardsExpansiveis() {
    const botoes = document.querySelectorAll(".btn-expand");

    botoes.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            const card = evento.target.closest(".card-expand");
            const conteudoExtra = card.querySelector(".conteudo-extra");

            if (conteudoExtra.style.display === "block") {
                conteudoExtra.style.display = "none";
                conteudoExtra.setAttribute("aria-hidden", "true");
                evento.target.setAttribute("aria-expanded", "false");
                evento.target.innerText = "Ler mais";
            } else {
                conteudoExtra.style.display = "block";
                conteudoExtra.setAttribute("aria-hidden", "false");
                evento.target.setAttribute("aria-expanded", "true");
                evento.target.innerText = "Ler menos";
            }
        });
    });
}

/* 4. FILTROS DA GALERIA VITRINE */
function inicializarGaleriaFiltros() {
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const itensGaleria = document.querySelectorAll(".galeria-item");

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            botoesFiltro.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");

            const filtroSelecionado = botao.getAttribute("data-filtro");

            itensGaleria.forEach(item => {
                const categoria = item.getAttribute("data-categoria");
                if (filtroSelecionado === "todos" || categoria === filtroSelecionado) {
                    item.classList.remove("esconder");
                } else {
                    item.classList.add("esconder");
                }
            });
        });
    });
}

/* 5. SIMULADOR DE SENSORES */
function inicializarSimuladorClima() {
    const inputUmidade = document.getElementById("input-umidade");
    const valorUmidade = document.getElementById("valor-umidade");
    const statusLavoura = document.getElementById("status-lavoura");

    if (inputUmidade) {
        inputUmidade.addEventListener("input", (e) => {
            const umidade = e.target.value;
            valorUmidade.innerText = umidade;

            if (umidade < 30) {
                statusLavoura.innerText = "Alerta: Solo Seco! Irrigação ativada.";
                statusLavoura.style.color = "#ff4d4d";
            } else if (umidade >= 30 && umidade <= 70) {
                statusLavoura.innerText = "Condição Ideal: Umidade perfeita.";
                statusLavoura.style.color = "var(--cor-secundaria)";
            } else {
                statusLavoura.innerText = "Aviso: Solo Saturado! Sistemas suspensos.";
                statusLavoura.style.color = "#ffcc00";
            }
        });
    }
}

/* 6. CALCULADORA ECOLÓGICA */
function inicializarCalculadoraEco() {
    const btnCalcular = document.getElementById("btn-calcular");
    const inputHectares = document.getElementById("hectares");
    const resultadoCalculo = document.getElementById("resultado-calculo");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const hectares = parseFloat(inputHectares.value);
            if (isNaN(hectares) || hectares <= 0) {
                resultadoCalculo.innerText = "Digite um valor válido.";
                resultadoCalculo.style.color = "red";
                return;
            }
            resultadoCalculo.style.color = "";
            resultadoCalculo.innerText = `Economia estimada: ${hectares * 1200} litros de água por semana! 💧`;
        });
    }
}

/* 7. ANIMAÇÃO SCROLL */
function inicializarAnimacaoScroll() {
    const dispararAnimacao = () => {
        const elementos = document.querySelectorAll(".animar-scroll");
        elementos.forEach(elemento => {
            const posicao = elemento.getBoundingClientRect().top;
            if (posicao < window.innerHeight * 0.85) {
                elemento.classList.add("visivel");
            }
        });
    };
    dispararAnimacao();
    window.addEventListener("scroll", dispararAnimacao);
}

/* 8. QUIZ PREMIUM COM SISTEMA DE MEDALHAS GAMIFICADO */
function inicializarQuizComMedalhas() {
    const perguntas = [
        {
            pergunta: "Qual tecnologia monitora pragas e ajuda a poupar água diretamente no solo?",
            opcoes: ["Drones e Sensores", "Tratores antigos sem GPS", "Enxadas manuais"],
            correta: 0
        },
        {
            pergunta: "O pilar do Agrinho 2026 foca em qual equilíbrio?",
            opcoes: ["Alta produção ignorando matas", "Tecnologia, produção e preservação ambiental", "Energias poluidoras"],
            correta: 1
        },
        {
            pergunta: "Qual fonte de energia limpa cresce nas propriedades modernas?",
            opcoes: ["Combustíveis fósseis", "Solar e Biomassa", "Geradores tradicionais a diesel"],
            correta: 2
        }
    ];

    let indiceAtual = 0;
    let pontuacao = 0;

    const elPergunta = document.getElementById("pergunta");
    const elOpcoes = document.getElementById("opcoes");
    const boxQuiz = document.getElementById("quiz-box");
    const boxResultado = document.getElementById("resultado-quiz");
    const elPlacar = document.getElementById("placar");
    const elBadgeContainer = document.getElementById("badge-container");
    const btnReiniciar = document.getElementById("btn-reiniciar");

    function carregarPergunta() {
        if (indiceAtual < perguntas.length) {
            const atual = perguntas[indiceAtual];
            elPergunta.innerText = atual.pergunta;
            elOpcoes.innerHTML = "";

            atual.opcoes.forEach((opcao, i) => {
                const btn = document.createElement("button");
                btn.innerText = opcao;
                btn.classList.add("quiz-btn-opcao");
                btn.addEventListener("click", () => {
                    if (i === atual.correta) pontuacao++;
                    indiceAtual++;
                    carregarPergunta();
                });
                elOpcoes.appendChild(btn);
            });
        } else {
            exibirResultado();
        }
    }

    function exibirResultado() {
        boxQuiz.style.display = "none";
        boxResultado.style.display = "block";
        elPlacar.innerText = `Você acertou ${pontuacao} de ${perguntas.length} questões.`;

        let medalha = "";
        let cor = "";

        if (pontuacao === 0) {
            medalha = "🌱 Semeadora Iniciante";
            cor = "#888";
        } else if (pontuacao < perguntas.length) {
            medalha = "🚜 Técnico Sustentável";
            cor = "var(--cor-secundaria)";
        } else {
            medalha = "🏆 Engenheiro Agrônomo do Futuro!";
            cor = "#d4af37";
        }

        elBadgeContainer.innerHTML = `
            <span style="display:inline-block; padding:10px 20px; background:#fff; border:2px solid ${cor}; color:${cor}; border-radius:20px; font-weight:bold; font-size:1.2rem;">
                ${medalha}
            </span>
        `;
    }

    btnReiniciar.addEventListener("click", () => {
        pontuacao = 0;
        indiceAtual = 0;
        boxResultado.style.display = "none";
        boxQuiz.style.display = "block";
        carregarPergunta();
    });

    carregarPergunta();
}