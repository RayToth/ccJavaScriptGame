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
    document.querySelector("[data-coordinate-x='1'][data-coordinate-y='8']").setAttribute("id", "basic-tower-name");
    document.querySelector("[data-coordinate-x='2'][data-coordinate-y='8']").setAttribute("id", "basic-tower-cost");
    document.querySelector("#basic-tower-name").innerText = "Cost:";
    document.querySelector("#basic-tower-cost").innerText = "100";
}

function plusGold(quantity) {
    playerGold += quantity;``
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
    this.removeEventListener("click", waves);
    this.style.backgroundImage = "none";
    this.style.cursor = "default";
}

function playDmgSound() {
    const dmgSound = new Audio("static/sounds/dmg3.mp3");
    dmgSound.play();
}

function playDeathSound() {
    const deathSound = new Audio("static/sounds/death.mp3");
    deathSound.play();
}

function playCoinSound() {
    const coinSound = new Audio("static/sounds/coin.mp3");
    coinSound.play();
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
            playDeathSound();
            plusGold(enemy.bounty);
            break;
        } else if (playerHp < 1){
                    break;
        }else {
            let cell = document.querySelector('[data-coordinate-x="' + coordinate[X] + '"][data-coordinate-y="' + coordinate[Y] + '"]');
            if (wave === 5 || wave === 6) {
                mob.style.backgroundImage = "url('static/images/boss.png')";
                cell.appendChild(mob);
                await sleep(750);
                cell.removeChild(mob);
            } else {
                mob.style.backgroundImage = "url('static/images/mob.png')";
                cell.appendChild(mob);
                await sleep(750);
                cell.removeChild(mob);
            }
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
            enemy = new Enemy(wave, 1250, 10, 200, 30);
            break;
        case 3:
            enemy = new Enemy(wave, 1250, 25, 400, 35);
            break;
        case 4:
            enemy = new Enemy(wave, 1250, 15, 600, 40);
            break;
        case 5:
            enemy = new Enemy(wave, 1250, 10, 1200, 40);
            break;
        case 6:
            enemy = new Enemy(wave, 1250, 15, 1400, 40);
    }
}

function towerGrade(level) {
    switch (level) {
        case 1:
            tower = new Tower(level, 50, 1, 100);
            break;
        case 2:
            tower = new Tower(level, 100, 1, 110);
            break;
        case 3:
            tower = new Tower(level, 150, 1, 120);
            break;
        case 4:
            tower = new Tower(level, 200, 2, 130);
            break;
        case 5:
            tower = new Tower(level, 250, 2, 140);
    }
}


