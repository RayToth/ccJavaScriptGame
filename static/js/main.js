let enemy;
spawn(1);

let firstId = document.getElementById("1");
firstId.addEventListener("click", mobs);


async function mobs() {
    for (let i = 1; i<6; i++) {
        steps();
        await sleep(1000);
    }
}
async function steps() {
    for (let i = 1; i < 25; ++i) {
        document.getElementById(i.toString()).style.backgroundColor = "black";
        await sleep(500);
        document.getElementById(i.toString()).style.backgroundColor = "";
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