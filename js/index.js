// Esta é a div em que o jogo vai acontecer
const jogo = document.getElementById("jogo");

// Esta é a referência que o jogo usará para criar a área de quadros. A área total será o quadrado do valor abaixo
const referenciaBaseAltura = 15;

// Definindo a largura do game
jogo.style.width = referenciaBaseAltura * 50 + "px";
jogo.style.borderStyle = "solid";
jogo.style.margin = "auto";

// Quando uma tecla for pressionada para mudar a direção da cobra, a função mudaDirecao será disparada
const body = document.getElementsByTagName("body")[0];
body.addEventListener("keydown", (tecla) => mudaDirecao(tecla.key));

// Esta é o tempo que cobra leva para se locomover. O nível de dificuldade aumenta se o valor diminui
let tempoMovimento = 300;

// Este sera o vetor que guardará os quadros que aparecerão na tela
let area = [];

// Esta constante é apenas para gerar uma direção inicial aleatória
const direcoes = ["up", "down", "left", "right"];

// A cobra é representada logicamente por este objeto
let snake = {
    direcao: direcoes[Math.floor(Math.random() * 4)],
    coordenadas: [{idxLinha: 5, idxColuna: 8}]
}

// Define o local da comida
let comida = posicionaComida();

// Aqui o loop monta o objeto de quadros
refresh();

// A cobra se locomove com base nesta lógica
let gameRunning = setInterval(() => {

    // Se a cobra já comeu alguma comida, o lastro do caminho precisa ser guardado para os próximos quadros
    if (snake.coordenadas.length > 1) {
        for (let x = snake.coordenadas.length - 1; x >= 0; x--) {
            if (x > 0) {
                snake.coordenadas[x] = JSON.parse(JSON.stringify(snake.coordenadas[x - 1]));
            }
        }
    }

    switch (snake.direcao) {
        case "up":
            snake.coordenadas[0].idxLinha === 0 ? snake.coordenadas[0].idxLinha = referenciaBaseAltura - 1 : --snake.coordenadas[0].idxLinha;
            break;

        case "down":
            snake.coordenadas[0].idxLinha === referenciaBaseAltura - 1 ? snake.coordenadas[0].idxLinha = 0 : ++snake.coordenadas[0].idxLinha;
            break;

        case "left":
            snake.coordenadas[0].idxColuna === 0 ? snake.coordenadas[0].idxColuna = referenciaBaseAltura - 1 : --snake.coordenadas[0].idxColuna;
            break;

        case "right":
            snake.coordenadas[0].idxColuna === referenciaBaseAltura - 1 ? snake.coordenadas[0].idxColuna = 0 : ++snake.coordenadas[0].idxColuna;
            break;
            
            default: break;
    }
        
    // Esta constante vai guardar o dado se a cobra comeu a comida
    const comeu = snake.coordenadas[0].idxLinha === comida.idxLinha && snake.coordenadas[0].idxColuna === comida.idxColuna ? true : false;

    // Se comeu, então tem que adicionar mais uma instância de coordenadas para a comida
    if (comeu) {
        snake.coordenadas.push(snake.coordenadas[snake.coordenadas.length - 1])
        comida = posicionaComida();
    };

    refresh();
}, tempoMovimento);

// Caso o game termine
function gameOver() {
    clearInterval(gameRunning);
}

// Esta função muda a direção da cobra
function mudaDirecao(direcao) {
    const condicionais = [
        direcao === "ArrowUp",
        direcao === "ArrowDown",
        direcao === "ArrowLeft",
        direcao === "ArrowRight"
    ]
    
    if (condicionais.includes(true)) {
        switch (direcao) {
            case "ArrowUp":
                if (snake.direcao !== "down") snake.direcao = "up";
                break;
            
            case "ArrowDown":
                if (snake.direcao !== "up") snake.direcao = "down";
                break;
                
            case "ArrowLeft":
                if (snake.direcao !== "right") snake.direcao = "left";
                break;
                
            case "ArrowRight":
                if (snake.direcao !== "left") snake.direcao = "right";
                break;

            default: break;
        }
    }
}

function refresh() {
    area = [];
    jogo.innerHTML = "";

    // Aqui o loop monta o objeto de quadros
    for (let x = 0; x < referenciaBaseAltura; x++) {
        area.push([]);

        const novaLinha = document.createElement("div");
        novaLinha.setAttribute("id", `div-linha-${x}`);
        novaLinha.style.display = "flex";

        for (let y = 0; y < referenciaBaseAltura; y++) {
            let preenchimento;

            // Primeiramente, preenchimento ou será uma comida ou será false
            preenchimento = x === comida.idxLinha && y === comida.idxColuna ? "comida" : false;

            // Porém, se x e y baterem com as coordenadas da cobra, então preenchimento vira true
            snake.coordenadas.map(coordenada => {
                if (coordenada.idxLinha === x && coordenada.idxColuna === y) {
                    preenchimento = true;
                }
            });

            area[x].push(preenchimento);
            
            const novaColuna = document.createElement("div");
            novaColuna.setAttribute("id", `div-${x}-${y}`);
            novaColuna.style.width = "50px";
            novaColuna.style.height = "50px";
            novaColuna.style.lineHeight = "50px";
            novaColuna.style.textAlign = "center";
            novaColuna.style.backgroundColor = preenchimento === "comida" ? "blue" : preenchimento ? "black" : "white";

            novaLinha.appendChild(novaColuna);
        }

        jogo.appendChild(novaLinha);
    }
}

function posicionaComida() {
    // A comida não pode ser posicionada em nenhum local onde a cobra e sua cauda estejam posicionadas
    let novaPosicao = {idxLinha: null, idxColuna: null}
    let isPreenchido = false;

    do {
        novaPosicao = {idxLinha: Math.floor(Math.random() * referenciaBaseAltura), idxColuna: Math.floor(Math.random() * referenciaBaseAltura)};

        isPreenchido = snake.coordenadas.some(coordenada => {
            coordenada.idxLinha === novaPosicao.idxLinha && coordenada.idxColuna === novaPosicao.idxColuna
        });
    }
    
    while (isPreenchido);

    return novaPosicao;
}