const startButton = document.getElementById('startButton');
const overlay = document.getElementById('overlay');
const canvas = document.getElementById('canvas');
const controls = document.getElementById('controls');
const resetButton = document.getElementById('resetButton');

startButton.addEventListener('click', () => {
  overlay.style.display = 'none';         
  canvas.style.filter = 'none';           
  controls.style.display = 'block';

  iniciar(); 
});

resetButton.addEventListener('click', () => {

  alert('Amanhã eu faço essa funcionalidade! :)');
});

function iniciar() {
    const ctx = canvas.getContext('2d');
    const greenNumber = document.getElementById("greenNumber")
    const redNumber = document.getElementById("redNumber")
    const whiteNumber = document.getElementById("whiteNumber")
    const blueNumber = document.getElementById("blueNumber")

    const greenGreen = document.getElementById("greenGreen")
    const greenRed = document.getElementById("greenRed")
    const greenWhite = document.getElementById("greenWhite")
    const greenBlue = document.getElementById("greenBlue")

    const redRed = document.getElementById("redRed")
    const redGreen = document.getElementById("redGreen")
    const redWhite = document.getElementById("redWhite")
    const redBlue = document.getElementById("redBlue")

    const whiteWhite = document.getElementById("whiteWhite")
    const whiteRed = document.getElementById("whiteRed")
    const whiteGreen = document.getElementById("whiteGreen")
    const whiteBlue = document.getElementById("whiteBlue")

    const blueBlue = document.getElementById("blueBlue")
    const blueWhite = document.getElementById("blueWhite")
    const blueRed = document.getElementById("blueRed")
    const blueGreen = document.getElementById("blueGreen")

    let green = [];
    let greenG = [];
    let greenR = [];
    let greenW = [];
    let greenB = [];

    let red = [];
    let redR = [];
    let redG = [];
    let redW = [];
    let redB = [];

    let white = [];
    let whiteW = [];
    let whiteR = [];
    let whiteG = [];
    let whiteB = [];

    let blue = [];
    let blueB = [];
    let blueW = [];
    let blueR = [];
    let blueG = [];



    greenNumber.addEventListener('input', () => {
        green = create(Number(greenNumber.value), "green");
    })
    greenGreen.addEventListener('input', () => {
        greenG = greenGreen.value / 10
    })
    greenRed.addEventListener('input', () => {
        greenR = greenRed.value / 10
    })
    greenWhite.addEventListener('input', () => {
        greenW = greenW.value / 10
    })
    greenBlue.addEventListener('input', () => {
        greenB = greenB.value / 10
    })

    redNumber.addEventListener('input', () => {
        red = create(Number(redNumber.value), "red");
    })
    redRed.addEventListener('input', () => {
        redR = redRed.value / 10
    })
    redGreen.addEventListener('input', () => {
        redG = redGreen.value / 10
    })
    redWhite.addEventListener('input', () => {
        redW = greenWhite.value / 10
    })
    redBlue.addEventListener('input', () => {
        redB = greenBlue.value / 10

    })

    whiteNumber.addEventListener('input', () => {
        white = create(Number(whiteNumber.value), "white");
    })
    whiteWhite.addEventListener('input', () => {
        whiteW = whiteWhite.value / 10
    })
    whiteRed.addEventListener('input', () => {
        whiteR = whiteRed.value / 10
    })
    whiteGreen.addEventListener('input', () => {
        whiteG = whiteGreen.value / 10
    })
    whiteBlue.addEventListener('input', () => {
        whiteB = whiteBlue.value / 10
    })

    blueNumber.addEventListener('input', () => {
        blue = create(Number(blueNumber.value), "blue");
    })
    blueBlue.addEventListener('input', () => {
        blueB = blueBlue.value / 10 

    })
    blueWhite.addEventListener('input', () => {
        blueW = blueWhite.value / 10
    })
    blueRed.addEventListener('input', () => {
        blueR = blueRed.value / 10
    
    })
    blueGreen.addEventListener('input', () => {
        blueG = blueGreen.value / 10
    })


const draw = (x, y, c, s) => {
    ctx.fillStyle = c
    ctx.fillRect(x, y, s, s)
}

const particles = [];
const particle = (x, y, c, s) => {
    return {"x": x, "y": y, "vx": 0, "vy": 0, "color": c}
}

const random = () => {
    return Math.random() * 500 +50
} 

const create = (number, color) => {
    const group = [];

    for(let i = particles.length - 1; i >= 0; i--) {
        if(particles[i].color === color) {
            particles.splice(i, 1);
        }
    }
    for(let i = 0; i < number; i++) {
        const p = particle(random(), random(), color);
        group.push(p);
        particles.push(p);
    }
    
    return group;
}

const rule = (particles1, particles2, g) => {
    for(let i = 0; i < particles1.length; i++) {
        let fx = 0;
        let fy = 0;
            for(let j = 0; j < particles2.length; j++) {
            a = particles1[i];
            b = particles2[j];
            dx = a.x - b.x;
            dy = a.y - b.y;
            h = Math.sqrt(dx*dx + dy*dy);
            if(h > 0 && h < 80) {
                F = g * 1/h;
                fx += (F *dx);
                fy += (F *dy);
            }
        }
        a.vx = (a.vx + fx)*0.5
        a.vy = (a.vy + fy)*0.5
        a.x += a.vx
        a.y += a.vy
        if(a.x <= 0 || a.x >= 600) { a.vx *= -2 }
        if(a.y <= 0 || a.y >= 600) { a.vy *= -2 }
    }
}

const update = () => {
    rule(green, green, greenG)
    rule(green, red, greenR)
    rule(green, white, greenW)
    rule(green, blue, greenB)

    rule(red, red, redR)
    rule(red, green, redG)
    rule(red, white, redW)
    rule(red, blue, redB)

    rule(white, white, whiteW)
    rule(white, red, whiteR)
    rule(white, green, whiteG)
    rule(white, blue, whiteB)

    rule(blue, blue, blueB)
    rule(blue, white, blueW)
    rule(blue, red, blueR)
    rule(blue, green, blueG)
    ctx.clearRect(0, 0, 600, 600)
    draw(0, 0, "black", 600)
    for(i = 0; i < particles.length; i++) {
        draw(particles[i].x, particles[i].y, particles[i].color, 5)
    }
    requestAnimationFrame(update);
}; update()
}


