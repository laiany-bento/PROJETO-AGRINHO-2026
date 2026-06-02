/* ==========================================================================
   ARQUIVO JAVASCRIPT INTEGRADO - AGRINHO 2026
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    inicializarMenuMobile();
    inicializarCardsExpansiveis();
    inicializarSimuladorClima();
    inicializarCalculadoraEco();
    inicializarContadoresProgressivos();
    inicializarAnimacaoScroll();
    inicializarQuiz();
});

/* 1. MENU RESPONSIVO MOBILE */
function inicializarMenuMobile() {
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });

        const links = navbar.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuToggle.classList.remove("open");
            });
        });
    }
}

/* 2. CARDS EXPANSÍVEIS */
function inicializarCardsExpansiveis() {
    const botoes = document.querySelectorAll(".btn-expand");

    botoes.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            const card = evento.target.closest(".card-expand");
            const conteudoExtra = card.querySelector(".conteudo-extra");

            if (conteudoExtra.style.display === "block") {
                conteudoExtra.style.display = "none";
                evento.target.innerText = "Ler mais";
            } else {
                conteudoExtra.style.display = "block";
                evento.target.innerText = "Ler menos";
            }
        });
    });
}

/* 3. SIMULADOR DE SENSORES (UMIDADE) */
function inicializarSimuladorClima() {
    const inputUmidade = document.getElementById("input-umidade");
    const valorUmidade = document.getElementById("valor-umidade");
    const statusLavoura = document.getElementById("status-lavoura");

    if (inputUmidade) {
        inputUmidade.addEventListener("input", (e) => {
            const umidade = e.target.value;
            valorUmidade.innerText = umidade;

            if (umidade < 30) {
                statusLavoura.innerText = "Alerta: Solo Seco! Irrigação por gotejamento ativada.";
                statusLavoura.style.color = "#ff4d4d";
            } else if (umidade >= 30 && umidade <= 70) {
                statusLavoura.innerText = "Condição Ideal: Níveis adequados detectados pelos sensores.";
                statusLavoura.style.color = "#0077cc";
            } else {
                statusLavoura.innerText = "Aviso: Solo Saturado! Sistemas suspensos preventivamente.";
                statusLavoura.style.color = "#ffcc00";
            }
        });
    }
}

/* 4. CALCULADORA ECOLÓGICA */
function inicializarCalculadoraEco() {
    const btnCalcular = document.getElementById("btn-calcular");
    const inputHectares = document.getElementById("hectares");
    const resultadoCalculo = document.getElementById("resultado-calculo");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const hectares = parseFloat(inputHectares.value);
            
            if (isNaN(hectares) || hectares <= 0) {
                resultadoCalculo.innerText = "Por favor, digite um número válido de hectares.";
                resultadoCalculo.style.color = "red";
                return;
            }

            // Estimativa matemática: 1200 litros economizados por hectare
            const economiaTotal = hectares * 1200;
            resultadoCalculo.style.color = "var(--cor-secundaria)";
            resultadoCalculo.innerText = `Sua automação economizaria em média ${economiaTotal} litros de água por semana! 💧`;
        });
    }
}

/* 5. CONTADORES PROGRESSIVOS */
function inicializarContadoresProgressivos() {
    const contadores = document.querySelectorAll(".contador");

    contadores.forEach(contador => {
        const atualizarContador = () => {
            const alvo = +contador.getAttribute("data-alvo");
            const valorAtual = +contador.innerText;
            const incremento = alvo / 80; // Controla a velocidade do ganho

            if (valorAtual < alvo) {
                contador.innerText = Math.ceil(valorAtual + incremento);
                setTimeout(atualizarContador, 25);
            } else {
                contador.innerText = alvo;
            }
        };

        // Dispara a contagem assim que a função é iniciada
        atualizarContador();
    });
}

/* 6. ANIMAÇÃO DE SCROLL (APARECER AO ROLAR) */
function inicializarAnimacaoScroll() {
    const dispararAnimacao = () => {
        const elementos = document.querySelectorAll(".animar-scroll");
        
        elementos.forEach(elemento => {
            const posicaoElemento = elemento.getBoundingClientRect().top;
            const alturaTela = window.innerHeight * 0.85;

            if (posicaoElemento < alturaTela) {
                elemento.classList.add("visivel");
            }
        });
    };

    // Executa uma vez no início e depois vincula ao evento de rolagem
    dispararAnimacao();
    window.addEventListener("scroll", dispararAnimacao);
}

/* 7. QUIZ SUSTENTÁVEL */
function inicializarQuiz() {
    const perguntas = [
        {
            pergunta: "Qual tecnologia ajuda a monitorar pragas e economizar água diretamente na plantação?",
            opcoes: ["Drones e Sensores de Solo", "Tratores antigos sem GPS", "Ferramentas manuais antigas"],
            correta: 0
        },
        {
            pergunta: "O que caracteriza a sustentabilidade no Agrinho 2026?",
            opcoes: ["Produzir sem focar nas matas cilliantes", "Equilibrar tecnologia, alta produção e preservação", "Abandonar o uso de fontes de energia limpa"],
            correta: 1
        },
        {
            pergunta: "De onde vem a energia limpa frequentemente adotada no campo moderno?",
            opcoes: ["Combustíveis fósseis refinados", "Painéis Solares e Biomassa", "Geradores tradicionais a diesel"],
            correta: 2
        }
    ];

    let indicePerguntaAtual = 0;
    let pontuacao = 0;

    const elementoPergunta = document.getElementById("pergunta");
    const containerOpcoes = document.getElementById("opcoes");
    const containerQuizBox = document.getElementById("quiz-box");
    const containerResultado = document.getElementById("resultado-quiz");
    const elementoPlacar = document.getElementById("placar");
    const btnReiniciar = document.getElementById("btn-reiniciar");

    function carregarPergunta() {
        if (indicePerguntaAtual < perguntas.length) {
            const dadosAtual = perguntas[indicePerguntaAtual];
            elementoPergunta.innerText = dadosAtual.pergunta;
            containerOpcoes.innerHTML = "";

            dadosAtual.opcoes.forEach((opcao, indice) => {
                const botaoOpcao = document.createElement("button");
                botaoOpcao.innerText = opcao;
                botaoOpcao.classList.add("quiz-btn-opcao");
                botaoOpcao.addEventListener("click", () => verificarResposta(indice));
                containerOpcoes.appendChild(botaoOpcao);
            });
        } else {
            exibirResultado();
        }
    }

    function verificarResposta(indiceSelecionado) {
        if (indiceSelecionado === perguntas[indicePerguntaAtual].correta) {
            pontuacao++;
        }
        indicePerguntaAtual++;
        carregarPergunta();
    }

    function exibirResultado() {
        containerQuizBox.style.display = "none";
        containerResultado.style.display = "block";
        elementoPlacar.innerText = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
    }

    btnReiniciar.addEventListener("click", () => {
        pontuacao = 0;
        indicePerguntaAtual = 0;
        containerResultado.style.display = "none";
        containerQuizBox.style.display = "block";
        carregarPergunta();
    });

    carregarPergunta();
}