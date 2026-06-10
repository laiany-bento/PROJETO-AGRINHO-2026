/* ==========================================================================
   CATEGORIA 3: COMPONENTES VISUAIS (Menu Sanduíche Mobile)
   ========================================================================== */
function toggleMenu() {
    const menuLinks = document.getElementById('menu-links');
    const btnMenu = document.getElementById('btn-menu');
    
    menuLinks.classList.toggle('ativo');
    
    // Atualiza estados do leitor de tela para acessibilidade
    const estaAtivo = menuLinks.classList.contains('ativo');
    btnMenu.setAttribute('aria-expanded', estaAtivo);
}

/* ==========================================================================
   CATEGORIA 2 & CATEGORIA 7: RECURSOS DE ACESSIBILIDADE & LOCALSTORAGE
   ========================================================================== */
function alternarModoEscuro() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('agrinho_darkMode', document.body.classList.contains('dark-mode'));
}

function alternarAltoContraste() {
    document.body.classList.toggle('alto-contraste');
    localStorage.setItem('agrinho_altoContraste', document.body.classList.contains('alto-contraste'));
}

function alternarDislexia() {
    document.body.classList.toggle('fonte-dislexia');
    localStorage.setItem('agrinho_dislexia', document.body.classList.contains('fonte-dislexia'));
}

// Executado de forma automática assim que a página é lida pelo navegador
window.addEventListener('DOMContentLoaded', () => {
    // Carrega preferências salvas no Banco de Dados Local do usuário
    if (localStorage.getItem('agrinho_darkMode') === 'true') document.body.classList.add('dark-mode');
    if (localStorage.getItem('agrinho_altoContraste') === 'true') document.body.classList.add('alto-contraste');
    if (localStorage.getItem('agrinho_dislexia') === 'true') document.body.classList.add('fonte-dislexia');
    
    // Ativa as rotinas de verificação climática e efeitos visuais
    verificarHorarioEClimaDinamico();
    checarScrollEvent();
});

/* ==========================================================================
   CATEGORIA 7: CONTROLE DE HORÁRIO DO SISTEMA (Clima Dinâmico)
   ========================================================================== */
function verificarHorarioEClimaDinamico() {
    const horaAtual = new Date().getHours();
    const banner = document.getElementById('hero-banner');
    
    if (horaAtual >= 6 && horaAtual < 12) {
        // Manhã: Tons claros/verdes
        banner.style.background = "linear-gradient(rgba(27, 94, 32, 0.45), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad451?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        // Tarde: Tons alaranjados
        banner.style.background = "linear-gradient(rgba(230, 126, 34, 0.45), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat";
    } else {
        // Noite: Tons azulados escuros
        banner.style.background = "linear-gradient(rgba(38, 50, 56, 0.7), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat";
    }
}

/* ==========================================================================
   CATEGORIA 3: EFEITO SLIDE DE COMPARAÇÃO (Antes e Depois)
   ========================================================================== */
function moverSlider(evento) {
    const container = evento.currentTarget.getBoundingClientRect();
    let clienteX = evento.clientX;
    
    // Suporte para telas de toque (Mobile)
    if (evento.touches && evento.touches.length > 0) {
        clienteX = evento.touches[0].clientX;
    }
    
    let posicaoX = clienteX - container.left;
    
    // Impede transbordo visual das bordas
    if (posicaoX < 0) posicaoX = 0;
    if (posicaoX > container.width) posicaoX = container.width;
    
    const porcentagem = (posicaoX / container.width) * 100;
    
    document.getElementById('imgAntes').style.width = porcentagem + '%';
    document.getElementById('barraSlider').style.left = porcentagem + '%';
}

/* ==========================================================================
   CATEGORIA 4: ELEMENTOS EDUCATIVOS (Abas de Indicadores)
   ========================================================================== */
