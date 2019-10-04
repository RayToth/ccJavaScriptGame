let draggableObject;
let clickTarget;
const towerSpots = document.querySelectorAll(".tower-spot");

for (let i = 0; i < 5; ++i) {
    let tower = document.querySelector(".shop-tower" + i);
    tower.addEventListener('dragstart', dragStart);
    tower.addEventListener('dragend', dragEnd);
    tower.parentElement.id = "busy";
}

for (let spot of towerSpots) {
    spot.addEventListener('dragover', dragOver);
    spot.addEventListener('dragenter', dragEnter);
    spot.addEventListener('dragleave', dragLeave);
    spot.addEventListener('drop', dragDrop);
}

function dragStart() {
    clickTarget = this.className;
    draggableObject = document.querySelector("." + clickTarget);
    this.className += " hold";
    let twSpots = document.querySelectorAll(".tower-spot");
    for (let spot of twSpots) {
        spot.style.backgroundColor = "#8dae6e";
    }
}

function dragEnd() {
    this.className = clickTarget;
    this.parentElement.id = "busy";
    this.parentElement.style.opacity = "1";
    this.parentElement.style.backgroundColor = "transparent";
    let checkedTws = document.querySelectorAll('[data-check="check"]');
    let twSpots = document.querySelectorAll(".tower-spot");
    for (let spot of twSpots) {
        spot.style.backgroundColor = "transparent";
    }
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    this.className += " hovered"
}

function dragLeave() {
    this.className = "tower-spot";
}

function dragDrop() {
    if (this.id !== "busy" && draggableObject.id !== "fix-towers" && playerGold >= 100) {
        this.appendChild(draggableObject);
        this.firstChild.setAttribute("id", "fix-towers");
        this.firstChild.setAttribute("data-level", "1");
        playCoinSound();
        minusGold(100);
        this.firstChild.addEventListener("dblclick", towerUpgradeModal);
        this.className = "tower-spot";
    } else {
        this.className = "tower-spot";
    }
}


function towerUpgradeModal(spot) {
    let currentTower = spot.path[0].className;
    let level = parseInt(sessionStorage.getItem(""+currentTower+""), 10);
    if (level <  5) {
        towerGrade(level);
        let towerLevel = tower.level;
        let damage = tower.damage;
        let range = tower.range;
        towerGrade(level + 1);
        let nextLevel = tower.level;
        let nextDamage = tower.damage;
        let nextRange = tower.range;
        let upgradeCost = tower.cost;
        let modalToFill = document.querySelector("#exampleModal");
        modalToFill.querySelector("#tower-level").innerHTML = `Tower level = ${towerLevel}`;
        modalToFill.querySelector("#tower-damage").innerHTML = `Damage =      ${damage}`;
        modalToFill.querySelector("#tower-range").innerHTML = `Range =       ${range}`;
        modalToFill.querySelector("#uTower-level").innerHTML = `Next level =  ${nextLevel}`;
        modalToFill.querySelector("#uTower-damage").innerHTML = `New damage =  ${nextDamage}`;
        modalToFill.querySelector("#uTower-range").innerHTML = `New range =   ${nextRange}`;
        modalToFill.querySelector("#upgrade-cost").innerHTML = `Upgrade cost =${upgradeCost}`;
        $(modalToFill).modal("show");

        document.getElementById("upgrade-button").addEventListener("click", setMoney);

        function setMoney() {
            if (playerGold >= upgradeCost) {
                sessionStorage.setItem("" + currentTower + "", "" + nextLevel + "");
                document.querySelector("."+currentTower+"").setAttribute("data-level", ""+nextLevel+"");
                playCoinSound();
                minusGold(upgradeCost);
                document.getElementById("upgrade-button").removeEventListener("click", setMoney)
            } else {
                alert("Not enough money!");
            }
        }
    } else {
        alert("Tower level maxed!")
    }
}