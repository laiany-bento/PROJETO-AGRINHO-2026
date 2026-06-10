/* ==========================================================================
   FUNÇÃO DO MODO COR DO HORÁRIO DINÂMICO (TROCA DE FUNDO E ESTILO)
   ========================================================================== */
function aplicarCorBaseadaNoHorario() {
    const banner = document.getElementById('bannerHero');
    if (!banner) return;

    const horaAtual = new Date().getHours();
    
    // Configura os backgrounds gradientes transparentes somados com imagens reais do Unsplash
    if (horaAtual >= 6 && horaAtual < 12) {
        // MANHÃ: Tons suaves de azul e verde claro
        banner.style.background = "linear-gradient(135deg, rgba(26, 74, 115, 0.85), rgba(43, 134, 196, 0.75)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80')";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        // TARDE: O tom de azul vibrante e iluminado das suas fotos principais
        banner.style.background = "linear-gradient(135deg, #1a2a6c, #275d8c), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad451?auto=format&fit=crop&w=1200&q=80')";
    } else {
        // NOITE: Tons de azul escuro profundo quase preto
        banner.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364), url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80')";
    }
}

/* ==========================================================================
   CONTROLES DO PAINEL DE RECURSOS PCD (BOTÕES DO TOPO)
   ========================================================================== */
function alternarModoEscuro() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.remove('alto-contraste'); // Limpa conflitos
}

function alternarAltoContraste() {
    document.body.classList.toggle('alto-contraste');
    document.body.classList.remove('dark-mode'); // Limpa conflitos
}

function alternarDislexia() {
    document.body.classList.toggle('fonte-dislexia');
}

function alternarAnimacoes() {
    document.body.classList.toggle('sem-animacao');
}

function abrirPainelAcessibilidade() {
    alert("Recursos de acessibilidade ativos! Utilize a barra superior ou navegue pelo teclado (Tab) para gerenciar as funções.");
}

/* ==========================================================================
   LÓGICA DINÂMICA DO MAPA DE INDICADORES INCLUSIVO
   ========================================================================== */
const dadosRegioes = {
    brasil: "<h3>Visão Geral Brasil</h3><p>O país expandiu em 25% o uso de tecnologias inclusivas e monitoramento de biomas no campo nesta safra.</p>",
    pr: "<h3>Indicadores Macrorregiões PR</h3><p>Aguardando a seleção de uma região específica do estado no painel gráfico ao lado.</p>",
    norte: "<h3>Região Norte do Paraná</h3><p><strong>Solo:</strong> Alta fertilidade (Terra Roxa).<p><strong>Uso de Água:</strong> Redução drástica por gotejamento monitorado via IoT.</p>",
    centro: "<h3>Região Central do Paraná</h3><p><strong>Manejo:</strong> Destaque em agricultura familiar sustentável e projetos agroecológicos de proteção de bacias.</p>",
    sul: "<h3>Região Sul do Paraná</h3><p><strong>Estatísticas:</strong> Controle biológico integrado adotado em larga escala, reduzindo defensivos químicos tradicionais.</p>"
};

function carregarIndicadores(regiao) {
    const conteudoPainel = document.getElementById('conteudo-painel');
    if (conteudoPainel && dadosRegioes[regiao]) {
        conteudoPainel.innerHTML = dadosRegioes[regiao];
    }
    
    // Atualiza o estado dos botões de controle de visão superior
    if(regiao === 'brasil' || regiao === 'pr') {
        document.querySelectorAll('.btn-mapa').forEach(btn => btn.classList.remove('ativo'));
        event.currentTarget.classList.add('ativo');
    }
}

/* INICIALIZAÇÃO DA PÁGINA */
window.addEventListener('DOMContentLoaded', () => {
    aplicarCorBaseadaNoHorario();
});