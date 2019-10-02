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
    setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd() {
    this.className = clickTarget;
    this.parentElement.id = "busy";
    this.parentElement.style.opacity = "1";
    this.parentElement.style.backgroundColor = "transparent";
    let checkedTws = document.querySelectorAll('[data-check="check"]');
    let observer = false;
    for (let i = 0; i < checkedTws.length; ++i) {
        if (checkedTws[i].firstChild !== null) {
            observer = true;
        }
    }
    if (observer === false) {
        for (let i = 0; i < towerSpots.length; ++i) {
            towerSpots[i].style.opacity = "1";
            towerSpots[i].style.backgroundColor = "transparent";
        }
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
        minusGold(100);
        this.firstChild.dataset.level = "1";
        this.firstChild.addEventListener("dblclick", towerUpgradeModal);
    } else {
        this.className = "tower-spot";
    }
}


function towerUpgradeModal() {
    const towerLevels = [{},
    {"damage": 50, "range": 1, "cost": 100},
    {"damage": 80, "range": 1, "upgradeCost": 80},
    {"damage": 110, "range": 1, "upgradeCost": 120},
    {"damage": 150, "range": 2, "upgradeCost": 160},
    {"damage": 200, "range": 2, "upgradeCost": 200},];
    let towerLevel = 1;
    let damage = 50;
    let range = 1;
    let nextLevel = 2;
    let nextDamage = 80;
    let nextRange = 1;
    let upgradeCost = 80;
    let modalToFill = document.querySelector("#exampleModal");
    console.log(modalToFill);
    modalToFill.querySelector("#tower-level").innerHTML =  `Tower level = ${towerLevel}`;
    modalToFill.querySelector("#tower-damage").innerHTML = `Damage =      ${damage}`;
    modalToFill.querySelector("#tower-range").innerHTML =   `Range =       ${range}`;
    modalToFill.querySelector("#uTower-level").innerHTML =  `Next level =  ${nextLevel}`;
    modalToFill.querySelector("#uTower-damage").innerHTML = `New damage =  ${nextDamage}`;
    modalToFill.querySelector("#uTower-range").innerHTML =  `New range =   ${nextRange}`;
    modalToFill.querySelector("#upgrade-cost").innerHTML =  `Upgrade cost =${upgradeCost}`;
    $(modalToFill).modal("show");

}