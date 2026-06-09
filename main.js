document.addEventListener("DOMContentLoaded", () => {
    inicializarClimaDinamico();
    carregarConfiguracoesAcessibilidade();
    inicializarMenuMobile();
    inicializarComparadorImagens();
    inicializarCalculadoraInsumosReal();
    inicializarAbasIndicadores();
    inicializarSimuladorUmidade();
    inicializarMiniRpgCampos();
    inicializarAnimacaoDeScroll();
    inicializarQuizSustentavel();
});

/* 1. SISTEMA AUTOMÁTICO DE CLIMA POR HORÁRIO */
function inicializarClimaDinamico() {
    const hora = new Date().getHours();
    const body = document.body;
    body.classList.remove("clima-manha", "clima-tarde", "clima-noite");

    if (hora >= 6 && hora < 12) {
        body.classList.add("clima-manha");
    } else if (hora >= 12 && hora < 18) {
        body.classList.add("clima-tarde");
    } else {
        body.classList.add("clima-noite");
    }
}

/* 2. BARRA DE ACESSIBILIDADE */
function carregarConfiguracoesAcessibilidade() {
    if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");
    if (localStorage.getItem("contrast") === "active") document.body.classList.add("alto-contraste");
    if (localStorage.getItem("dyslexia") === "active") document.body.classList.add("fonte-dislexia");

    document.getElementById("btn-dark-mode")?.addEventListener("click", () => {
        const atv = document.body.classList.toggle("dark-mode");
        document.body.classList.remove("alto-contraste");
        localStorage.setItem("theme", atv ? "dark" : "light");
        localStorage.setItem("contrast", "inactive");
    });

    document.getElementById("btn-alto-contraste")?.addEventListener("click", () => {
        const atv = document.body.classList.toggle("alto-contraste");
        document.body.classList.remove("dark-mode");
        localStorage.setItem("contrast", atv ? "active" : "inactive");
        localStorage.setItem("theme", "light");
    });

    document.getElementById("btn-dislexia")?.addEventListener("click", () => {
        const atv = document.body.classList.toggle("fonte-dislexia");
        localStorage.setItem("dyslexia", atv ? "active" : "inactive");
    });
}

/* 3. MENU MOBILE */
function inicializarMenuMobile() {
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => navbar.classList.toggle("active"));
    }
}

/* 4. SLIDER COMPARADOR VISUAL */
function inicializarComparadorImagens() {
    const slider = document.getElementById("slider-divisor");
    const fotoDegradada = document.getElementById("foto-degradada");
    const wrapper = document.querySelector(".comparador-wrapper");

    if (!slider || !fotoDegradada || !wrapper) return;

    slider.addEventListener("input", () => {
        fotoDegradada.style.width = `${slider.value}%`;
    });

    const ajustarLarguraInterna = () => {
        const img = fotoDegradada.querySelector("img");
        if (img) img.style.width = `${wrapper.offsetWidth}px`;
    };
    ajustarLarguraInterna();
    window.addEventListener("resize", ajustarLarguraInterna);
}

/* 5. SISTEMA DA CALCULADORA DE BIOINSUMOS AGRÍCOLAS RECONSTRUÍDO */
function inicializarCalculadoraInsumosReal() {
    const btn = document.getElementById("btn-calcular-insumos");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const area = parseFloat(document.getElementById("calc-area").value);
        const cultura = document.getElementById("calc-cultura").value;
        const placeholder = document.getElementById("resultado-vazio");
        const dadosBox = document.getElementById("resultado-dados");

        if (isNaN(area) || area <= 0) {
            alert("Por favor, insira uma quantidade de hectares válida.");
            return;
        }

        let proPorcaoComposto = 0; // toneladas por hectare
        let proPorcaoLiquido = 0;   // litros por hectare

        if (cultura === "soja") {
            proPorcaoComposto = 2.5; proPorcaoLiquido = 15;
        } else if (cultura === "milho") {
            proPorcaoComposto = 4.0; proPorcaoLiquido = 25;
        } else {
            proPorcaoComposto = 3.0; proPorcaoLiquido = 20;
        }

        placeholder.style.display = "none";
        dadosBox.style.display = "block";

        document.getElementById("res-composto").innerText = (area * proPorcaoComposto).toFixed(1);
        document.getElementById("res-liquido").innerText = (area * proPorcaoLiquido).toFixed(0);
    });
}

