document.addEventListener("DOMContentLoaded", () => {
    carregarConfiguracoesSalvas();
    inicializarAcessibilidadeEModos();
    inicializarMenuMobile();
    inicializarComparadorImagens();
    inicializarCardsAgroPremium();
    inicializarMapaInterativo();
    inicializarGaleriaFiltros();
    inicializarSimuladorSensorSolo();
    inicializarCalculadoraEco();
    inicializarJornadaFazendeiro();
    inicializarAnimacaoScroll();
    inicializarQuizComMedalhas();
});

/* 1. PERSISTÊNCIA DE CONFIGURAÇÕES */
function carregarConfiguracoesSalvas() {
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
        });
    }
    if (btnContraste) {
        btnContraste.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("alto-contraste");
            document.body.classList.remove("dark-mode");
            localStorage.setItem("contrast", ativo ? "active" : "inactive");
            localStorage.setItem("theme", "light");
        });
    }
    if (btnDislexia) {
        btnDislexia.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("fonte-dislexia");
            localStorage.setItem("dyslexia", ativo ? "active" : "inactive");
        });
    }
}

/* 2. MENU MOBILE RESPONSIVO */
function inicializarMenuMobile() {
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }
}

/* 3. COMPARADOR DE IMAGENS (SLIDER ANTES/DEPOIS) */
function inicializarComparadorImagens() {
    const slider = document.getElementById("slider-divisor");
    const fotoDegradada = document.getElementById("foto-degradada");
    const container = document.querySelector(".comparador-wrapper");

    if (!slider || !fotoDegradada || !container) return;

    const moverDivisor = () => {
        fotoDegradada.style.width = `${slider.value}%`;
    };
    slider.addEventListener("input", moverDivisor);

    const redimensionarCorte = () => {
        const largura = container.offsetWidth;
        const img = fotoDegradada.querySelector("img");
        if (img) img.style.width = `${largura}px`;
    };
    redimensionarCorte();
    window.addEventListener("resize", redimensionarCorte);
}

/* 4. CARDS PREMIUM 3D FLIP */
function inicializarCardsAgroPremium() {
    const cards = document.querySelectorAll(".card-agro-premium");
    cards.forEach(card => {
        const virarCard = () => card.classList.toggle("virado");
        card.addEventListener("click", virarCard);
        card.addEventListener("keydown", (e) => {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                virarCard();
            }
        });
    });
}

/* 5. MAPA REGIONAL INTERATIVO */
function inicializarMapaInterativo() {
    const dadosRegioes = {
        norte: {
            nome: "Região Norte (Pioneiro e Central)",
            producao: "Cafés especiais certificados, grãos rastreados e fruticultura integrada.",
            curiosidade: "Uso ativo de drones autônomos para pulverização localizada e controle biológico de pragas."
        },
        oeste: {
            nome: "Região Oeste (Polo de Proteínas)",
            producao: "Líder em piscicultura, avicultura e safras tecnológicas de milho e soja.",
            curiosidade: "Pioneira na conversão de dejetos animais em biogás e biomassa para autossuficiência energética."
        },
        sul: {
            nome: "Região Sul e Campos Gerais",
            producao: "Grandes plantações de trigo, cevada e a maior bacia leiteira tecnificada.",
            curiosidade: "Berço do Sistema de Plantio Direto na Palha, referência mundial em conservação de solos."
        }
    };

    const caminhos = document.querySelectorAll(".regiao-path");
    const placeholder = document.getElementById("mapa-placeholder-texto");
    const caixaConteudo = document.getElementById("mapa-dados-conteudo");
    const elNome = document.getElementById("mapa-nome-regiao");
    const elProd = document.getElementById("mapa-producao");
    const elCurio = document.getElementById("mapa-curiosidade");

    caminhos.forEach(caminho => {
        const atualizarPainel = () => {
            const info = dadosRegioes[caminho.getAttribute("data-regiao")];
            if (info && placeholder) {
                placeholder.style.display = "none";
                caixaConteudo.style.display = "block";
                elNome.innerText = info.nome;
                elProd.innerText = info.producao;
                elCurio.innerText = info.curiosidade;
            }
        };
        caminho.addEventListener("click", atualizarPainel);
        caminho.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                atualizarPainel();
            }
        });
    });
}

/* 6. VITRINE DE PRODUTOS COM FILTRO */
function inicializarGaleriaFiltros() {
    const botoes = document.querySelectorAll(".btn-filtro");
    const itens = document.querySelectorAll(".galeria-item");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            botoes.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");
            const filtro = botao.getAttribute("data-filtro");

            itens.forEach(item => {
                if (filtro === "todos" || item.getAttribute("data-categoria") === filtro) {
                    item.classList.remove("esconder");
                } else {
                    item.classList.add("esconder");
                }
            });
        });
    });
}

