document.addEventListener("DOMContentLoaded", () => {
    inicializarClimaDinamico();
    carregarConfiguracoesAcessibilidade();
    inicializarBotoesAcessibilidade();
    inicializarNuvemFlutuante();
    inicializarMenuMobile();
    inicializarComparadorImagens();
    inicializarAbasEMapasUnificados();
    inicializarAnimacaoScroll();
});

/* 1. CLIMA DINÂMICO AUTOMÁTICO */
function inicializarClimaDinamico() {
    if (document.body.classList.contains("sem-animacoes")) return;
    
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

/* 2. CONTROLES DE CONFIGURAÇÃO SALVA */
let tamanhoAtualFonte = 100; // Representa 100% (1rem)

function carregarConfiguracoesAcessibilidade() {
    if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");
    if (localStorage.getItem("contrast") === "active") document.body.classList.add("alto-contraste");
    if (localStorage.getItem("dyslexia") === "active") document.body.classList.add("fonte-dislexia");
    if (localStorage.getItem("animations") === "paused") document.body.classList.add("sem-animacoes");
    
    const fonteSalva = localStorage.getItem("fontSize");
    if (fonteSalva) {
        tamanhoAtualFonte = parseInt(fonteSalva, 10);
        document.documentElement.style.setProperty("--tamanho-base-fonte", `${tamanhoAtualFonte / 100}rem`);
    }
}

/* 3. GERENCIADOR DA NUVENZINHA FLUTUANTE */
function inicializarNuvemFlutuante() {
    const toggle = document.getElementById("btnNuvemToggle");
    const conteudo = document.getElementById("nuvemConteudo");

    if (toggle && conteudo) {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const aberto = conteudo.classList.toggle("aberto");
            toggle.setAttribute("aria-expanded", aberto);
        });

        // Fecha a janelinha ao clicar fora dela
        document.addEventListener("click", (e) => {
            if (!conteudo.contains(e.target) && e.target !== toggle) {
                conteudo.classList.remove("aberto");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }
}

/* 4. RECURSOS DA NUVEM (TEXTO E CONTRASTES) */
function inicializarBotoesAcessibilidade() {
    const btnAumentar = document.getElementById("btn-aumentar-texto");
    const btnDiminuir = document.getElementById("btn-diminuir-texto");
    const btnDark = document.getElementById("btn-dark-mode");
    const btnContraste = document.getElementById("btn-alto-contraste");
    const btnDislexia = document.getElementById("btn-dislexia");
    const btnPausa = document.getElementById("btn-pausar-animacao");

    // Controle de Tamanho de Letra (A+ / A-)
    if (btnAumentar && btnDiminuir) {
        btnAumentar.addEventListener("click", () => {
            if (tamanhoAtualFonte < 140) { // Máximo de 140%
                tamanhoAtualFonte += 10;
                document.documentElement.style.setProperty("--tamanho-base-fonte", `${tamanhoAtualFonte / 100}rem`);
                localStorage.setItem("fontSize", tamanhoAtualFonte);
            }
        });

        btnDiminuir.addEventListener("click", () => {
            if (tamanhoAtualFonte > 85) { // Mínimo de 85%
                tamanhoAtualFonte -= 10;
                document.documentElement.style.setProperty("--tamanho-base-fonte", `${tamanhoAtualFonte / 100}rem`);
                localStorage.setItem("fontSize", tamanhoAtualFonte);
            }
        });
    }

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

    if (btnPausa) {
        btnPausa.addEventListener("click", () => {
            const ativo = document.body.classList.toggle("sem-animacoes");
            btnPausa.innerText = ativo ? "▶️ Ativar Animações" : "⏸️ Pausar Animações";
            localStorage.setItem("animations", ativo ? "paused" : "active");
            
            if (ativo) {
                document.body.classList.remove("clima-manha", "clima-tarde", "clima-noite");
            } else {
                inicializarClimaDinamico();
            }
        });
    }
}

/* 5. MENU MOBILE */
function inicializarMenuMobile() {
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            const expandido = navbar.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", expandido);
        });
    }
}

/* 6. COMPARADOR DE IMAGENS */
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

