document.addEventListener("DOMContentLoaded", () => {
    inicializarClimaDinamico();
    carregarConfiguracoesSalvas();
    inicializarAcessibilidadeEModos();
    inicializarMenuMobile();
    inicializarComparadorImagens();
    inicializarCardsAgroPremium();
    inicializarAbasEMapasUnificados();
    inicializarGaleriaFiltros();
    inicializarSimuladorSensorSolo();
    inicializarCalculadoraEco();
    inicializarJornadaFazendeiro();
    inicializarAnimacaoScroll();
    inicializarQuizComMedalhas();
});

/* 1. CLIMA DINÂMICO BASEADO NO HORÁRIO */
function inicializarClimaDinamico() {
    const hora = new Date().getHours();
    const corpo = document.body;

    corpo.classList.remove("clima-manha", "clima-tarde", "clima-noite");

    if (hora >= 6 && hora < 12) {
        corpo.classList.add("clima-manha");
    } else if (hora >= 12 && hora < 18) {
        corpo.classList.add("clima-tarde");
    } else {
        corpo.classList.add("clima-noite");
    }
}

/* 2. ACESSIBILIDADE */
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

/* 3. MENU MOBILE */
function inicializarMenuMobile() {
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }
}

/* 4. COMPARADOR DE IMAGENS */
function inicializarComparadorImagens() {
    const slider = document.getElementById("slider-divisor");
    const fotoDegradada = document.getElementById("foto-degradada");
    const container = document.querySelector(".comparador-wrapper");

    if (!slider || !fotoDegradada || !container) return;

    const moverDivisor = () => { fotoDegradada.style.width = `${slider.value}%`; };
    slider.addEventListener("input", moverDivisor);

    const redimensionarCorte = () => {
        const largura = container.offsetWidth;
        const img = fotoDegradada.querySelector("img");
        if (img) img.style.width = `${largura}px`;
    };
    redimensionarCorte();
    window.addEventListener("resize", redimensionarCorte);
}

/* 5. CARDS PREMIUM FLIP */
function inicializarCardsAgroPremium() {
    const cards = document.querySelectorAll(".card-agro-premium");
    cards.forEach(card => {
        const virarCard = () => card.classList.toggle("virado");
        card.addEventListener("click", virarCard);
        card.addEventListener("keydown", (e) => {
            if (e.key === " " || e.key === "Enter") { e.preventDefault(); virarCard(); }
        });
    });
}

/* 6. CENTRAL DE INDICADORES AGRO (SUBSTITUIÇÃO DO MAPA) */
function inicializarAbasEMapasUnificados() {
    const dadosBrasil = {
        PR: {
            nome: "Paraná 🌾",
            producao: "Grande destaque na produção de soja, milho, trigo e aves. É referência nacional em cooperativismo agroindustrial.",
            ambiental: "Pioneiro no uso do Sistema de Plantio Direto, que retém carbono orgânico e protege o solo da erosão hídrica.",
            curiosidade: "A região Norte Pioneira possui certificação de indicação geográfica por seus cafés especiais finos."
        },
        MT: {
            nome: "Mato Grosso 🚜",
            producao: "Maior produtor nacional isolado de grãos, com lavouras colossais de soja, algodão e milho safrinha.",
            ambiental: "Adoção maciça de bioinsumos microbiológicos nativos para regenerar a microfauna do solo.",
            curiosidade: "Propriedades usam inteligência artificial de satélite para guiar frotas pesadas de colheita sem sobreposição."
        },
        SP: {
            nome: "São Paulo 🍊",
            producao: "Líder mundial em suco de laranja concentrado, cana-de-açúcar e cinturões verdes de hortaliças.",
            ambiental: "Cogeração de energia limpa injetada na rede elétrica externa a partir da queima controlada da palha e bagaço de cana.",
            curiosidade: "Abriga os maiores ecossistemas de startups agro tecnológicas (AgTechs) da América Latina."
        }
    };

    const dadosParana = {
        norte: {
            nome: "Região Norte (Pioneiro e Central) 🟢",
            producao: "Cafés finos especiais, grãos de alta precisão e fruticultura integrada de cooperativas.",
            ambiental: "Utilização estratégica de manejos biológicos contra pragas para diminuir defensivos químicos tradicionais.",
            curiosidade: "Uso ativo de drones com câmeras termais para identificar falhas no plantio exatamente no início do broto."
        },
        oeste: {
            nome: "Região Oeste (Gigante Proteico) 🔵",
            producao: "Destaque supremo na piscicultura (criação de tilápias), avicultura integrada e grãos.",
            ambiental: "Tratamento biológico completo de dejetos de animais para produção de Biogás e biofertilizante líquido.",
            curiosidade: "Pequenas propriedades familiares geram sua própria luz usando motores alimentados por resíduos animais orgânicos."
        },
        sul: {
            nome: "Região Sul e Campos Gerais 🟣",
            producao: "Culturas de inverno como cevada para malte, trigo e bacia leiteira de ponta.",
            ambiental: "Conservação contínua de mananciais de água através de reflorestamento de matas ciliares nativas.",
            curiosidade: "É a região berço histórico do plantio direto na palha na América do Sul, mudando o manejo de solos."
        }
    };

    const btnBrasil = document.getElementById("btn-aba-brasil");
    const btnParana = document.getElementById("btn-aba-parana");
    const wrapBrasil = document.getElementById("wrapper-mapa-brasil");
    const wrapParana = document.getElementById("wrapper-mapa-parana");

    const placeholder = document.getElementById("mapa-placeholder-texto");
    const caixaConteudo = document.getElementById("mapa-dados-conteudo");
    const elNome = document.getElementById("mapa-nome-regiao");
    const elProd = document.getElementById("mapa-producao");
    const elAmb = document.getElementById("mapa-ambiental");
    const elCurio = document.getElementById("mapa-curiosidade");
    const blocoAmb = document.getElementById("bloco-ambiental-extra");

    if (!btnBrasil || !btnParana) return;

    btnBrasil.addEventListener("click", () => {
        btnBrasil.classList.add("ativo"); btnParana.classList.remove("ativo");
        wrapBrasil.style.display = "block"; wrapParana.style.display = "none";
        resetarPainel();
    });

    btnParana.addEventListener("click", () => {
        btnParana.classList.add("ativo"); btnBrasil.classList.remove("ativo");
        wrapParana.style.display = "block"; wrapBrasil.style.display = "none";
        resetarPainel();
    });

    function resetarPainel() {
        placeholder.style.display = "block";
        caixaConteudo.style.display = "none";
    }

    function preencherPainel(dados, chave) {
        const info = dados[chave];
        if (info) {
            placeholder.style.display = "none";
            caixaConteudo.style.display = "block";
            elNome.innerText = info.nome;
            elProd.innerText = info.producao;
            elCurio.innerText = info.curiosidade;
            elAmb.innerText = info.ambiental;
            blocoAmb.style.display = "block";
        }
    }

    document.querySelectorAll(".estado-path").forEach(btn => {
        btn.addEventListener("click", () => preencherPainel(dadosBrasil, btn.getAttribute("data-estado")));
    });

    document.querySelectorAll(".regiao-path").forEach(btn => {
        btn.addEventListener("click", () => preencherPainel(dadosParana, btn.getAttribute("data-regiao")));
    });
}

