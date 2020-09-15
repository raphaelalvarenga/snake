// Esta é a div em que o jogo vai acontecer
const jogo = document.getElementById("jogo");

// Esta é a referência que o jogo usará para criar a área de quadros. A área total será o quadrado do valor abaixo
const referenciaBaseAltura = 15;

// Quando uma tecla for pressionada para mudar a direção da cobra, a função mudaDirecao será disparada
const body = document.getElementsByTagName("body")[0];
body.addEventListener("keydown", (tecla) => mudaDirecao(tecla.key));

// Esta é o tempo que cobra leva para se locomover. O nível de dificuldade aumenta se o valor diminui
let tempoMovimento = 1000;

// Este sera o vetor que guardará os quadros que aparecerão na tela
let area = [];

// Aqui o loop monta o objeto de quadros
for (let x = 0; x < referenciaBaseAltura; x++) {
    area.push([]);
    for (let y = 0; y < referenciaBaseAltura; y++) {
        area[x].push({preenchido: false});
    }
}

// A cobra é representada logicamente por este objeto
let snake = {
    direcao: "left",
    coordenadas: {idxLinha: 5, idxColuna: 8}
}

// A cobra se locomove com base nesta lógica
let gameRunning = setInterval(() => {
    switch (snake.direcao) {
        case "up":
            snake.coordenadas.idxLinha === 0 ? snake.coordenadas.idxLinha = referenciaBaseAltura - 1 : snake.coordenadas.idxLinha--;
            break;

        case "down":
            snake.coordenadas.idxLinha === referenciaBaseAltura - 1 ? snake.coordenadas.idxLinha = 0 : snake.coordenadas.idxLinha++;
            break;

        case "left":
            snake.coordenadas.idxColuna === 0 ? snake.coordenadas.idxColuna = referenciaBaseAltura - 1 : snake.coordenadas.idxColuna--;
            break;

        case "right":
            snake.coordenadas.idxColuna === referenciaBaseAltura - 1 ? snake.coordenadas.idxColuna = 0 : snake.coordenadas.idxColuna++;
            break;

        default: break;
    }

    area = area.map((linha, idxLinha) => {
        return linha.map((coluna, idxColuna) => {
            return {
                ...coluna,
                preenchido: idxLinha === snake.coordenadas.idxLinha && idxColuna === snake.coordenadas.idxColuna ? true : false
            }
        })
    })
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