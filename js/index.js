const jogo = document.getElementById("jogo");

const body = document.getElementsByTagName("body")[0];
body.addEventListener("keydown", (tecla) => mudaDirecao(tecla.key));

const referenciaBaseAltura = 15;
let tempoMovimento = 1000;

let area = [];

for (let x = 0; x < referenciaBaseAltura; x++) {
    area.push([]);
    for (let y = 0; y < referenciaBaseAltura; y++) {
        area[x].push({preenchido: false});
    }
}

let snake = {
    direcao: "left",
    coordenadas: {idxLinha: 5, idxColuna: 8}
}

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

function gameOver() {
    clearInterval(gameRunning);
}

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