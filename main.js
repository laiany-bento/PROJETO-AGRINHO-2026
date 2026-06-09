document.addEventListener("DOMContentLoaded", () => {
    inicializarNuvemFlutuante();
    inicializarBotoesAcessibilidade();
    inicializarMenuMobile();
    inicializarComparadorImagens();
    inicializarAbasEMapasUnificados();
    inicializarAnimacaoScroll();
});

let tamanhoAtualFonte = 100;

function inicializarNuvemFlutuante() {
    const toggle = document.getElementById("btnNuvemToggle");
    const conteudo = document.getElementById("nuvemConteudo");

    if (toggle && conteudo) {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const aberto = conteudo.classList.toggle("aberto");
            toggle.setAttribute("aria-expanded", aberto);
        });

        document.addEventListener("click", (e) => {
            if (!conteudo.contains(e.target) && e.target !== toggle) {
                conteudo.classList.remove("aberto");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }
}

function inicializarBotoesAcessibilidade() {
    const btnAumentar = document.getElementById("btn-aumentar-texto");
    const btnDiminuir = document.getElementById("btn-diminuir-texto");
    const btnDark = document.getElementById("btn-dark-mode");
    const btnContraste = document.getElementById("btn-alto-contraste");
    const btnDislexia = document.getElementById("btn-dislexia");
    const btnPausa = document.getElementById("btn-pausar-animacao");

    if (btnAumentar && btnDiminuir) {
        btnAumentar.addEventListener("click", () => {
            if (tamanhoAtualFonte < 130) {
                tamanhoAtualFonte += 10;
                document.documentElement.style.setProperty("--tamanho-base-fonte", `${tamanhoAtualFonte / 100}rem`);
            }
        });
        btnDiminuir.addEventListener("click", () => {
            if (tamanhoAtualFonte > 90) {
                tamanhoAtualFonte -= 10;
                document.documentElement.style.setProperty("--tamanho-base-fonte", `${tamanhoAtualFonte / 100}rem`);
            }
        });
    }

    if (btnDark) btnDark.addEventListener("click", () => document.body.classList.toggle("dark-mode"));
    if (btnContraste) btnContraste.addEventListener("click", () => document.body.classList.toggle("alto-contraste"));
    if (btnDislexia) btnDislexia.addEventListener("click", () => document.body.classList.toggle("fonte-dislexia"));
    if (btnPausa) {
        btnPausa.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("sem-animacoes");
            btnPausa.innerText = ativo ? "▶️ Ativar Animações" : "⏸️ Pausar Animações";
        });
    }
}

function inicializarMenuMobile() {
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }
}

function inicializarComparadorImagens() {
    const slider = document.getElementById("slider-divisor");
    const fotoDegradada = document.getElementById("foto-degradada");
    if (slider && fotoDegradada) {
        slider.addEventListener("input", () => {
            fotoDegradada.style.width = `${slider.value}%`;
        });
    }
}

function inicializarAbasEMapasUnificados() {
    const dadosBrasil = {
        PR: { nome: "Estado do Paraná 🌾", producao: "Líder regional em soja, milho safrinha e trigo.", ambiental: "Referência em Plantio Direto.", curio: "Forte cultura cooperativista tecnológica." },
        MT: { nome: "Mato Grosso 🚜", producao: "Maior produtor nacional de grãos de larga escala.", ambiental: "Uso massivo de bioinsumos.", curio: "Telemetria avançada em tratores." },
        SP: { nome: "São Paulo 🍊", producao: "Referência em cana-de-açúcar e citros de exportação.", ambiental: "Geração de bioenergia limpa.", curio: "Maior ecossistema de Agtechs do país." }
    };

    const dadosParana = {
        norte: { nome: "Norte do Paraná 🟢", producao: "Cafés especiais premiados mundialmente.", ambiental: "Recuperação ativa de matas ciliares.", curio: "Uso de drones para mapeamento térmico." },
        oeste: { nome: "Oeste do Paraná 🔵", producao: "Polo de piscicultura e avicultura automatizada.", ambiental: "Conversão de biomassa em biogás energético.", curio: "Alimentadores controlados por sensores." },
        sul: { nome: "Sul e Campos Gerais 🟣", producao: "Alta produtividade de grãos e bacia leiteira premium.", ambiental: "Sistemas consolidados de rotação de culturas.", curio: "Berço da agricultura de conservação do solo." }
    };

    const btnBrasil = document.getElementById("btn-aba-brasil");
    const btnParana = document.getElementById("btn-aba-parana");
    const mapaBrasil = document.getElementById("wrapper-mapa-brasil");
    const mapaParana = document.getElementById("wrapper-mapa-parana");

    const placeholder = document.getElementById("mapa-placeholder-texto");
    const conteudo = document.getElementById("mapa-dados-conteudo");
    const elNome = document.getElementById("mapa-nome-regiao");
    const elProd = document.getElementById("mapa-producao");
    const elAmb = document.getElementById("mapa-ambiental");
    const elCurio = document.getElementById("mapa-curiosidade");

    if (!btnBrasil || !btnParana) return;

    btnBrasil.addEventListener("click", () => {
        btnBrasil.classList.add("ativo"); btnParana.classList.remove("ativo");
        mapaBrasil.style.display = "block"; mapaParana.style.display = "none";
        conteudo.style.display = "none"; placeholder.style.display = "block";
    });

    btnParana.addEventListener("click", () => {
        btnParana.classList.add("ativo"); btnBrasil.classList.remove("ativo");
        mapaBrasil.style.display = "none"; mapaParana.style.display = "block";
        conteudo.style.display = "none"; placeholder.style.display = "block";
    });

    function renderizar(dados, chave) {
        const item = dados[chave];
        if (item) {
            placeholder.style.display = "none"; conteudo.style.display = "block";
            elNome.innerText = item.nome; elProd.innerText = item.producao;
            elAmb.innerText = item.ambiental; elCurio.innerText = item.curio;
        }
    }

    document.querySelectorAll(".estado-path").forEach(el => {
        el.addEventListener("click", () => renderizar(dadosBrasil, el.getAttribute("data-estado")));
    });
    document.querySelectorAll(".regiao-path").forEach(el => {
        el.addEventListener("click", () => renderizar(dadosParana, el.getAttribute("data-regiao")));
    });
}

function inicializarAnimacaoScroll() {
    const checar = () => {
        document.querySelectorAll(".animar-scroll").forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add("visivel");
        });
    };
    window.addEventListener("scroll", checar);
    checar();
}