/* 6. CENTRAL DE INDICADORES DE PRODUÇÃO E CONTEXTO REGIONAL */
function inicializarAbasIndicadores() {
    const dadosBrasil = {
        PR: {
            nome: "Estado do Paraná 🌾",
            producao: "Líder expressivo em complexos de grãos (soja, trigo, milho) e forte cadeia de avicultura.",
            ambiental: "Referência absoluta na conservação de bacias via plantio direto contínuo na palhada.",
            curiosidade: "Possui cooperativas gigantes que usam big data para planejar os dias exatos de colheita coletiva."
        },
        MT: {
            nome: "Mato Grosso 🚜",
            producao: "Maior produtor nacional isolado de grãos de alta escala comercial.",
            ambiental: "Uso pioneiro de bioinsumos microbiológicos integrados em grandes pivôs centrais.",
            curiosidade: "Usa telemetria automatizada em comboios de colheitadeiras sem condutores humanos locais."
        },
        SP: {
            nome: "São Paulo 🍊",
            producao: "Cinturão citrícola mundial, exportações de suco de laranja e canaviais extensos.",
            ambiental: "Reaproveitamento energético de subprodutos, gerando eletricidade limpa por biomassa do bagaço.",
            curiosidade: "Sede das principais Agtechs de desenvolvimento de softwares para drones no hemisfério sul."
        }
    };

    const dadosParana = {
        norte: {
            nome: "Região Norte do Paraná 🟢",
            producao: "Polo de cafés especiais de alto valor e diversificação em fruticultura de cooperativa.",
            ambiental: "Manejo integrado de pragas diminuindo a carga química para salvaguardar lençóis freáticos.",
            curiosidade: "Sensores em drones mapeiam falhas de plantio foliar logo na brotação da muda."
        },
        oeste: {
            nome: "Região Oeste Paranaense 🔵",
            producao: "Potência em piscicultura automatizada (tilápias) e avicultura integrada complexa.",
            ambiental: "Sistemas de biodigestores convertendo dejetos orgânicos animais em gás e biofertilizante.",
            curiosidade: "Pequenas propriedades rurais geram energia elétrica própria convertendo biomassa de suínos."
        },
        sul: {
            nome: "Sul e Campos Gerais do PR 🟣",
            producao: "Culturas de inverno qualificadas (trigo e cevada) e bacia leiteira de precisão.",
            ambiental: "Reflorestamento intensivo das matas ciliares ao longo dos rios locais.",
            curiosidade: "Região considerada o berço histórico da implantação da agricultura de conservação na palha."
        }
    };

    const btnB = document.getElementById("btn-aba-brasil");
    const btnP = document.getElementById("btn-aba-parana");
    const wrapB = document.getElementById("wrapper-mapa-brasil");
    const wrapP = document.getElementById("wrapper-mapa-parana");
    const placeholder = document.getElementById("mapa-placeholder-texto");
    const conteudo = document.getElementById("mapa-dados-conteudo");

    if (!btnB || !btnP) return;

    const alternarAba = (aba) => {
        if (aba === "brasil") {
            btnB.classList.add("ativo"); btnP.classList.remove("ativo");
            wrapB.style.display = "block"; wrapP.style.display = "none";
        } else {
            btnP.classList.add("ativo"); btnB.classList.remove("ativo");
            wrapP.style.display = "block"; wrapB.style.display = "none";
        }
        placeholder.style.display = "block"; conteudo.style.display = "none";
    };

    btnB.addEventListener("click", () => alternarAba("brasil"));
    btnP.addEventListener("click", () => alternarAba("parana"));

    function exibirPainel(fonte, id) {
        const item = fonte[id];
        if (item) {
            placeholder.style.display = "none";
            conteudo.style.display = "block";
            document.getElementById("mapa-nome-regiao").innerText = item.nome;
            document.getElementById("mapa-producao").innerText = item.producao;
            document.getElementById("mapa-ambiental").innerText = item.ambiental;
            document.getElementById("mapa-curiosidade").innerText = item.curiosidade;
        }
    }

    document.querySelectorAll(".estado-path").forEach(b => b.addEventListener("click", () => exibirPainel(dadosBrasil, b.getAttribute("data-estado"))));
    document.querySelectorAll(".regiao-path").forEach(b => b.addEventListener("click", () => exibirPainel(dadosParana, b.getAttribute("data-regiao"))));
}