function makeTowerSpots() {
    let towerSpots = [
        [1, 1], [1, 3], [1, 4], [1, 6], [2, 1], [2, 6], [3, 1], [3, 5], [3, 6], [3, 3], [3, 4], [4, 1], [4, 3], [4, 4],
        [4, 5], [4, 6], [4, 7], [5, 1], [5, 7], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 7], [7, 5], [7, 7], [8, 3],
        [8, 4], [8, 5], [8, 7], [9, 7], [10, 3], [10, 5], [10, 6], [10, 7], [11, 3], [11, 5], [12, 3], [12, 5], [13, 3],
        [13, 5]
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


function waves(wave){
    let board = document.querySelector('#main-board');
    let text = document.createElement('div');
    text.setAttribute('class', 'wave');
    board.appendChild(text);
}


async function checkMobsUnderTw() {
    if (playerHp > 0){
        document.querySelector('.wave').innerText = 'WAVE ' + wave;
        await sleep(2000);
        spawn(wave);
        for (let i = 0; i < enemy.quantity; i++) {
        sessionStorage.removeItem(""+ i + "");
        sessionStorage.setItem(""+ i +"", ""+ enemy.health +"")
    }
    mobs();
    for (let i = 0; i < (enemy.quantity * 2 + 23) ; ++i) {
        await sleep(750);
        let activeTws = document.querySelectorAll("#fix-towers");
        let mobExists = document.querySelector(".mob");
        if (mobExists === null) {
            if (wave < 6 ){
                    ++wave;
                    await checkMobsUnderTw();
                } else {
                    win();
                }
            } else {
                for (let towers of activeTws) {
                    let x = parseInt(towers.parentElement.parentElement.dataset.coordinateX, 10);
                    let y = parseInt(towers.parentElement.parentElement.dataset.coordinateY, 10);
                    rangeCheck(x, y, towers);
                }
            }
        }
    } else {
        let mainBoard = document.getElementById("main-board");
        mainBoard.innerHTML = "Game Over";
        mainBoard.style.textAlign = "center";
        mainBoard.style.fontSize = "200px";
        mainBoard.style.paddingTop = "200px";
        mainBoard.style.fontFamily = "Cipote";
        mainBoard.style.color = "white";
        mainBoard.style.textShadow = "5px 10px black";
    }
}


function rangeCheck(towerX, towerY, towers) {
    let level = parseInt(sessionStorage.getItem(""+towers.className+""), 10);
    towerGrade(level);
    let rangeCoordinates1 = [[1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1]];
    let rangeCoordinates2 = [ ...rangeCoordinates1, [2, 1], [2, 0], [2, -1], [1, -2], [0, -2], [-1, -2],
                            [-2, -1], [-2, 0], [-2, 1], [-1, 2], [0, 2], [1, 2]];
    let mobIds = [];
    console.log(towers);
    let rangeToCheck;
    if (tower.range === 1) {
        rangeToCheck = rangeCoordinates1
    }else {
        rangeToCheck = rangeCoordinates2
    }
    for (let position of rangeToCheck) {
        let currentX = towerX + position[X];
        let currentY = towerY + position[Y];
        let cellTocheck = document.querySelector('[data-coordinate-x="' + currentX + '"][data-coordinate-y="' + currentY + '"]');
        if (cellTocheck.querySelector(".mob") !== null) {
            mobIds.push(parseInt(cellTocheck.querySelector(".mob").id, 10));

        }
    }
    if (mobIds.length > 0) {
        let targetTw = document.querySelector('[data-coordinate-x="' + towerX + '"][data-coordinate-y="' + towerY + '"]');
        let lowestMobId = Math.min.apply(Math, mobIds);
        // towerGrade(level);
        let mobDamage = tower.damage;
        sessionStorage.setItem(""+lowestMobId+"", ""+ (parseInt(sessionStorage.getItem("" + lowestMobId + ""), 10)-mobDamage) + "");
        playDmgSound();
        dmgEffect(lowestMobId);
        dmgEffectTw(targetTw);
    }
}

async function dmgEffect(id) {
    let target = document.getElementById(id.toString());
    if (wave === 5 || wave === 6) {
        target.style.backgroundImage = "url('static/images/boss_dmg.png')";
        await sleep(500);
        target.style.backgroundImage = "url('static/images/boss.png')";
    } else {
        target.style.backgroundImage = "url('static/images/mob_dmg.png')";
        await sleep(500);
        target.style.backgroundImage = "url('static/images/mob.png')";
    }
}

async function dmgEffectTw(tower) {
    console.log(tower.firstChild.firstChild.dataset.level);
    let twFx;
    switch (tower.firstChild.firstChild.dataset.level) {
        case "1":
            twFx = "url('static/images/custom_tw_dmg.png')";
            break;
        case "2":
            twFx = "url('static/images/custom_tw_dmg2.png')";
            break;
        case "3":
            twFx = "url('static/images/custom_tw_dmg3.png')";
            break;
        case "4":
            twFx = "url('static/images/custom_tw_dmg4.png')";
            break;
        case "5":
            twFx = "url('static/images/custom_tw_dmg5.png')";
            break;
    }
    tower.firstChild.firstChild.style.backgroundImage = twFx;
    await sleep(500);
    tower.firstChild.firstChild.style.backgroundImage = "url('static/images/custom_tw.png')";
}

function setTowerBaseLevel() {
    sessionStorage.clear();
    for (let i = 0; i < 5; i++) {
        sessionStorage.setItem("shop-tower"+ i + "", "1");
    }
}


function win(){
    let mainBoard = document.getElementById("main-board");
        mainBoard.innerHTML = "YOU WON!";
        mainBoard.style.textAlign = "center";
        mainBoard.style.fontSize = "200px";
        mainBoard.style.paddingTop = "200px";
        mainBoard.style.fontFamily = "Cipote";
        mainBoard.style.color = "white";
        mainBoard.style.textShadow = "5px 10px black";
}


function main () {
    let firstId = document.querySelector('[data-coordinate-x="0"][data-coordinate-y="5"]');
    firstId.setAttribute("class", "start-btn");
    firstId.addEventListener("click", waves);
    firstId.addEventListener("click", checkMobsUnderTw);
    firstId.addEventListener("click", playSoundNremoveListeners);
    setTowerBaseLevel();
    makeTowerSpots();
    makeShopSpots();
    setStartGoldNlifePos();
}

main();
