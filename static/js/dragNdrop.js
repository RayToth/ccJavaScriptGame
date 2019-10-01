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
    if (this.id !== "busy" && draggableObject.id !== "fix-towers") {
        this.appendChild(draggableObject);
        this.firstChild.setAttribute("id", "fix-towers");
    } else {
        this.className = "tower-spot";
    }

}