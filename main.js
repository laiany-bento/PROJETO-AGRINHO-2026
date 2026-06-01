/* ==========================================================================
   ARQUIVO JAVASCRIPT PRINCIPAL - AGRINHO 2026
   Contém: Menu responsivo, Cards Expansíveis e o Quiz Interativo.
   ========================================================================== */

// Aguarda todo o HTML carregar na página antes de executar as funções
document.addEventListener("DOMContentLoaded", () => {
    inicializarMenuMobile();
    inicializarCardsExpansiveis();
    inicializarQuiz();
});

/* ==========================================
   1. FUNCIONALIDADE: MENU RESPONSIVO MOBILE
   ========================================== */
function inicializarMenuMobile() {
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            // Alterna a classe 'active' para abrir/fechar o menu no CSS
            navbar.classList.toggle("active");
            
            // Pequeno efeito visual nas barras do hambúrguer
            menuToggle.classList.toggle("open");
        });

        // Fecha o menu automaticamente quando o usuário clica em algum link
        const links = navbar.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuToggle.classList.remove("open");
            });
        });
    }
}

/* ==========================================
   2. FUNCIONALIDADE: CARDS EXPANSÍVEIS
   ========================================== */
function inicializarCardsExpansiveis() {
    const botoes = document.querySelectorAll(".btn-expand");

    botoes.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            // Encontra o card ancestral mais próximo do botão clicado
            const card = evento.target.closest(".card-expand");
            const conteudoExtra = card.querySelector(".conteudo-extra");

            // Verifica se o conteúdo extra está visível ou não
            if (conteudoExtra.style.display === "block") {
                conteudoExtra.style.display = "none";
                evento.target.innerText = "Ler mais";
            } else {
                conteudoExtra.style.display = "block";
                evento.target.innerText = "Ler menos";
            }
        });
    });
}

/* ==========================================
   3. FUNCIONALIDADE: QUIZ DE SUSTENTABILIDADE
   ========================================== */
function inicializarQuiz() {
    // Array de objetos contendo as perguntas do Quiz
    const perguntas = [
        {
            pergunta: "Qual tecnologia ajuda a monitorar pragas e economizar água diretamente na plantação?",
            opcoes: ["Drones e Sensores de Solo", "Tratores antigos sem GPS", "Enxadas manuais"],
            correta: 0
        },
        {
            pergunta: "O que caracteriza a sustentabilidade no Agrinho 2026?",
            opcoes: ["Produzir sem se preocupar com as matas", "Equilibrar tecnologia, alta produção e preservação", "Abandonar o uso de energia limpa"],
            correta: 1
        },
        {
            pergunta: "De onde vem a bioenergia ou energia limpa frequentemente usada no campo moderno?",
            opcoes: ["Combustíveis fósseis puramente", "Painéis Solares e Biomassa", "Geradores a óleo diesel"],
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

    // Função interna para renderizar a pergunta atual na tela
    function carregarPergunta() {
        if (indicePerguntaAtual < perguntas.length) {
            const dadosAtual = perguntas[indicePerguntaAtual];
            elementoPergunta.innerText = dadosAtual.pergunta;
            containerOpcoes.innerHTML = ""; // Limpa as alternativas anteriores

            // Cria um botão dinâmico para cada alternativa existente
            dadosAtual.opcoes.forEach((opcao, indice) => {
                const botaoOpcao = document.createElement("button");
                botaoOpcao.innerText = opacity = opcao;
                botaoOpcao.classList.add("quiz-btn-opcao");
                
                // Adiciona o evento de clique para validar a resposta
                botaoOpcao.addEventListener("click", () => verificarResposta(indice));
                containerOpcoes.appendChild(botaoOpcao);
            });
        } else {
            exibirResultado();
        }
    }

    // Função para checar se a opção clicada está correta
    function verificarResposta(indiceSelecionado) {
        if (indiceSelecionado === perguntas[indicePerguntaAtual].correta) {
            pontuacao++;
        }
        indicePerguntaAtual++;
        carregarPergunta();
    }

    // Altera a visibilidade do container exibindo a nota final do aluno
    function exibirResultado() {
        containerQuizBox.style.display = "none";
        containerResultado.style.display = "block";
        elementoPlacar.innerText = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
    }

    // Reseta as variáveis de controle para reiniciar o game escolar
    btnReiniciar.addEventListener("click", () => {
        pontuacao = 0;
        indicePerguntaAtual = 0;
        containerResultado.style.display = "none";
        containerQuizBox.style.display = "block";
        carregarPergunta();
    });

    // Inicia a primeira pergunta ao carregar a página
    carregarPergunta();
}
// Captura os elementos do simulador de clima
const inputUmidade = document.getElementById("input-umidade");
const valorUmidade = document.getElementById("valor-umidade");
const statusLavoura = document.getElementById("status-lavoura");

if (inputUmidade) {
    inputUmidade.addEventListener("input", (e) => {
        const umidade = e.target.value;
        valorUmidade.innerText = umidade;

        // Lógica para mudar o texto e o visual dinamicamente
        if (umidade < 30) {
            statusLavoura.innerText = "Alerta: Solo Seco! Ativando gotejamento automático.";
            statusLavoura.style.color = "#ff4d4d";
        } else if (umidade >= 30 && umidade <= 70) {
            statusLavoura.innerText = "Condição Ideal: Sensores indicam umidade perfeita.";
            statusLavoura.style.color = "#0077cc";
        } else {
            statusLavoura.innerText = "Aviso: Solo Muito Encharcado! Desligando irrigação.";
            statusLavoura.style.color = "#ffcc00";
        }
    });
}
// Função que monitora a rolagem da página
window.addEventListener("scroll", () => {
    const elementos = document.querySelectorAll(".animar-scroll");
    
    elementos.forEach(elemento => {
        const posicaoElemento = elemento.getBoundingClientRect().top;
        const alturaTela = window.innerHeight * 0.85; // Dispara a animação um pouco antes do elemento chegar no meio da tela

        if (posicaoElemento < alturaTela) {
            elemento.classList.add("visivel");
        }
    });
});
const btnCalcular = document.getElementById("btn-calcular");
const inputHectares = document.getElementById("hectares");
const resultadoCalculo = document.getElementById("resultado-calculo");

if (btnCalcular) {
    btnCalcular.addEventListener("click", () => {
        const hectares = parseFloat(inputHectares.value);
        
        if (isNaN(hectares) || hectares <= 0) {
            resultadoCalculo.innerText = "Por favor, digite um número válido maior que zero.";
            resultadoCalculo.style.color = "red";
            return;
        }

        // Suposição pedagógica: cada hectare com sensor economiza cerca de 1200 litros de água por semana
        const economiaTotal = hectares * 1200;
        resultadoCalculo.style.color = "#0077cc";
        resultadoCalculo.innerText = `Utilizando sensores inteligentes, sua propriedade economizaria cerca de ${economiaTotal} litros de água por semana! 💧`;
    });
}