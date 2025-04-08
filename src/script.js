const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const draw = (x, y, c, s) => {
    ctx.fillStyle = c
    ctx.fillRect(x, y, s, s)
}

const particles = [];
const particle = (x, y, c, s) => {
    return {"x": x, "y": y, "vx": 0, "vy": 0, "color": c}
}

const random = () => {
    return Math.random() * 400 + 50
} 

const create = (number, color) => {
    const group = [];

    for(let i = 0; i < number; i++) {
        group.push(particle(random(), random(), color))
        particles.push(group[i])
    }
    return group;
}

const rule = (particles1, particles2, g) => {
    for(let i = 0; i < particles1.length; i++) {
        fx = 0;
        fy = 0;
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
        if(a.x <= 0 || a.x >= 500) { a.vx *= -1 }
        if(a.y <= 0 || a.y >= 500) { a.vy *= -1 }
    }
}

const yellow = create(200, "yellow");
const red = create(200, "red");
const green = create(200, "green");

const update = () => {
    rule(green, green, -0.32)
    rule(green, red, -0.17)
    rule(green, yellow, 0.34)
    rule(red, red, -0.10)
    rule(red, green, -0.34)
    rule(yellow, yellow, 0.15)
    rule(yellow, green, -0.20)
    ctx.clearRect(0, 0, 500, 500)
    draw(0, 0, "black", 500)
    for(i = 0; i < particles.length; i++) {
        draw(particles[i].x, particles[i].y, particles[i].color, 5)
    }
    requestAnimationFrame(update);
}; update()