/* 7. SIMULADOR DE MONITORAMENTO DE SOLO */
function inicializarSimuladorSensorSolo() {
    const input = document.getElementById("input-umidade");
    const valor = document.getElementById("valor-umidade");
    const status = document.getElementById("status-lavoura");
    const card = document.getElementById("simulador-sensor-card");
    const btnSeca = document.getElementById("btn-seca");
    const btnChuva = document.getElementById("btn-chuva");

    function renderizar(umidade) {
        if (!input || !valor || !status || !card) return;
        input.value = umidade;
        valor.innerText = umidade;

        if (umidade < 30) {
            status.innerHTML = "🥀 <b>Alerta: Solo Seco!</b> Irrigação automatizada disparada.";
            status.style.color = "#d35400";
            card.style.backgroundColor = "#fff5eb";
        } else if (umidade >= 30 && umidade <= 70) {
            status.innerHTML = "🌱 <b>Condição Ideal:</b> Umidade balanceada por dados ecológicos.";
            status.style.color = "#27ae60";
            card.style.backgroundColor = "#f4fbf7";
        } else {
            status.innerHTML = "💧 <b>Aviso: Solo Saturado!</b> Risco de asfixia radicular. Fluxo suspenso.";
            status.style.color = "#2980b9";
            card.style.backgroundColor = "#ebf5fb";
        }
    }

    if (input) input.addEventListener("input", (e) => renderizar(e.target.value));
    if (btnSeca) btnSeca.addEventListener("click", () => renderizar(15));
    if (btnChuva) btnChuva.addEventListener("click", () => renderizar(95));
}

/* 8. CALCULADORA DE PEGADA HÍDRICA */
function inicializarCalculadoraEco() {
    const btn = document.getElementById("btn-primary");
    const calcBtn = document.getElementById("btn-calcular");
    const input = document.getElementById("hectares");
    const resultado = document.getElementById("resultado-calculo");

    if (calcBtn && resultado && input) {
        calcBtn.addEventListener("click", () => {
            const hectares = parseFloat(input.value);
            if (isNaN(hectares) || hectares <= 0) {
                resultado.innerText = "Insira um valor de hectares válido.";
                return;
            }
            const litros = hectares * 1200;
            const caixas = Math.round(litros / 500);
            resultado.innerHTML = `🟢 Economia real estimada: <b>${litros.toLocaleString('pt-BR')} litros</b> de água por semana!<br><br>💡 <b>Impacto:</b> Isso equivale a preservar cerca de <b>${caixas} caixas d'água</b> de 500 litros cheias!`;
        });
    }
}

/* 9. SIMULADOR DE GESTÃO (RPG DO FAZENDEIRO) */
function inicializarJornadaFazendeiro() {
    let prod = 100, nat = 100, caixa = 50000;
    const elP = document.getElementById("status-producao");
    const elN = document.getElementById("status-natureza");
    const elC = document.getElementById("status-caixa");
    const elText = document.getElementById("narrativa-texto");
    const btnsContainer = document.getElementById("jornada-botoes");
    const btnReset = document.getElementById("btn-reiniciar-jornada");

    const rotas = {
        arvores: {
            txt: "🌲 <b>Manejo Sustentável Eficaz!</b> A proteção das margens evitou o assoreamento do rio e reduziu pragas por equilíbrio ecológico. O selo verde valorizou seu produto.",
            dP: +5, dN: +20, dC: -5000
        },
        desmatar: {
            txt: "🪓 <b>Foco em Lucro Imediato:</b> A expansão gerou receita rápida, mas a remoção da mata gerou voçorocas e erosões severas na chuva seguinte, reduzindo a fertilidade da terra.",
            dP: -15, dN: -35, dC: +15000
        },
        irrigacao: {
            txt: "💧 <b>Upgrade Tecnológico Concluído!</b> Os sensores gotejam com exatidão matemática. Sua linha de colheita deu salto produtivo com máxima economia de água.",
            dP: +25, dN: +10, dC: -12000
        }
    };

    if (!btnsContainer) return;

    btnsContainer.querySelectorAll(".quiz-btn-opcao").forEach(btn => {
        btn.addEventListener("click", () => {
            const efeito = rotas[btn.getAttribute("data-escolha")];
            if (efeito) {
                prod = Math.max(0, prod + efeito.dP);
                nat = Math.max(0, Math.min(100, nat + efeito.dN));
                caixa += efeito.dC;

                elP.innerText = `${prod}%`;
                elN.innerText = `${nat}%`;
                elC.innerText = `R$ ${caixa.toLocaleString('pt-BR')}`;
                elText.innerHTML = `${efeito.txt}<br><br><b>Análise:</b> Veja as variações nos medidores superiores!`;

                btnsContainer.style.display = "none";
                btnReset.style.display = "block";
            }
        });
    });

    if (btnReset) {
        btnReset.addEventListener("click", () => {
            prod = 100; nat = 100; caixa = 50000;
            elP.innerText = "100%"; elN.innerText = "100%"; elC.innerText = "R$ 50.000";
            elText.innerHTML = "Fase 1: O início da safra. Você assumiu as terras da fazenda. Qual será o seu primeiro manejo ou investimento tecnológico?";
            btnsContainer.style.display = "flex";
            btnReset.style.display = "none";
        });
    }
}

