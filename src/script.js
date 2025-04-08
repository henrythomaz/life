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

const yellow = create(20, "yellow");

const update = () => {
    ctx.clearRect(0, 0, 500, 500)
    draw(0, 0, "black", 500)
    for(i = 0; i < particles.length; i++) {
        draw(particles[i].x, particles[i].y, particles[i].color, 5)
    }
    requestAnimationFrame(update);
}; update()