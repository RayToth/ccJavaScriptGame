let firstId = document.getElementById("1");
firstId.addEventListener("click", steps);

async function steps() {
    for (let i = 1; i < 25; ++i) {
        document.getElementById(i.toString()).style.backgroundColor = "black";
        await sleep(200);
        document.getElementById(i.toString()).style.backgroundColor = "";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}