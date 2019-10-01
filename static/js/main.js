const mobRoute = [[0, 5], [1, 5], [2, 5], [2, 4], [2, 3], [2, 2], [3, 2], [4, 2], [5, 2], [5, 3], [5, 4], [5, 5],
[5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [9, 5], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4]];
const X = 0;
const Y = 1;
let enemy;


async function mobs() {
    for (let i = 0; i<enemy.quantity; i++) {
        steps(i);
        await sleep(enemy.spawnTime);
    }
}

async function steps(i) {
    let mob = document.createElement("div");
    mob.setAttribute("class", "mob");
    mob.setAttribute("id", "mob"+ i);
    for (let coordinate of mobRoute) {
        let cell = document.querySelector('[data-coordinate-x="'+ coordinate[X] +'"][data-coordinate-y="' + coordinate[Y] +'"]');
        cell.appendChild(mob);
        await sleep(750);
        cell.removeChild(mob);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function spawn(wave){

    switch (wave) {
        case 1:
            enemy = new Enemy(wave, 1250, 5, 100, 10);
            break;
        case 2:
            enemy = new Enemy(wave, 1250, 10, 150, 20);
            break;
        case 3:
            enemy = new Enemy(wave, 1250, 15, 200, 30);
            break;
        case 4:
            enemy = new Enemy(wave, 1250, 20, 250, 40);
            break;
        case 5:
            enemy = new Enemy(wave, 1250, 25, 300, 50);
            break;
    }
}

function tower(level) {
    switch (level) {
        case 1:
            tower = new Tower(level, 50, 100);
            break;
        case 2:
            tower = new Tower(level, 100, 110);
            break;
        case 3:
            tower = new Tower(level, 150, 120);
            break;
        case 4:
            tower = new Tower(level, 200, 130);
            break;
        case 5:
            tower = new Tower(level, 250, 140);
    }
}

function makeTowerSpots() {
    let towerSpots = [
        [2, 6], [3, 3], [4, 3], [3, 4], [4, 4]
        ];
    for (let list of towerSpots) {
        let spot = document.querySelector('[data-coordinate-x="' + list[0] + '"][data-coordinate-y="' + list[1] + '"]');
        spot.innerHTML = "<div class='tower-spot'></div>";
    }
}

function makeShopSpots() {
    let shopSpots = [
        [3, 8], [4, 8], [5, 8], [6, 8], [7, 8]
    ];
    let towerNum = 0;
    for (let list of shopSpots) {
        let spot = document.querySelector('[data-coordinate-x="' + list[0] + '"][data-coordinate-y="' + list[1] + '"]');
        spot.innerHTML = "<div class='shop-tower"+ towerNum +"' draggable='true'></div>";
        ++towerNum;
    }
}

function main () {
    let firstId = document.querySelector('[data-coordinate-x="0"][data-coordinate-y="0"]');
    firstId.addEventListener("click", mobs);
    makeTowerSpots();
    makeShopSpots();
    spawn(2);
    tower()
}

main();