/* 7. FILTROS DA VITRINE */
function inicializarGaleriaFiltros() {
    const botoes = document.querySelectorAll(".btn-filtro");
    const itens = document.querySelectorAll(".galeria-item");

    botoes.forEach(botao => {
        if(botao.hasAttribute("data-filtro")){
            botao.addEventListener("click", () => {
                botoes.forEach(b => { if(b.hasAttribute("data-filtro")) b.classList.remove("ativo"); });
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
        }
    });
}

/* 8. SIMULADOR SENSOR DE SOLO */
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
            status.style.color = "#ea580c";
        } else if (umidade >= 30 && umidade <= 70) {
            status.innerHTML = "🌱 <b>Condição Ideal:</b> Umidade balanceada por dados ecológicos.";
            status.style.color = "#16a34a";
        } else {
            status.innerHTML = "💧 <b>Aviso: Solo Saturado!</b> Risco detectado. Fluxo de água suspenso.";
            status.style.color = "#2563eb";
        }
    }

    if (input) input.addEventListener("input", (e) => renderizar(e.target.value));
    if (btnSeca) btnSeca.addEventListener("click", () => renderizar(15));
    if (btnChuva) btnChuva.addEventListener("click", () => renderizar(95));
}

/* 9. CALCULADORA ECO */
function inicializarCalculadoraEco() {
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

/* 10. MINI RPG - JORNADA DO FAZENDEIRO */
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
            txt: "🌲 <b>Manejo Sustentável Eficaz!</b> A proteção das margens evitou o assoreamento do rio e equilibrou a presença de pragas. O selo verde valorizou seu produto.",
            dP: +5, dN: +20, dC: -5000
        },
        desmatar: {
            txt: "🪓 <b>Foco em Lucro Imediato:</b> A expansão gerou receita rápida, mas a remoção da mata gerou erosões severas na chuva seguinte, reduzindo a fertilidade da terra no longo prazo.",
            dP: -15, dN: -35, dC: +15000
        },
        irrigacao: {
            txt: "💧 <b>Upgrade Tecnológico Concluído!</b> Os sensores distribuem água com exatidão matemática. Sua produção deu um grande salto com máxima economia de água.",
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

/* 11. ANIMAÇÃO SCROLL */
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

/* 12. QUIZ SUSTENTÁVEL */
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
                        b.style.backgroundColor = "#10b981"; b.style.color = "#fff";
                    } else {
                        b.style.backgroundColor = "#ef4444"; b.style.color = "#fff";
                        elO.querySelectorAll(".quiz-btn-opcao")[perguntas[atual].c].style.backgroundColor = "#10b981";
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
                let cor = pontos === 3 ? "#eab308" : pontos === 2 ? "#0284c7" : "#64748b";
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