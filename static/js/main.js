const mobRoute = [[0, 5], [1, 5], [2, 5], [2, 4], [2, 3], [2, 2], [3, 2], [4, 2], [5, 2], [5, 3], [5, 4], [5, 5],
[5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [9, 5], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4]];
const X = 0;
const Y = 1;
let enemy;
let playerHp = 3;
let tower;
let playerGold = 150;
let wave = 1;

function setStartGoldNlifePos() {
    document.querySelector("[data-coordinate-x='13'][data-coordinate-y='0']").setAttribute("id", "gold-pic");
    document.querySelector("[data-coordinate-x='14'][data-coordinate-y='0']").setAttribute("id", "gold-value");
    document.querySelector("#gold-value").innerText = playerGold;
    document.querySelector("[data-coordinate-x='13'][data-coordinate-y='1']").setAttribute("id", "life-pic");
    document.querySelector("[data-coordinate-x='14'][data-coordinate-y='1']").setAttribute("id", "life-value");
    document.querySelector("#life-value").innerText = playerHp;
}

function plusGold(quantity) {
    playerGold += quantity;
    document.querySelector("#gold-value").innerText = playerGold;
}

function minusGold(quantity) {
    playerGold -= quantity;
    document.querySelector("#gold-value").innerText = playerGold;
}

function playSoundNremoveListeners() {
    const sound = new Audio("static/sounds/ding.mp3");
    sound.play();
    this.removeEventListener("click", playSoundNremoveListeners);
    this.removeEventListener("click", checkMobsUnderTw);
}

async function mobs() {
    for (let i = 0; i<enemy.quantity; i++) {
        steps(i);
        await sleep(enemy.spawnTime);
    }
}

async function steps(i) {
    let mob = document.createElement("div");
    mob.setAttribute("class", "mob");
    mob.setAttribute("id", i);
    for (let coordinate of mobRoute) {
        mob.setAttribute("data-hp", "" +sessionStorage.getItem(""+ i +"")+ "");
        let mobHp = parseInt(mob.dataset.hp, 10);
        if(mobHp <= 0) {
            plusGold(enemy.bounty);
            break;
        }else {
            let cell = document.querySelector('[data-coordinate-x="' + coordinate[X] + '"][data-coordinate-y="' + coordinate[Y] + '"]');
            cell.appendChild(mob);
            await sleep(750);
            cell.removeChild(mob);
            if  (coordinate[0] === 14) {
                --playerHp;
                document.querySelector("#life-value").innerText = playerHp;
            }
        }

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

function towerGrade(level) {
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
        [1, 1], [1, 3], [1, 4], [1, 6], [2, 1], [2, 6], [3, 1], [3, 5], [3, 6], [3, 3], [3, 4], [4, 1], [4, 3], [4, 4],
        [4, 5], [4, 6], [4, 7], [5, 1], [5, 7], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 7], [7, 5], [7, 7], [8, 3],
        [8, 4], [8, 5], [8, 7], [9, 7], [10, 3], [10, 5], [10, 6], [10, 7], [11, 3], [11, 5], [12, 3], [12, 5], [13, 3],
        [13, 5], [14, 3], [14, 5]
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
        spot.setAttribute("data-check", "check");
        ++towerNum;
    }
}

async function checkMobsUnderTw() {
    spawn(wave);
    sessionStorage.clear();
    for (let i = 0; i < enemy.quantity; i++) {
        sessionStorage.setItem(""+ i +"", ""+ enemy.health +"")
    }
    mobs();
    for (let i = 0; i < (enemy.quantity * 2 + 23) ; ++i) {
        await sleep(750);
        let activeTws = document.querySelectorAll("#fix-towers");
        let mobExists = document.querySelector(".mob");
        if (mobExists === null) {
            if (wave <= 5) {
                ++wave;
                await sleep(2000);
                await checkMobsUnderTw();
            } else {
                break;
            }
        } else {
            for (let tower of activeTws) {
                let x = parseInt(tower.parentElement.parentElement.dataset.coordinateX, 10);
                let y = parseInt(tower.parentElement.parentElement.dataset.coordinateY, 10);
                rangeCheck(x, y);
            }
        }
    }
}


function rangeCheck(towerX, towerY) {
    let rangeCoordinates = [[1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1]];
    let mobIds = [];
    for (let position of rangeCoordinates) {
        let currentX = towerX + position[X];
        let currentY = towerY + position[Y];
        let cellTocheck = document.querySelector('[data-coordinate-x="' + currentX + '"][data-coordinate-y="' + currentY + '"]');
        if (cellTocheck.querySelector(".mob") !== null) {
            mobIds.push(parseInt(cellTocheck.querySelector(".mob").id, 10));

        }
    }
    if (mobIds.length > 0) {
        let lowestMobId = Math.min.apply(Math, mobIds);
        sessionStorage.setItem(""+lowestMobId+"", ""+ (parseInt(sessionStorage.getItem("" + lowestMobId + ""), 10)-50) + "");

    }
}

function main () {
    let firstId = document.querySelector('[data-coordinate-x="0"][data-coordinate-y="0"]');
    firstId.addEventListener("click", checkMobsUnderTw);
    firstId.addEventListener("click", playSoundNremoveListeners);
    makeTowerSpots();
    makeShopSpots();
    setStartGoldNlifePos();
}

main();