/* 7. SIMULADOR DA LEITURA DE SENSORES */
function inicializarSimuladorUmidade() {
    const input = document.getElementById("input-umidade");
    const txtValor = document.getElementById("valor-umidade");
    const txtStatus = document.getElementById("status-lavoura");
    const btnS = document.getElementById("btn-seca");
    const btnC = document.getElementById("btn-chuva");

    function processarMudanca(umidade) {
        if (!input || !txtValor || !txtStatus) return;
        input.value = umidade;
        txtValor.innerText = umidade;

        if (umidade < 30) {
            txtStatus.innerHTML = "🥀 <b>Alerta Crítico: Solo Seco!</b> Disparando gotejadores de precisão.";
            txtStatus.style.color = "#ea580c";
        } else if (umidade >= 30 && umidade <= 70) {
            txtStatus.innerHTML = "🌱 <b>Equilíbrio Perfeito:</b> Condição ideal para o desenvolvimento radicular.";
            txtStatus.style.color = "#16a34a";
        } else {
            txtStatus.innerHTML = "💧 <b>Aviso: Solo Saturado!</b> Risco de asfixia radicular, válvulas fechadas.";
            txtStatus.style.color = "#2563eb";
        }
    }

    input?.addEventListener("input", (e) => processarMudanca(e.target.value));
    btnS?.addEventListener("click", () => processarMudanca(12));
    btnC?.addEventListener("click", () => processarMudanca(92));
}

/* 8. MINI-RPG JORNADA DO PRODUTOR */
function inicializarMiniRpgCampos() {
    let safra = 100, natureza = 100, verba = 50000;
    const elS = document.getElementById("status-producao");
    const elN = document.getElementById("status-natureza");
    const elV = document.getElementById("status-caixa");
    const elTxt = document.getElementById("narrativa-texto");
    const containerBtns = document.getElementById("jornada-botoes");
    const btnRst = document.getElementById("btn-reiniciar-jornada");

    const caminhos = {
        arvores: {
            relato: "🌲 <b>Manejo Conservacionista de Sucesso!</b> A mata ciliar barrou detritos de chuvas, evitou assoreamentos e trouxe predadores benéficos, equilibrando a plantação de forma orgânica.",
            dS: 5, dN: 20, dV: -6000
        },
        desmatar: {
            relato: "🪓 <b>Foco Exclusivo em Lucro Imediato:</b> A abertura de área trouxe colheita recorde no ano um, mas gerou clareiras de erosão profundas que desestruturaram o relevo produtivo no longo prazo.",
            dS: -20, dN: -40, dV: 18000
        },
        irrigacao: {
            relato: "💧 <b>Inovação Tecnológica Implementada!</b> Aspersores computadorizados monitoram o estresse hídrico com precisão celular, promovendo economia severa e produção constante.",
            dS: 25, dN: 10, dV: -14000
        }
    };

    if (!containerBtns) return;

    containerBtns.querySelectorAll(".quiz-btn-opcao").forEach(b => {
        b.addEventListener("click", () => {
            const decisao = caminhos[b.getAttribute("data-escolha")];
            if (decisao) {
                safra = Math.max(0, safra + decisao.dS);
                natureza = Math.max(0, Math.min(100, natureza + decisao.dN));
                verba += decisao.dV;

                elS.innerText = `${safra}%`;
                elN.innerText = `${natureza}%`;
                elV.innerText = `R$ ${verba.toLocaleString('pt-BR')}`;
                elTxt.innerHTML = `${decisao.relato}<br><br><b>Resultado:</b> Avalie os indicadores acima!`;

                containerBtns.style.display = "none";
                btnRst.style.display = "block";
            }
        });
    });

    btnRst?.addEventListener("click", () => {
        safra = 100; natureza = 100; verba = 50000;
        elS.innerText = "100%"; elN.innerText = "100%"; elV.innerText = "R$ 50.000";
        elTxt.innerHTML = "Fase Inicial: A safra está prestes a começar. Qual será seu direcionamento ecológico e de investimentos?";
        containerBtns.style.display = "flex";
        btnRst.style.display = "none";
    });
}

