/**
 * ARQUIVO: main.js
 * FUNÇÃO: Processar toda a lógica interativa, acessibilidade e simuladores do Agrinho 2026.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. SISTEMA DE CONTROLE DE HORÁRIO (CLIMA DINÂMICO AUTOMÁTICO)
    // ==========================================================================
    const aplicarClimaPorHorario = () => {
        const hora = new Date().getHours();
        const heroSection = document.querySelector(".hero");
        
        if (!heroSection) return;

        if (hora >= 6 && hora < 12) {
            // Manhã: Tons dourados e ensolarados
            heroSection.style.background = "linear-gradient(135deg, rgba(239, 172, 53, 0.8), rgba(24, 78, 41, 0.85)), url('https://images.unsplash.com/photo-1592982537447-744077110b90?q=80&w=1200') center/cover no-repeat";
        } else if (hora >= 12 && hora < 18) {
            // Tarde: Tons intensos de céu aberto
            heroSection.style.background = "linear-gradient(135deg, rgba(40, 145, 108, 0.8), rgba(16, 42, 23, 0.9)), url('https://images.unsplash.com/photo-1592982537447-744077110b90?q=80&w=1200') center/cover no-repeat";
        } else {
            // Noite: Visual noturno azulado/estrelado
            heroSection.style.background = "linear-gradient(135deg, rgba(10, 27, 40, 0.9), rgba(20, 40, 30, 0.95)), url('https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200') center/cover no-repeat";
        }
    };
    aplicarClimaPorHorario();

    // ==========================================================================
    // 2. SISTEMA DE ACESSIBILIDADE COM GRAVAÇÃO LOCAL (LOCALSTORAGE)
    // ==========================================================================
    const setupAcessibilidade = (btnId, className) => {
        const btn = document.getElementById(btnId);
        
        // Verifica se a preferência já estava salva no navegador
        if (localStorage.getItem(className) === "true") {
            document.body.classList.add(className);
        }

        btn.addEventListener("click", () => {
            const ativo = document.body.classList.toggle(className);
            localStorage.setItem(className, ativo); // Salva o estado atual
        });
    };

    setupAcessibilidade("btn-dark", "dark-mode");
    setupAcessibilidade("btn-contrast", "high-contrast");
    setupAcessibilidade("btn-dyslexia", "dyslexia-font");

    // ==========================================================================
    // 3. MENU RESPONSÍVEL (MOBILE TOGGLE)
    // ==========================================================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !expanded);
        navMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em qualquer link (Melhoria de UX no Mobile)
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // ==========================================================================
    // 4. SLIDE DE COMPARAÇÃO DE SOLO (ANTES E DEPOIS)
    // ==========================================================================
    const sliderSolo = document.getElementById("slider-solo");
    const imgAfter = document.querySelector(".image-after");

    if (sliderSolo && imgAfter) {
        sliderSolo.addEventListener("input", (e) => {
            const valor = e.target.value;
            imgAfter.style.width = `${valor}%`;
        });
    }

    // ==========================================================================
    // 5. ACCORDION EXPANSÍVEL (SEÇÃO TECNOLOGIA)
    // ==========================================================================
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            
            // Fecha outros itens abertos se houver
            document.querySelectorAll(".accordion-content").forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.style.padding = "0 15px";
                }
            });

            // Alterna o item clicado
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = "0 15px";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.padding = "15px";
            }
        });
    });

    // ==========================================================================
    // 6. CENTRAL DE INDICADORES REGIONAIS (BOTÕES DINÂMICOS)
    // ==========================================================================
    const dadosRegioes = {
        "pr": {
            titulo: "Estado do Paraná",
            prod: "Maior produtor de soja sustentável e grãos em sistema de plantio direto.",
            gestao: "Programas estaduais focados na proteção de nascentes e bacias hidrográficas.",
            tech: "Mais de 60% das fazendas integradas cooperativamente usam sensores de campo."
        },
        "mt": {
            titulo: "Estado do Mato Grosso",
            prod: "Líder nacional na produção de grãos e fibras vegetais em larga escala.",
            gestao: "Forte investimento no mercado de créditos de carbono agrícolas.",
            tech: "Pioneiro no uso massivo de drones de pulverização e imagens orbitais de alta definição."
        },
        "sp": {
            titulo: "Estado de São Paulo",
            prod: "Referência global em cana-de-açúcar, bioenergia e citricultura.",
            gestao: "Zonamento agroecológico restrito para expansão limpa industrial.",
            tech: "Sede dos principais hubs de AgTechs e institutos de bioengenharia agrícola."
        },
        "pr-norte": {
            titulo: "Norte do Paraná",
            prod: "Histórico polo cafeeiro, hoje diversificado com grãos e fruticultura.",
            gestao: "Recuperação ativa de solos arenosos vulneráveis.",
            tech: "Uso crescente de IA para monitoramento climático regional."
        },
        "pr-oeste": {
            titulo: "Oeste do Paraná",
            prod: "Gigante na produção integrada de proteína animal, milho e milheto.",
            gestao: "Uso maciço de dejetos animais para produção de Biogás e Biofertilizantes.",
            tech: "Uso de automação pesada e robótica no manejo animal e de grãos."
        },
        "pr-sul": {
            titulo: "Sul / Campos Gerais (PR)",
            prod: "Excelência nacional em trigo, cevada e bacia leiteira de alta produtividade.",
            gestao: "Berço do Sistema de Plantio Direto e rotação rigorosa de culturas.",
            tech: "Tratores e colheitadeiras 100% autônomos guiados por GPS RTX de alta precisão."
        }
    };

    const painel = document.getElementById("painel-indicadores");
    const botoesGeo = document.querySelectorAll(".btn-geo");

    const atualizarPainelGeo = (idRegiao) => {
        const dados = dadosRegioes[idRegiao];
        if (!dados) return;

        painel.innerHTML = `
            <h3>${dados.titulo}</h3>
            <p style="margin-top: 10px;"><strong>🌾 Produção:</strong> ${dados.prod}</p>
            <p><strong>🍃 Gestão Ambiental:</strong> ${dados.gestao}</p>
            <p><strong>⚡ Inovação Tech:</strong> ${dados.tech}</p>
        `;
    };

    botoesGeo.forEach(botao => {
        botao.addEventListener("click", () => {
            botoesGeo.forEach(b => b.classList.remove("active"));
            botao.classList.add("active");
            atualizarPainelGeo(botao.getAttribute("data-region"));
        });
    });
    // Inicializa o primeiro painel (Paraná) por padrão
    atualizarPainelGeo("pr");

    // ==========================================================================
    // 7. CALCULADORA DE BIOINSUMOS BASEADA EM HECTARES
    // ==========================================================================
    const btnCalcular = document.getElementById("btn-calcular");
    const inputHectares = document.getElementById("calc-hec");
    const selectCultura = document.getElementById("calc-cultura");
    const resultCalc = document.getElementById("result-calc");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const ha = parseFloat(inputHectares.value);
            const cultura = selectCultura.value;

            if (isNaN(ha) || ha <= 0) {
                alert("Por favor, digite um valor válido de hectares.");
                return;
            }

            let fatorComposto = 2; // Toneladas por Hectare padrão
            let fatorBiofertilizante = 15; // Litros por Hectare padrão

            if (cultura === "milho") { fatorComposto = 2.5; fatorBiofertilizante = 20; }
            if (cultura === "trigo") { fatorComposto = 1.8; fatorBiofertilizante = 12; }

            const totalComposto = (ha * fatorComposto).toFixed(1);
            const totalBio = (ha * fatorBiofertilizante).toFixed(0);

            resultCalc.innerHTML = `
                <h4>Dosagem Ecológica Recomendada:</h4>
                <p>📍 Área Informada: <strong>${ha} Hectares</strong></p>
                <p>🪱 Composto Orgânico: <strong>${totalComposto} Toneladas</strong></p>
                <p>🧪 Biofertilizantes Líquidos: <strong>${totalBio} Litros</strong></p>
                <small style="display:block; margin-top:8px; color:gray;">*Cálculo gerado para substituição regenerativa de NPK químico.</small>
            `;
            resultCalc.style.display = "block";
        });
    }

    // ==========================================================================
    // 8. SIMULADOR DE SENSOR DE UMIDADE DO SOLO
    // ==========================================================================
    const sliderUmidade = document.getElementById("slider-umidade");
    const valUmidade = document.getElementById("val-umidade");
    const sensorStatus = document.getElementById("sensor-status");
    const btnCalor = document.getElementById("btn-calor");
    const btnChuva = document.getElementById("btn-chuva");

    const atualizarStatusSensor = (valor) => {
        valUmidade.textContent = valor;
        sensorStatus.className = "sensor-display"; // Reseta classes

        if (valor < 30) {
            sensorStatus.textContent = "ALERTA CRÍTICO: Solo Seco. Ative a Irrigação de Emergência!";
            sensorStatus.classList.add("status-perigo");
        } else if (valor >= 30 && valor <= 70) {
            sensorStatus.textContent = "Status: Solo Ideal para Desenvolvimento da Planta.";
            sensorStatus.classList.add("status-ideal");
        } else {
            sensorStatus.textContent = "ALERTA: Solo Saturado/Alagado. Risco de asfixia radicular!";
            sensorStatus.classList.add("status-alerta");
        }
    };

    if (sliderUmidade) {
        sliderUmidade.addEventListener("input", (e) => atualizarStatusSensor(e.target.value));
        
        btnCalor.addEventListener("click", () => {
            sliderUmidade.value = 15;
            atualizarStatusSensor(15);
        });

        btnChuva.addEventListener("click", () => {
            sliderUmidade.value = 85;
            atualizarStatusSensor(85);
        });
    }

    // ==========================================================================
    // 9. QUIZ AVANÇADO COM FEEDBACK INSTANTÂNEO E MEDALHAS
    // ==========================================================================
    const dadosQuiz = [
        {
            q: "Qual prática evita a exaustão do solo e quebra o ciclo biológico de pragas?",
            o: ["Uso de fertilizantes químicos puros", "Rotação de Culturas", "Monocultura contínua", "Queimada controlada"],
            a: 1
        },
        {
            q: "Como os drones auxiliam diretamente na sustentabilidade do campo?",
            o: ["Substituindo o trabalho dos tratores", "Espantando pássaros nocivos", "Mapeando pragas com precisão e reduzindo o desperdício de defensivos", "Colhendo frutos pesados"],
            a: 2
        },
        {
            q: "Qual o principal benefício do uso de Bioinsumos na lavoura?",
            o: ["Aumentar o custo de produção", "Substituir defensivos químicos sintéticos agressivos por agentes e fungos biológicos naturais", "Acelerar a erosão de forma controlada", "Tornar a planta dependente de irrigação constante"],
            a: 1
        }
    ];

    let perguntaAtual = 0;
    let pontosQuiz = 0;

    const quizQuestion = document.getElementById("quiz-question");
    const quizOptions = document.getElementById("quiz-options");
    const quizBody = document.getElementById("quiz-body");
    const quizResult = document.getElementById("quiz-result");
    const medalTitle = document.getElementById("medal-title");
    const medalDesc = document.getElementById("medal-desc");
    const btnResetQuiz = document.getElementById("btn-reset-quiz");

    const carregarQuestaoQuiz = () => {
        if (perguntaAtual < dadosQuiz.length) {
            const item = dadosQuiz[perguntaAtual];
            quizQuestion.textContent = `${perguntaAtual + 1}. ${item.q}`;
            quizOptions.innerHTML = "";
            
            item.o.forEach((opcao, idx) => {
                const btn = document.createElement("button");
                btn.className = "btn-opt";
                btn.textContent = opcao;
                btn.addEventListener("click", () => checarRespostaQuiz(idx, btn));
                quizOptions.appendChild(btn);
            });
        } else {
            exibirResultadoQuiz();
        }
    };

    const checarRespostaQuiz = (escolha, botaoClicado) => {
        const item = dadosQuiz[perguntaAtual];
        const botoes = quizOptions.querySelectorAll(".btn-opt");
        
        // Desativa todos para evitar múltiplos cliques do usuário
        botoes.forEach(b => b.disabled = true);

        if (escolha === item.a) {
            botaoClicado.classList.add("correct");
            pontosQuiz++;
        } else {
            botaoClicado.classList.add("wrong");
            botoes[item.a].classList.add("correct"); // Mostra a correta para o estudante aprender
        }

        setTimeout(() => {
            perguntaAtual++;
            carregarQuestaoQuiz();
        }, 1500);
    };

    const exibirResultadoQuiz = () => {
        quizBody.style.display = "none";
        quizResult.style.display = "block";
        
        medalTitle.textContent = `Você acertou ${pontosQuiz} de ${dadosQuiz.length} perguntas!`;
        
        if (pontosQuiz === 3) {
            medalDesc.textContent = "🥇 Medalha: Engenheiro Agrônomo do Futuro!";
        } else if (pontosQuiz === 2) {
            medalDesc.textContent = "🥈 Medalha: Técnico Agrícola Consciente!";
        } else {
            medalDesc.textContent = "🥉 Medalha: Produtor Iniciante Aprendiz!";
        }
    };

    if (btnResetQuiz) {
        btnResetQuiz.addEventListener("click", () => {
            perguntaAtual = 0;
            pontosQuiz = 0;
            quizBody.style.display = "block";
            quizResult.style.display = "none";
            carregarQuestaoQuiz();
        });
    }
    carregarQuestaoQuiz();

    // ==========================================================================
    // 10. MINI-RPG "DECISÃO NO CAMPO" (JORNADA DO PRODUTOR)
    // ==========================================================================
    let rpgStatus = { safra: 50, eco: 50, caixa: 5000 };

    const fasesRpg = [
        {
            texto: "Fase 1: Pragas invasoras ameaçam sua plantação de soja no início do ciclo. O que fazer?",
            escolhas: [
                { t: "Aplicar defensivo químico pesado (Rápido e Barato)", delta: { safra: 20, eco: -25, caixa: -500 } },
                { t: "Liberar macrovespas biológicas (Controle Regenerativo)", delta: { safra: 15, eco: 25, caixa: -1000 } }
            ]
        },
        {
            texto: "Fase 2: Período de estiagem prolongada previsto pelo radar meteorológico. Qual investimento priorizar?",
            escolhas: [
                { t: "Instalar Irrigação por Gotejamento Inteligente automatizado", delta: { safra: 25, eco: 10, caixa: -2500 } },
                { t: "Manter sistema tradicional por aspersão e torcer pelo clima", delta: { safra: -20, eco: -15, caixa: 0 } }
            ]
        },
        {
            texto: "Fase 3: Sobrou área de reserva legal desmatada na fazenda pelas gestões anteriores. Qual seu plano?",
            escolhas: [
                { t: "Reflorestar com mudas nativas cumprindo o Código Florestal", delta: { safra: 0, eco: 30, caixa: -800 } },
                { t: "Ignorar e plantar mais área de grãos para aumentar lucro rápido", delta: { safra: 15, eco: -40, caixa: 1500 } }
            ]
        }
    ];

    let faseRpgAtual = 0;
    const rpgText = document.getElementById("rpg-text");
    const rpgChoices = document.getElementById("rpg-choices");

    const atualizarDashboardRpg = () => {
        document.getElementById("rpg-safra").textContent = rpgStatus.safra;
        document.getElementById("rpg-eco").textContent = rpgStatus.eco;
        document.getElementById("rpg-caixa").textContent = rpgStatus.caixa;
    };

    const rodarRpg = () => {
        atualizarDashboardRpg();

        if (faseRpgAtual < fasesRpg.length) {
            const fase = fasesRpg[faseRpgAtual];
            rpgText.textContent = fase.texto;
            rpgChoices.innerHTML = "";

            fase.escolhas.forEach(escolha => {
                const btn = document.createElement("button");
                btn.className = "btn-opt";
                btn.textContent = escolha.t;
                btn.addEventListener("click", () => processarEscolhaRpg(escolha.delta));
                rpgChoices.appendChild(btn);
            });
        } else {
            // Fim de jogo - Avaliação de Desempenho do Produtor
            rpgChoices.innerHTML = "";
            if (rpgStatus.eco >= 60 && rpgStatus.caixa > 2000) {
                rpgText.innerHTML = "🎉 <strong>Fim de Jogo: Fazenda de Sucesso Absoluto!</strong> Você provou que a tecnologia e a sustentabilidade andam juntas. Sua terra está rica e seu caixa equilibrado.";
            } else if (rpgStatus.eco < 40) {
                rpgText.innerHTML = "⚠️ <strong>Fim de Jogo: Colapso Ecológico!</strong> Embora você tenha lucrado inicialmente, o solo esgotou e sua fazenda sofreu multas ambientais severas. Revise seus conceitos de agroecologia!";
            } else {
                rpgText.innerHTML = "🏁 <strong>Fim de Jogo: Fazenda Estável.</strong> Sua propriedade sobreviveu, mas equilibrar melhor seus investimentos trará melhores colheitas no futuro.";
            }
        }
    };

    const processarEscolhaRpg = (delta) => {
        rpgStatus.safra = Math.max(0, Math.min(100, rpgStatus.safra + delta.safra));
        rpgStatus.eco = Math.max(0, Math.min(100, rpgStatus.eco + delta.eco));
        rpgStatus.caixa += delta.caixa;

        faseRpgAtual++;
        rodarRpg();
    };

    rodarRpg();

    // ==========================================================================
    // 11. ANIMAÇÃO SUAVE DE SURGIMENTO AO ROLAR PÁGINA (SCROLL ANIMATION)
    // ==========================================================================
    const elementosScroll = document.querySelectorAll(".animar-scroll");

    const checkScroll = () => {
        const gatilhoJanela = window.innerHeight * 0.85;

        elementosScroll.forEach(el => {
            const topoElemento = el.getBoundingClientRect().top;
            if (topoElemento < gatilhoJanela) {
                el.classList.add("ativo");
            }
        });
    };

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Executa uma vez no início caso haja elementos visíveis
});