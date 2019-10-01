document.querySelector('[data-coordinate-x="3"][data-coordinate-y="8"]').innerHTML = "<div class='shop-tower'></div>";

let draggableObject;
let clickTarget;
let firstTower = document.querySelector(".shop-tower");
const towerSpots = document.querySelectorAll(".tower-spot");

firstTower.addEventListener('dragstart', dragStart);
firstTower.addEventListener('dragend', dragEnd);
firstTower.parentElement.id = "busy";

for (const spot of towerSpots) {
    spot.addEventListener('dragover', dragOver);
    spot.addEventListener('dragenter', dragEnter);
    spot.addEventListener('dragleave', dragLeave);
    spot.addEventListener('drop', dragDrop);
}

function dragStart() {
    clickTarget = this.className;
    draggableObject = document.querySelector("." + clickTarget);
    this.className += " hold";
    this.parentElement.style.backgroundColor = "black";
    this.parentElement.style.opacity = "0.3";
}

function dragEnd() {
    this.className = clickTarget;
    this.parentElement = "busy";
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
    if (this.id !== "busy") {
        this.appendChild(draggableObject);
        this.style.opacity = "1";
        this.style.backgroundColor = "transparent";

    }
    this.className = "tower-spot";
}