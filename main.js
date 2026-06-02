/* ==========================================================================
   ARQUIVO JAVASCRIPT PRINCIPAL - AGRINHO 2026 (ACESSIBILIDADE E RESPONSIVO)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    inicializarAcessibilidade();
    inicializarMenuMobile();
    inicializarCardsExpansiveis();
    inicializarSimuladorClima();
    inicializarCalculadoraEco();
    inicializarContadoresProgressivos();
    inicializarAnimacaoScroll();
    inicializarQuiz();
});

/* 1. CONTROLES DE ACESSIBILIDADE (ALTO CONTRASTE E DISLEXIA) */
function inicializarAcessibilidade() {
    const btnAltoContraste = document.getElementById("btn-alto-contraste");
    const btnDislexia = document.getElementById("btn-dislexia");

    if (btnAltoContraste) {
        btnAltoContraste.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("alto-contraste");
            // Sincroniza o status ativo com leitores de tela para cegos
            btnAltoContraste.setAttribute("aria-pressed", ativo);
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
            menuToggle.classList.toggle("open");
            // Informa se o menu móvel expandiu na leitura de áudio
            menuToggle.setAttribute("aria-expanded", ativo);
        });

        // Fecha o menu móvel ao clicar em qualquer item
        const links = navbar.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
}

/* 3. CARDS EXPANSÍVEIS (Com acessibilidade ARIA) */
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

/* 4. SIMULADOR DE SENSORES (UMIDADE) */
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
                statusLavoura.style.color = document.body.classList.contains("alto-contraste") ? "#ffffff" : "#ff4d4d";
            } else if (umidade >= 30 && umidade <= 70) {
                statusLavoura.innerText = "Condição Ideal: Níveis adequados detectados pelos sensores.";
                statusLavoura.style.color = document.body.classList.contains("alto-contraste") ? "#ffff00" : "#0077cc";
            } else {
                statusLavoura.innerText = "Aviso: Solo Saturado! Sistemas suspensos preventivamente.";
                statusLavoura.style.color = document.body.classList.contains("alto-contraste") ? "#ffffff" : "#ffcc00";
            }
        });
    }
}

/* 5. CALCULADORA ECOLÓGICA */
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

            const economiaTotal = hectares * 1200;
            resultadoCalculo.style.color = ""; // Mantém cor dinâmica herdada das variáveis principais
            resultadoCalculo.innerText = `Sua automação economizaria em média ${economiaTotal} litros de água por semana!`;
        });
    }
}

/* 6. CONTADORES PROGRESSIVOS (Otimizado para leitores de tela) */
function inicializarContadoresProgressivos() {
    const contadores = document.querySelectorAll(".contador");

    contadores.forEach(contador => {
        const alvo = +contador.getAttribute("data-alvo");
        
        // Em vez de rodar números correndo (que causa confusão auditiva em leitores de tela para cegos),
        // preenchemos o alvo de forma estática direta para otimizar a leitura acessível.
        contador.innerText = alvo; 
    });
}

/* 7. ANIMAÇÃO AO ROLAR A TELA (SCROLL ANIMATION) */
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

    dispararAnimacao();
    window.addEventListener("scroll", dispararAnimacao);
}

/* 8. QUIZ SUSTENTÁVEL DO AGRINHO */
function inicializarQuiz() {
    const perguntas = [
        {
            pergunta: "Qual tecnologia ajuda a monitorar pragas e economizar água diretamente na plantação?",
            opcoes: ["Drones e Sensores de Solo", "Tratores antigos sem GPS", "Ferramentas manuais antigas"],
            correta: 0
        },
        {
            pergunta: "O que caracteriza a sustentabilidade no Agrinho 2026?",
            opcoes: ["Produzir sem focar nas matas ciliares", "Equilibrar tecnologia, alta produção e preservação", "Abandonar o uso de fontes de energia limpa"],
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