/* 10. ANIMAÇÃO DE ENTRADA SCROLL */
function inicializarAnimacaoScroll() {
    const checar = () => {
        document.querySelectorAll(".animar-scroll").forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
                el.classList.add("visivel");
            }
        });
    };
    checar();
    window.addEventListener("scroll", checar);
}

/* 11. QUIZ INTERATIVO COM MEDALHAS */
function inicializarQuizComMedalhas() {
    const perguntas = [
        { q: "Qual tecnologia monitora pragas e ajuda a poupar água diretamente no solo?", o: ["Drones e Sensores", "Tratores antigos sem GPS", "Enxadas manuais comuns"], c: 0 },
        { q: "O pilar do Agrinho foca em qual equilíbrio essencial?", o: ["Alta produção ignorando matas", "Tecnologia, produção sustentável e preservação", "Uso em larga escala de poluentes"], c: 1 },
        { q: "Qual fonte de energia limpa cresce nas fazendas inteligentes?", o: ["Combustíveis fósseis", "Solar e Biomassa", "Motores pesados a diesel"], c: 2 }
    ];

    let atual = 0, pontos = 0;
    const elQ = document.getElementById("pergunta");
    const elO = document.getElementById("opcoes");
    const boxQ = document.getElementById("quiz-box");
    const boxR = document.getElementById("resultado-quiz");
    const elPlacar = document.getElementById("placar");
    const elBadge = document.getElementById("badge-container");
    const btnReset = document.getElementById("btn-reiniciar");

    function render() {
        if (!elQ || !elO) return;
        if (atual < perguntas.length) {
            elQ.innerText = perguntas[atual].q;
            elO.innerHTML = "";
            perguntas[atual].o.forEach((opt, i) => {
                const b = document.createElement("button");
                b.innerText = opt;
                b.classList.add("quiz-btn-opcao");
                b.addEventListener("click", () => {
                    elO.querySelectorAll(".quiz-btn-opcao").forEach(btn => btn.disabled = true);
                    if (i === perguntas[atual].c) {
                        pontos++;
                        b.style.backgroundColor = "#2ecc71"; b.style.color = "#fff";
                        b.innerText += " (Correto!)";
                    } else {
                        b.style.backgroundColor = "#e74c3c"; b.style.color = "#fff";
                        b.innerText += " (Incorreto)";
                        elO.querySelectorAll(".quiz-btn-opcao")[perguntas[atual].c].style.backgroundColor = "#2ecc71";
                        elO.querySelectorAll(".quiz-btn-opcao")[perguntas[atual].c].style.color = "#fff";
                    }
                    setTimeout(() => { atual++; render(); }, 1500);
                });
                elO.appendChild(b);
            });
        } else {
            if (boxQ && boxR && elPlacar && elBadge) {
                boxQ.style.display = "none"; boxR.style.display = "block";
                elPlacar.innerText = `Você obteve ${pontos} acertos de ${perguntas.length}.`;
                let medalha = pontos === 3 ? "🏆 Engenheiro Agrônomo do Futuro!" : pontos === 2 ? "🚜 Técnico Sustentável" : "🌱 Semeadora Iniciante";
                let cor = pontos === 3 ? "#d4af37" : pontos === 2 ? "#0077cc" : "#888";
                elBadge.innerHTML = `<span style="display:inline-block; padding:10px 20px; border:3px solid ${cor}; color:${cor}; border-radius:20px; font-weight:bold;">${medalha}</span>`;
            }
        }
    }

    if (btnReset) {
        btnReset.addEventListener("click", () => {
            atual = 0; pontos = 0;
            if (boxQ && boxR) { boxR.style.display = "none"; boxQ.style.display = "block"; render(); }
        });
    }
    render();
}