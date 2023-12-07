// Lock dobbelsteen 1
function locked1() {
    var lock = document.getElementById("lock1");
    var currentSrc = lock.getAttribute("src");

    if (currentSrc === './unlock.png') {
        lock.setAttribute("src", "./lock.png");
    } else {
        lock.setAttribute("src", "./unlock.png");
    }
}

// Lock dobbelsteen 2
function locked2() {
    var lock = document.getElementById("lock2");
    var currentSrc = lock.getAttribute("src");

    if (currentSrc === './unlock.png') {
        lock.setAttribute("src", "./lock.png");
    } else {
        lock.setAttribute("src", "./unlock.png");
    }
}

var count = 0

// Het gooien van de dobbelstenen
function gooien() {
    var dobbel1 = Math.round(5 * Math.random()) + 1;
    var dobbel2 = Math.round(5 * Math.random()) + 1;
    const lockcheck1 = document.getElementById("lock1").getAttribute("src");
    const lockcheck2 = document.getElementById("lock2").getAttribute("src");
    countPlus()
    

    if (lockcheck1 === './lock.png') {
        
    } else {
        if (dobbel1 == 1) {
            getal1();
        } else if (dobbel1 == 2) {
            getal2();
        } else if (dobbel1 == 3) {
            getal3();
        } else if (dobbel1 == 4) {
            getal4();
        } else if (dobbel1 == 5) {
            getal5();
        } else {
            getal6();
        }
    }

    if (lockcheck2 === './lock.png') {

    } else {
        if (dobbel2 == 1) {
            nummer1();
        } else if (dobbel2 == 2) {
            nummer2();
        } else if (dobbel2 == 3) {
            nummer3();
        } else if (dobbel2 == 4) {
            nummer4();
        } else if (dobbel2 == 5) {
            nummer5();
        } else {
            nummer6();
        }
    }
    

    function countPlus() {
        count++;
        document.getElementById("countDisplay").innerText = "Worpen: " + count;

        // Check if count is 3, replace the button with a Reset button
        if (count === 3) {
            const button = document.getElementById("gooi");
            button.style.visibility = "hidden";
        }
    }
}

function reset() {
    count = 0;
    document.getElementById("countDisplay").innerText = "Worpen: " + count;
    
    const button = document.getElementById("gooi");
    button.style.visibility = "visible";

    const IMG = document.getElementById("IMG");
    IMG.setAttribute("src", "MEX.png")
    
    const Image = document.getElementById("Image");
    Image.setAttribute("src", "EN.png")

    const lockreset1 = document.getElementById("lock1");
    lockreset1.setAttribute("src", "./unlock.png")

    const lockreset2 = document.getElementById("lock2");
    lockreset2.setAttribute("src", "./unlock.png")
}

// dobbelsteen 1
function getal1() {
    var ogen1 = document.getElementById("IMG");
    ogen1.setAttribute("src", "1.jpg");
}

function getal2() {
    var ogen2 = document.getElementById("IMG");
    ogen2.setAttribute("src", "2.jpg");
}

function getal3() {
    var ogen3 = document.getElementById("IMG");
    ogen3.setAttribute("src", "3.jpg");
}

function getal4() {
    var ogen4 = document.getElementById("IMG");
    ogen4.setAttribute("src", "4.jpg");
}

function getal5() {
    var ogen5 = document.getElementById("IMG");
    ogen5.setAttribute("src", "5.jpg");
}

function getal6() {
    var ogen6 = document.getElementById("IMG");
    ogen6.setAttribute("src", "6.jpg");
}

// dobbelsteen 2
function nummer1() {
    var oog1 = document.getElementById("Image");
    oog1.setAttribute("src", "1.jpg");
}

function nummer2() {
    var oog2 = document.getElementById("Image");
    oog2.setAttribute("src", "2.jpg");
}

function nummer3() {
    var oog3 = document.getElementById("Image");
    oog3.setAttribute("src", "3.jpg");
}

function nummer4() {
    var oog4 = document.getElementById("Image");
    oog4.setAttribute("src", "4.jpg");
}

function nummer5() {
    var oog5 = document.getElementById("Image");
    oog5.setAttribute("src", "5.jpg");
}

function nummer6() {
    var oog6 = document.getElementById("Image");
    oog6.setAttribute("src", "6.jpg");
}