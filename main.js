document.addEventListener("DOMContentLoaded", () => {
    carregarConfiguracoesSalvas();
    inicializarAcessibilidadeEModos();
    inicializarMenuMobile();
    inicializarCardsExpansiveis();
    inicializarFlashcards();
    inicializarGaleriaFiltros();
    inicializarSimuladorClima();
    inicializarCalculadoraEco();
    inicializarAnimacaoScroll();
    inicializarQuizComMedalhas();
});

/* 1. SISTEMA REFINADO DE MEMÓRIA (LOCALSTORAGE) E CONTROLES */
function carregarConfiguracoesSalvas() {
    // Mantém as escolhas visuais do usuário salvas na memória do navegador
    if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");
    if (localStorage.getItem("contrast") === "active") document.body.classList.add("alto-contraste");
    if (localStorage.getItem("dyslexia") === "active") document.body.classList.add("fonte-dislexia");
}

function inicializarAcessibilidadeEModos() {
    const btnDark = document.getElementById("btn-dark-mode");
    const btnContraste = document.getElementById("btn-alto-contraste");
    const btnDislexia = document.getElementById("btn-dislexia");

    if (btnDark) {
        btnDark.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("dark-mode");
            document.body.classList.remove("alto-contraste");
            localStorage.setItem("theme", ativo ? "dark" : "light");
            localStorage.setItem("contrast", "inactive");
            btnDark.setAttribute("aria-pressed", ativo);
        });
    }

    if (btnContraste) {
        btnContraste.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("alto-contraste");
            document.body.classList.remove("dark-mode");
            localStorage.setItem("contrast", ativo ? "active" : "inactive");
            localStorage.setItem("theme", "light");
            btnContraste.setAttribute("aria-pressed", ativo);
        });
    }

    if (btnDislexia) {
        btnDislexia.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("fonte-dislexia");
            localStorage.setItem("dyslexia", ativo ? "active" : "inactive");
            btnDislexia.setAttribute("aria-pressed", ativo);
        });
    }
}

/* 2. MENU MOBILE */
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

/* 4. CONTROLE DOS FLASHCARDS (Com suporte total a teclado e leitores de tela) */
function inicializarFlashcards() {
    const cards = document.querySelectorAll(".flashcard");
    
    cards.forEach(card => {
        const alternarVirada = () => {
            const virado = card.classList.toggle("virado");
            card.setAttribute("aria-expanded", virado);
        };

        // Permite virar clicando com o mouse
        card.addEventListener("click", alternarVirada);

        // Permite virar usando a barra de espaços ou o Enter no teclado
        card.addEventListener("keydown", (e) => {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault(); 
                alternarVirada();
            }
        });
    });
}

/* 5. FILTROS DA GALERIA */
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

/* 6. SIMULADOR */
function inicializarSimuladorClima() {
    const inputUmidade = document.getElementById("input-umidade");
    const valorUmidade = document.getElementById("valor-umidade");
    const statusLavoura = document.getElementById("status-lavoura");

    if (inputUmidade) {
        inputUmidade.addEventListener("input", (e) => {
            const umidade = e.target.value;
            valorUmidade.innerText = umidade;

            if (umidade < 30) {
                statusLavoura.innerText = "Alerta: Solo Seco! Irrigação automatizada ativada.";
                statusLavoura.style.color = "#ff4d4d";
            } else if (umidade >= 30 && umidade <= 70) {
                statusLavoura.innerText = "Condição Ideal: Umidade perfeita equilibrada.";
                statusLavoura.style.color = "var(--cor-secundaria)";
            } else {
                statusLavoura.innerText = "Aviso: Solo Saturado! Fluxos de gotejamento suspensos.";
                statusLavoura.style.color = "#ffcc00";
            }
        });
    }
}

/* 7. CALCULADORA */
function inicializarCalculadoraEco() {
    const btnCalcular = document.getElementById("btn-calcular");
    const inputHectares = document.getElementById("hectares");
    const resultadoCalculo = document.getElementById("resultado-calculo");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const hectares = parseFloat(inputHectares.value);
            if (isNaN(hectares) || hectares <= 0) {
                resultadoCalculo.innerText = "Digite um número de hectares válido.";
                resultadoCalculo.style.color = "red";
                return;
            }
            resultadoCalculo.style.color = "";
            resultadoCalculo.innerText = `Economia real estimada: ${hectares * 1200} litros de água semanais! 💧`;
        });
    }
}

/* 8. ANIMAÇÃO SCROLL */
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

/* 9. QUIZ PREMIUM COM FEEDBACK VISUAL DE TEMPO, TRAVA E INCLUSÃO COGNITIVA */
function inicializarQuizComMedalhas() {
    const perguntas = [
        {
            pergunta: "Qual tecnologia monitora pragas e ajuda a poupar água diretamente no solo?",
            opcoes: ["Drones e Sensores", "Tratores antigos sem GPS", "Enxadas manuais comuns"],
            correta: 0
        },
        {
            pergunta: "O pilar do Agrinho 2026 foca em qual equilíbrio essencial?",
            opcoes: ["Alta produção ignorando matas ciliares", "Tecnologia avançada, produção e preservação ecológica", "Uso em larga escala de energias poluidoras"],
            correta: 1
        },
        {
            pergunta: "Qual fonte de energia limpa cresce continuamente nas fazendas modernas?",
            opcoes: ["Combustíveis fósseis tradicionais", "Solar e Biomassa", "Geradores antigos movidos a diesel"],
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
                    // Bloqueia múltiplos cliques rápidos
                    const todosBotoes = elOpcoes.querySelectorAll(".quiz-btn-opcao");
                    todosBotoes.forEach(b => b.disabled = true);

                    // Sistema inclusivo de feedback visual e textual (para daltonismo e PcD)
                    if (i === atual.correta) {
                        pontuacao++;
                        btn.style.backgroundColor = "#2ecc71"; // Verde
                        btn.style.color = "white";
                        btn.innerText += " (Correto!)";
                    } else {
                        btn.style.backgroundColor = "#e74c3c"; // Vermelho
                        btn.style.color = "white";
                        btn.innerText += " (Incorreto)";
                        
                        // Revela a alternativa correta para ganho educacional
                        todosBotoes[atual.correta].style.backgroundColor = "#2ecc71";
                        todosBotoes[atual.correta].style.color = "white";
                        todosBotoes[atual.correta].innerText += " (Esta era a correta)";
                    }

                    // Aguarda 1.5 segundos para o cérebro processar a resposta antes de avançar
                    setTimeout(() => {
                        indiceAtual++;
                        carregarPergunta();
                    }, 1500);
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
            <span style="display:inline-block; padding:10px 20px; background:var(--cor-principal); border:3px solid ${cor}; color:${cor}; border-radius:20px; font-weight:bold; font-size:1.2rem;">
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