/* 9. ANIMAÇÃO AO ROLAR PÁGINA */
function inicializarAnimacaoDeScroll() {
    const verificar = () => {
        document.querySelectorAll(".animar-scroll").forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
                el.classList.add("visivel");
            }
        });
    };
    verificar();
    window.addEventListener("scroll", verificar);
}

/* 10. QUIZ TÉCNICO E CONVENÇÃO DE MEDALHAS */
function inicializarQuizSustentavel() {
    const questoes = [
        { enunciado: "Qual técnica protege o solo contra impactos diretos da chuva e erosões severas?", alternativas: ["Plantio Direto na Palhada", "Aração profunda contínua", "Queimada controlada do resto de safra"], correta: 0 },
        { enunciado: "Qual o principal benefício agronômico do sistema de rotação de culturas?", alternativas: ["Esgotar minerais superficiais", "Quebrar ciclos de pragas e fixar nitrogênio biologicamente", "Substituir maquinários pesados"], correta: 1 },
        { enunciado: "O uso de predadores biológicos contra lagartas na lavoura visa prioritariamente o quê?", alternativas: ["Eliminar totalmente a necessidade de água", "Aumentar os custos", "Reduzir o uso de defensivos químicos sintéticos agressivos"], correta: 2 }
    ];

    let indice = 0, escore = 0;
    const pElement = document.getElementById("pergunta");
    const oElement = document.getElementById("opcoes");
    const bQuiz = document.getElementById("quiz-box");
    const bRes = document.getElementById("resultado-quiz");

    function renderizarQuestao() {
        if (!pElement || !oElement) return;
        if (indice < questoes.length) {
            pElement.innerText = questoes[indice].enunciado;
            oElement.innerHTML = "";
            questoes[indice].alternativas.forEach((opcao, idx) => {
                const btnOpt = document.createElement("button");
                btnOpt.innerText = opcao;
                btnOpt.classList.add("quiz-btn-opcao");
                btnOpt.addEventListener("click", () => {
                    oElement.querySelectorAll(".quiz-btn-opcao").forEach(b => b.disabled = true);
                    if (idx === questoes[indice].corrita || idx === questoes[indice].correct || idx === questoes[indice].correta) {
                        escore++;
                        btnOpt.style.backgroundColor = "#10b981"; btnOpt.style.color = "#fff";
                    } else {
                        btnOpt.style.backgroundColor = "#ef4444"; btnOpt.style.color = "#fff";
                        oElement.querySelectorAll(".quiz-btn-opcao")[questoes[indice].correta].style.backgroundColor = "#10b981";
                        oElement.querySelectorAll(".quiz-btn-opcao")[questoes[indice].correta].style.color = "#fff";
                    }
                    setTimeout(() => { indice++; renderizarQuestao(); }, 1600);
                });
                oElement.appendChild(btnOpt);
            });
        } else {
            if (bQuiz && bRes) {
                bQuiz.style.display = "none"; bRes.style.display = "block";
                document.getElementById("placar").innerText = `Você computou ${escore} de ${questoes.length} acertos técnicos.`;
                let honra = escore === 3 ? "🏆 Gestor Agroecológico do Amanhã!" : escore === 2 ? "🚜 Consultor de Conservação" : "🌱 Estudante Sustentável";
                let corHonra = escore === 3 ? "#eab308" : escore === 2 ? "#0284c7" : "#64748b";
                document.getElementById("badge-container").innerHTML = `<span style="display:inline-block; padding:10px 20px; border:3px solid ${corHonra}; color:${corHonra}; border-radius:20px; font-weight:bold;">${honra}</span>`;
            }
        }
    }

    document.getElementById("btn-reiniciar")?.addEventListener("click", () => {
        indice = 0; escore = 0;
        bRes.style.display = "none"; bQuiz.style.display = "block";
        renderizarQuestao();
    });

    renderizarQuestao();
}