const bancoDadosRegioes = {
    pr: {
        titulo: "Paraná (Macro polo do Sul)",
        producao: "Líder nacional na produção integrada de soja, milho safrinha e cooperativismo forte.",
        gestao: "Referência em Plantio Direto na Palhada, protegendo microbacias hidrográficas contra a erosão.",
        inovacao: "Uso de sensores de telemetria em tempo real para controle de insumos e drones agrícolas de pulverização precisa."
    },
    mt: {
        titulo: "Mato Grosso (Gigante do Centro-Oeste)",
        producao: "Maior produtor nacional de grãos de alta escala, algodão de exportação e pecuária integrada.",
        gestao: "Expansão massiva de sistemas ILPF (Integração Lavoura-Pecuária-Floresta) para recuperação de pastagens degradadas.",
        inovacao: "Sistemas ERP em nuvem de ponta no monitoramento de maquinários via satélite e tratores autônomos por GPS."
    },
    sp: {
        titulo: "São Paulo (Potência Tecnológica do Sudeste)",
        producao: "Líder global do setor sucroenergético (cana, etanol, açúcar) e polo dominante na citricultura.",
        gestao: "Certificações rígidas de emissão zero de carbono e eliminação total da prática de queimadas nas colheitas.",
        inovacao: "Uso em massa de biofábricas para multiplicação de macrobiológicos e inteligência artificial na previsão climática."
    }
};

function mostrarAba(chaveRegiao, elementoBotao) {
    document.querySelectorAll('.btn-aba').forEach(btn => {
        btn.classList.remove('ativo');
        btn.setAttribute('aria-selected', 'false');
    });
    
    elementoBotao.classList.add('ativo');
    elementoBotao.setAttribute('aria-selected', 'true');
    
    const dados = bancoDadosRegioes[chaveRegiao];
    const painel = document.getElementById('painel-exibicao');
    
    painel.innerHTML = `
        <h3>${dados.titulo}</h3>
        <p><strong>Produção:</strong> ${dados.producao}</p>
        <p><strong>Gestão Ambiental:</strong> ${dados.gestao}</p>
        <p><strong>Inovações Tech:</strong> ${dados.inovacao}</p>
    `;
}

/* ==========================================================================
   CATEGORIA 5: CALCULADORA DE BIOINSUMOS INTELIGENTE
   ========================================================================== */
function calcularBioinsumos() {
    const campoHectares = document.getElementById('hectares').value;
    const hectares = parseFloat(campoHectares);
    const cultura = document.getElementById('cultura').value;
    const resultadoBox = document.getElementById('resultado-calc');
    
    if (!hectares || hectares <= 0) {
        alert("Por favor, digite uma quantidade de hectares válida.");
        return;
    }
    
    let taxaComposto = 0;
    let taxaBiofertilizante = 0;
    
    if (cultura === 'soja') {
        taxaComposto = 2.0; taxaBiofertilizante = 12.0;
    } else if (cultura === 'milho') {
        taxaComposto = 3.0; taxaBiofertilizante = 20.0;
    } else if (cultura === 'trigo') {
        taxaComposto = 2.5; taxaBiofertilizante = 15.0;
    }
    
    const totalComposto = hectares * taxaComposto;
    const totalBio = hectares * taxaBiofertilizante;
    
    resultadoBox.style.display = "block";
    resultadoBox.innerHTML = `
        <strong>📋 Relatório de Insumos Sustentáveis para sua Área (${hectares} ha):</strong><br>
        <br>
        🌱 <strong>Composto Orgânico Regenerativo:</strong> ${totalComposto.toFixed(1)} Toneladas.<br>
        💧 <strong>Biofertilizante Líquido Inoculante:</strong> ${totalBio.toFixed(0)} Litros.<br>
        <br>
        <em>Benefício Técnico: Esta combinação reduz a dependência de adubos industriais e promove a proliferação de microrganismos benéficos!</em>
    `;
}

/* ==========================================================================
   CATEGORIA 5: SIMULADOR DE SENSOR DE UMIDADE DE SOLO
   ========================================================================== */
function mudarUmidade(porcentagem) {
    const display = document.getElementById('sensorDisplay');
    
    if (porcentagem <= 20) {
        display.innerText = `🚨 Umidade: ${porcentagem}% - Alerta Crítico: Solo Seco! Risco de estresse hídrico. Ative o gotejamento remoto.`;
        display.style.backgroundColor = "#ffcdd2"; display.style.color = "#b71c1c"; display.style.borderColor = "#e53935";
    } else if (porcentagem >= 75) {
        display.innerText = `⚠️ Umidade: ${porcentagem}% - Alerta Climático: Solo Encharcado. Perigo de lixiviação e apodrecimento radicular!`;
        display.style.backgroundColor = "#bbdefb"; display.style.color = "#0d47a1"; display.style.borderColor = "#1e88e5";
    } else {
        display.innerText = `✅ Umidade: ${porcentagem}% - Leitura Ideal. Condições perfeitas para o desenvolvimento estável.`;
        display.style.backgroundColor = "#c8e6c9"; display.style.color = "#1b5e20"; display.style.borderColor = "#4caf50";
    }
}

