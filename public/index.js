const ROOT = document.querySelector("div#battlefield");
const FULL_BUBBLES = [];

// let sc = localStorage.getItem("score");
// sc = sc ? +sc : 0;
let sc = 0;

let twokeysObj = {
    wd: [false, false],
    ds: [false, false],
    sa: [false, false],
    aw: [false, false]
};

setInterval(() => {
    let time = document.querySelector(".time");
    let score = document.querySelector(".score");
    var t = new Date().toLocaleTimeString();
    time.innerHTML = `Time: ${t}`;
    score.innerHTML = `Score: ${sc}`;
}, 50);

setTimeout(() => {
    let el = document.createElement("div");
    let el2 = document.createElement("div");
    let el3 = document.createElement("div");

    el.classList.add("tank");
    ROOT.appendChild(el);

    el2.classList.add("circle");
    el.appendChild(el2);

    el3.classList.add("indicator");
    el2.appendChild(el3);
}, 0);

function ff() {
    return Math.round(Math.random() * 16).toString(16);
}

function bubble(container, array, id) {
    let el = document.createElement("div");
    el.className = "bubble";
    el.setAttribute("data-id", id);

    el.style.top = `${Math.random() * 560}px`;
    el.style.left = `${Math.random() * 700}px`;
    el.style.backgroundColor = `#${ff()}${ff()}${ff()}`;
    container.appendChild(el);
    array.push(el);
}

for (let i = 0; i < 5; i++) {
    bubble(ROOT, FULL_BUBBLES, i);
}

function move({ keyCode, type }) {
    let tank = ROOT.querySelector(".tank");
    let cs = getComputedStyle(tank);
    let csBattlefield = getComputedStyle(tank.parentElement);
    let _csBfHeight = parseInt(csBattlefield.height) - parseInt(cs.height);
    let _csBfWidth = parseInt(csBattlefield.width) - parseInt(cs.width);

    let _csTop = parseInt(cs.top);
    let _csLeft = parseInt(cs.left);
    let tankLeft = tank.offsetLeft;
    let tankTop = tank.offsetTop;

    switch (type) {
        case "keydown":
            switch (keyCode) {
                case 87:
                case 38:
                    twokeysObj.wd[0] = true;
                    twokeysObj.aw[1] = true;
                    break;
                case 68:
                case 39:
                    twokeysObj.wd[1] = true;
                    twokeysObj.ds[0] = true;
                    break;
                case 83:
                case 40:
                    twokeysObj.sa[0] = true;
                    twokeysObj.ds[1] = true;
                    break;
                case 65:
                case 37:
                    twokeysObj.sa[1] = true;
                    twokeysObj.aw[0] = true;
                    break;
            }
            break;
        case "keyup":
            switch (keyCode) {
                case 87:
                case 38:
                    twokeysObj.wd[0] = false;
                    twokeysObj.aw[1] = false;
                    break;
                case 68:
                case 39:
                    twokeysObj.wd[1] = false;
                    twokeysObj.ds[0] = false;
                    break;
                case 83:
                case 40:
                    twokeysObj.sa[0] = false;
                    twokeysObj.ds[1] = false;
                    break;
                case 65:
                case 37:
                    twokeysObj.sa[1] = false;
                    twokeysObj.aw[0] = false;
                    break;
            }
            break;
    }

    if (twokeysObj.wd[0]) {
        if (tankTop > 0) {
            _csTop -= 1;
            tank.style.top = `${_csTop}px`;
        }
    }

    if (twokeysObj.wd[1]) {
        if (tankLeft < _csBfWidth) {
            _csLeft += 1;
            tank.style.left = `${_csLeft}px`;
        }
    }

    if (twokeysObj.sa[1]) {
        if (tankLeft < _csBfWidth) {
            _csLeft -= 1;
            tank.style.left = `${_csLeft}px`;
        }
    }

    if (twokeysObj.sa[0]) {
        if (tankTop < _csBfHeight) {
            _csTop += 1;
            tank.style.top = `${_csTop}px`;
        }
    }
}
function killEnemy({ target }) {
    if (target.getAttribute("data-id")) {
        let id = target.getAttribute("data-id");
        delete FULL_BUBBLES[id];
        sc += 100;
        ROOT.removeChild(target);
    } else console.log("notOK");

    if (
        FULL_BUBBLES.every(e => {
            return e == "empty";
        })
    ) {
        setTimeout(() => {
            alert("WIN");
            location.reload();
        }, 100);
    }
}

ROOT.addEventListener("mousemove", e => {
    document.body.classList = "custom";
    if (document.querySelector(".circle")) {
        let div = document.querySelector(".circle");
        let bb = div.getBoundingClientRect();
        let cx = bb.left + bb.width / 2,
            cy = bb.top + bb.height / 2;
        let angle = Math.atan2(e.y - cy, e.x - cx);
        div.style.transform = `rotate(${angle + 1.5}rad)`;
    }
});

ROOT.addEventListener("mouseleave", () => {
    document.body.style.cursor = "";
});

ROOT.addEventListener("click", killEnemy);
addEventListener("keydown", move);
addEventListener("keyup", move);