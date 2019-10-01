const mobRoute = [[0, 5], [1, 5], [2, 5], [2, 4], [2, 3], [2, 2], [3, 2], [4, 2], [5, 2], [5, 3], [5, 4], [5, 5],
[5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [9, 5], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4]];
const X = 0;
const Y = 1;
let enemy;
const towerLevels = ["",
    {"damage": 50, "range": 1, "cost": 100},
    {"damage": 80, "range": 1, "upgradeCost": 80},
    {"damage": 110, "range": 1, "upgradeCost": 120},
    {"damage": 150, "range": 2, "upgradeCost": 200},
    {"damage":"", "range": "", "upgradeCost": ""},];

async function mobs() {
    for (let i = 0; i<enemy.quantity; i++) {
        steps();
        await sleep(enemy.spawnTime);
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
            enemy = new Enemy(wave, 1000, 10);
            break;
    }
}


function towerUpgradeModal() {
    let towerLevel = 1;
    let damage = 50;
    let range = 1;
    let upgradeCost = 80;

    const towerModal = insertModal(towerLevel, damage, range, upgradeCost);
    this.appendChild(towerModal);
    let udam = this.querySelector("#uTower-damage");
    udam.textContent = `Damage = ${damage}`;

}


const insertModal = function(towerLevel, damage, range, upgradeCost) {
    const template = document.querySelector("#upgradeTemplate");
    const clone = document.importNode(template.content, true);

    // clone.querySelector("#tower-level").textContent = `Tower level ${towerLevel}`;
    // clone.querySelector("#tower-damage").textContent = `Damage = ${damage}`;
    // clone.querySelector("#tower-range").textContent = `Range : ${range}`;
    // clone.querySelector("#upgrade-cost").textContent = `Upgrade Cost : ${upgradeCost}`;

    return clone;
};


async function fixTowerUpgradeEvent () {
    await sleep(200);
    let fixTowers = document.querySelector(".shop-tower");
    fixTowers.addEventListener("dblclick", towerUpgradeModal);
}


function makeTowerSpots() {
    let towerSpots = [
        [2, 6], [3, 3], [4, 3], [3, 4], [4, 4]
        ];
    for (let list of towerSpots) {
        let spot =document.querySelector('[data-coordinate-x="' + list[0] + '"][data-coordinate-y="' + list[1] + '"]');
        spot.innerHTML = "<div class='tower-spot'></div>";
    }
}

function main () {
    let firstId = document.querySelector('[data-coordinate-x="0"][data-coordinate-y="0"]');
    firstId.addEventListener("click", mobs);
    makeTowerSpots();
    spawn(2);
    fixTowerUpgradeEvent()
}

main();