/* ==========================================================================
   CATEGORIA 5: MINI-RPG "DECISÃO NO CAMPO" (Lógica do Jogo)
   ========================================================================== */
function jogarRPG(opcaoEscolhida) {
    const textoCenario = document.getElementById('rpg-texto');
    const boxOpcoes = document.getElementById('rpg-opcoes');
    
    const medidorSafra = document.getElementById('rpg-safra');
    const medidorEco = document.getElementById('rpg-eco');
    const medidorCaixa = document.getElementById('rpg-caixa');
    
    if (opcaoEscolhida === 'biologico') {
        medidorSafra.innerText = "95%"; medidorEco.innerText = "100%"; medidorCaixa.innerText = "8500";
        textoCenario.innerHTML = "🎯 <strong>Resultado: Excelente decisão!</strong> As microvespas controlaram a lagarta sem resíduos tóxicos. Sua biodiversidade local continuou intacta e o solo totalmente preservado.";
    } else if (opcaoEscolhida === 'quimico') {
        medidorSafra.innerText = "100%"; medidorEco.innerText = "35%"; medidorCaixa.innerText = "11500";
        textoCenario.innerHTML = "⚠️ <strong>Resultado: Alerta Ecológico!</strong> O defensivo de choque matou as pragas rápido. Porém, dizimou abelhas polinizadoras e poluiu o lençol freático local.";
    }
    
    boxOpcoes.innerHTML = `<li><button class="btn-opcao" style="text-align:center; font-weight:700;" onclick="reiniciarRPG()">Reiniciar Simulação RPG</button></li>`;
}

function reiniciarRPG() {
    document.getElementById('rpg-safra').innerText = "100%";
    document.getElementById('rpg-eco').innerText = "100%";
    document.getElementById('rpg-caixa').innerText = "10000";
    document.getElementById('rpg-texto').innerText = "Cenário: Uma forte infestação de lagartas ameaça destruir sua plantação de milho. Qual estratégia você adota?";
    document.getElementById('rpg-opcoes').innerHTML = `
        <li><button class="btn-opcao" onclick="jogarRPG('biologico')">Opção Sustentável: Aplicar Controle Biológico com liberação de vespas parasitoides.</button></li>
        <li><button class="btn-opcao" onclick="jogarRPG('quimico')">Opção Tradicional: Pulverizar agrotóxico químico pesado de choque imediato.</button></li>
    `;
}

/* ==========================================================================
   CATEGORIA 6: QUIZ AVANÇADO COM FEEDBACK INSTANTÂNEO & MEDALHAS
   ========================================================================== */
function responderQuiz(isCorreto, elementoBotao) {
    const blocoOpcoes = elementoBotao.closest('#quiz-opcoes');
    const todosBotoes = blocoOpcoes.querySelectorAll('.btn-opcao');
    
    todosBotoes.forEach(btn => btn.disabled = true);
    
    if (isCorreto) {
        elementoBotao.style.backgroundColor = "#2e7d32";
        elementoBotao.style.color = "#ffffff";
        document.getElementById('painelMedalha').style.display = "block";
    } else {
        elementoBotao.style.backgroundColor = "#c62828";
        elementoBotao.style.color = "#ffffff";
        
        // Destaca visualmente a alternativa correta em verde para aprendizado imediato
        todosBotoes.forEach(btn => {
            if (btn.textContent.includes("Proteger a terra contra erosão")) {
                btn.style.backgroundColor = "#2e7d32";
                btn.style.color = "#ffffff";
            }
        });
    }
}

/* ==========================================================================
   CATEGORIA 3: ANIMAÇÃO DE SURGIMENTO AO ROLAR A TELA (Scroll Animation)
   ========================================================================== */
const cardsParaAnimar = document.querySelectorAll('.animar-scroll');

function checarScrollEvent() {
    const gatilhoJanela = window.innerHeight - 60;
    
    cardsParaAnimar.forEach(card => {
        const topoCard = card.getBoundingClientRect().top;
        if (topoCard < gatilhoJanela) {
            card.classList.add('visivel');
        }
    });
}

window.addEventListener('scroll', checarScrollEvent);