/* 7. MAPA INTERATIVO ADAPTADO */
function inicializarAbasEMapasUnificados() {
    const dadosBrasil = {
        PR: {
            nome: "Estado do Paraná 🌾",
            producao: "Destaque nacional robusto na colheita de soja, milho safrinha e trigo.",
            ambiental: "Referência no Plantio Direto e preservação integrada de microbacias hidrográficas.",
            curiosidade: "União completa de tecnologia com agricultura familiar através de cooperativas locais."
        },
        MT: {
            nome: "Mato Grosso 🚜",
            producao: "Maior produtor nacional de grãos e fibra de algodão em larga escala.",
            ambiental: "Uso estendido de insumos de base biológica para regenerar a microbiologia da terra.",
            curiosidade: "Frotas usam telemetria em tempo real para evitar sobreposição e desperdício de insumos."
        },
        SP: {
            nome: "São Paulo 🍊",
            producao: "Líder absoluto na produção de cana-de-açúcar e citros de alta qualidade.",
            ambiental: "Reaproveitamento completo do bagaço de cana para geração interna de energia termoelétrica limpa.",
            curiosidade: "Abriga o maior arranjo de AgTechs e startups voltadas ao agronegócio do país."
        }
    };

    const dadosParana = {
        norte: {
            nome: "Macrorregião Norte do PR 🟢",
            producao: "Polo de cafés especiais de alto valor e diversificação de grãos.",
            ambiental: "Projetos voltados para recomposição de matas ciliares nativas.",
            curiosidade: "Drones mapeiam falhas de linhas de plantio utilizando imagens aéreas térmicas."
        },
        oeste: {
            nome: "Macrorregião Oeste do PR 🔵",
            producao: "Grande polo de piscicultura de precisão e avicultura integrada.",
            ambiental: "Transformação de dejetos orgânicos em biogás para autogeração de energia limpa.",
            curiosidade: "Sensores autônomos gerenciam oxigenação de viveiros sem manipulação humana desnecessária."
        },
        sul: {
            nome: "Região Sul e Campos Gerais 🟣",
            producao: "Líder em grãos de inverno e bacia leiteira de alto rendimento tecnológico.",
            ambiental: "Adoção sistêmica de rotação de culturas para quebrar ciclos biológicos de pragas.",
            curiosidade: "Reconhecido como o grande berço histórico da conservação produtiva do solo no Brasil."
        }
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

    const mudarAba = (exibirBrasil) => {
        btnBrasil.classList.toggle("ativo", exibirBrasil);
        btnParana.classList.toggle("ativo", !exibirBrasil);
        mapaBrasil.style.display = exibirBrasil ? "block" : "none";
        mapaParana.style.display = exibirBrasil ? "none" : "block";
        placeholder.style.display = "block";
        conteudo.style.display = "none";
    };

    btnBrasil.addEventListener("click", () => mudarAba(true));
    btnParana.addEventListener("click", () => mudarAba(false));

    function exibirInfo(banco, chave) {
        const item = banco[chave];
        if (item) {
            placeholder.style.display = "none";
            conteudo.style.display = "block";
            elNome.innerText = item.nome;
            elProd.innerText = item.producao;
            elAmb.innerText = item.ambiental;
            elCurio.innerText = item.curiosidade;
        }
    }

    document.querySelectorAll(".estado-path").forEach(alvo => {
        const acao = () => exibirInfo(dadosBrasil, alvo.getAttribute("data-estado"));
        alvo.addEventListener("click", acao);
        alvo.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); acao(); } });
    });

    document.querySelectorAll(".regiao-path").forEach(alvo => {
        const acao = () => exibirInfo(dadosParana, alvo.getAttribute("data-regiao"));
        alvo.addEventListener("click", acao);
        alvo.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); acao(); } });
    });
}

/* 8. ANIMAÇÃO DE ROLAGEM SUAVE */
function inicializarAnimacaoScroll() {
    if (document.body.classList.contains("sem-animacoes")) return;

    const checarScroll = () => {
        document.querySelectorAll(".animar-scroll").forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
                el.classList.add("visivel");
            }
        });
    };
    checarScroll();
    window.addEventListener("scroll", checarScroll);
}