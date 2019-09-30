const mobRoute = [[0, 5], [1, 5], [2, 5], [2, 4], [2, 3], [2, 2], [3, 2], [4, 2], [5, 2], [5, 3], [5, 4], [5, 5],
[5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [9, 5], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4]];
const X = 0;
const Y = 1;
let enemy;


async function mobs() {
    for (let i = 1; i<6; i++) {
        steps();
        await sleep(1000);
    }
}

async function steps() {
    for (let coordinate of mobRoute) {
        let cell = document.querySelector('[data-coordinate-x="'+ coordinate[X] +'"][data-coordinate-y="' + coordinate[Y] +'"]');
        cell.style.backgroundColor = "black";
        await sleep(500);
        cell.style.backgroundColor = "";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function spawn(wave){

    switch (wave) {
        case 1:
            enemy = new Enemy(wave, 1000, 5);
            break;
        case 2:
            enemy = new Enemy(wave, 1000, 5);
            break;
    }
}

function main () {
    let firstId = document.querySelector('[data-coordinate-x="0"][data-coordinate-y="0"]');
    firstId.style.backgroundImage()
    firstId.addEventListener("click", mobs);
    spawn(1);
}

main();