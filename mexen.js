function launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 6,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ffd700', '#00cc00', '#0099ff', '#ff69b4'],
        });
        confetti({
            particleCount: 6,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ffd700', '#00cc00', '#0099ff', '#ff69b4'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

// Hoeken om elk vlak naar voren te draaien (rotateX, rotateY)
const faceAngles = {
    1: { x: 0,    y: 0   },
    2: { x: -90,  y: 0   },
    3: { x: 0,    y: -90 },
    4: { x: 0,    y: 90  },
    5: { x: 90,   y: 0   },
    6: { x: 0,    y: 180 },
};

// Bijhouden van cumulatieve rotatie per dobbelsteen (zodat elke gooi verder draait)
const diceState = {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
};

// Bereken het doelhoek dat minstens 2 volle slagen vooruit draait en exact op het juiste vlak eindigt
function computeTarget(current, value) {
    const faceX = faceAngles[value].x;
    const faceY = faceAngles[value].y;
    const minDelta = 720;

    const dX = ((faceX - current.x) % 360 + 360) % 360;
    const dY = ((faceY - current.y) % 360 + 360) % 360;

    const stepsX = Math.ceil((minDelta - dX) / 360);
    const stepsY = Math.ceil((minDelta - dY) / 360);

    return {
        x: current.x + dX + stepsX * 360,
        y: current.y + dY + stepsY * 360,
    };
}

function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

function animateDice(diceId, finalValue, scene, onComplete) {
    const cube = document.getElementById('diceInner' + diceId);
    const current = diceState[diceId];
    const target = computeTarget(current, finalValue);

    const duration = 950;
    const startTime = performance.now();
    const startX = current.x;
    const startY = current.y;

    scene.classList.add('rolling-scene');

    function step(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const p = easeOut(t);

        const x = startX + (target.x - startX) * p;
        const y = startY + (target.y - startY) * p;

        cube.style.transform = `translateZ(-75px) rotateX(${x}deg) rotateY(${y}deg)`;

        if (t < 1) {
            requestAnimationFrame(step);
        } else {
            diceState[diceId] = { x: target.x, y: target.y };
            scene.classList.remove('rolling-scene');
            onComplete();
        }
    }

    requestAnimationFrame(step);
}

// Huidige waarden van beide dobbelstenen bijhouden
const currentDice = { 1: null, 2: null };

function computeScore(d1, d2) {
    if (d1 === null || d2 === null) return null;
    if (d1 === d2) return d1 * 100;
    const high = Math.max(d1, d2);
    const low  = Math.min(d1, d2);
    return high * 10 + low;
}

function updateScoreDisplay() {
    const score = computeScore(currentDice[1], currentDice[2]);
    document.getElementById("scoreDisplay").textContent = score !== null ? score : "";
}

// Lock dobbelsteen 1
function locked1() {
    var lock = document.getElementById("lock1");
    if (lock.getAttribute("src") === './images/unlock.png') {
        lock.setAttribute("src", "./images/lock.png");
    } else {
        lock.setAttribute("src", "./images/unlock.png");
    }
}

// Lock dobbelsteen 2
function locked2() {
    var lock = document.getElementById("lock2");
    if (lock.getAttribute("src") === './images/unlock.png') {
        lock.setAttribute("src", "./images/lock.png");
    } else {
        lock.setAttribute("src", "./images/unlock.png");
    }
}

var count = 0;

// Slotje van een dobbelsteen vergrendelen én uitschakelen zodat hij niet meer los gooibaar is
function disableLock(dieId) {
    const lock = document.getElementById("lock" + dieId);
    lock.setAttribute("src", "./images/unlock.png");
    lock.parentElement.classList.add("lock-disabled");
}

function gooien() {
    var dobbel1 = Math.round(5 * Math.random()) + 1;
    var dobbel2 = Math.round(5 * Math.random()) + 1;
    const locked1 = document.getElementById("lock1").getAttribute("src") === './images/lock.png';
    const locked2 = document.getElementById("lock2").getAttribute("src") === './images/lock.png';

    // Welke dobbelsteen was vergrendeld (bij een gedeeltelijke gooi)
    const isPartialRoll = locked1 !== locked2;
    const lockedDie = locked1 ? 1 : 2;

    const button = document.getElementById("gooi");
    button.disabled = true;
    countPlus();

    if (!locked1) currentDice[1] = dobbel1;
    if (!locked2) currentDice[2] = dobbel2;

    const scene1 = document.getElementById("diceScene1");
    const scene2 = document.getElementById("diceScene2");

    let pending = 0;

    function onDone() {
        pending--;
        if (pending === 0) {
            button.disabled = false;
            updateScoreDisplay();

            // Na een volledige gooi (beide dobbelstenen) slotjes inschakelen
            if (!isPartialRoll) {
                document.getElementById("lock1").parentElement.classList.remove("lock-disabled");
                document.getElementById("lock2").parentElement.classList.remove("lock-disabled");
            }

            const score = computeScore(currentDice[1], currentDice[2]);

            if (score === 32) {
                button.style.visibility = "hidden";
            }

            if (score === 21) {
                launchConfetti();
            }

            // De dobbelsteen die vergrendeld was mag niet meer los gooien
            if (isPartialRoll) {
                disableLock(lockedDie);
            }
        }
    }

    if (!locked1) {
        pending++;
        animateDice(1, dobbel1, scene1, onDone);
    }

    if (!locked2) {
        pending++;
        animateDice(2, dobbel2, scene2, onDone);
    }

    if (pending === 0) {
        button.disabled = false;
        updateScoreDisplay();
    }

    function countPlus() {
        count++;
        document.getElementById("countDisplay").innerText = "Worpen: " + count;
        if (count === 3) {
            button.style.visibility = "hidden";
        }
    }
}

function reset() {
    count = 0;
    document.getElementById("countDisplay").innerText = "Worpen: " + count;

    const button = document.getElementById("gooi");
    button.style.visibility = "visible";

    diceState[1] = { x: 0, y: 0 };
    diceState[2] = { x: 0, y: 0 };
    currentDice[1] = null;
    currentDice[2] = null;
    updateScoreDisplay();

    document.getElementById("diceInner1").style.transform = 'translateZ(-75px) rotateX(0deg) rotateY(0deg)';
    document.getElementById("diceInner2").style.transform = 'translateZ(-75px) rotateX(0deg) rotateY(0deg)';

    document.getElementById("lock1").setAttribute("src", "./images/unlock.png");
    document.getElementById("lock2").setAttribute("src", "./images/unlock.png");
    document.getElementById("lock1").parentElement.classList.add("lock-disabled");
    document.getElementById("lock2").parentElement.classList.add("lock-disabled");
}
