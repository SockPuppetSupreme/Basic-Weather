// code taken from http://html5hub.com/build-a-javascript-particle-system/

// Drawing the canvas object
var particleCanvas = document.querySelector('canvas');
var particleCtx = particleCanvas.getContext('2d');
particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

// Animation loop
function loop() {
    clear();
    update();
    draw();
    queue();
}

function clear() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
}

//function queue() {
//    window.requestAnimationFrame(loop);
//}

function update() {
    addNewParticles();
    plotParticles(canvas.width, canvas.height);
}

function draw() {
    
}


// Vector object
function Vector(x,y) {
    this.x = x || 0;
    this.y = y || 0;
}

// Add one vector to another
Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
}

// Returns the length of a vector
Vector.prototype.getMagnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

// Gets the angle accounting for the quadrant you're currently in
Vector.prototype.getAngle = function() {
    return Math.atan2(this.y, this.x);
}

// Allows you to get a new vector from angle and magnitude
Vector.fromAngle = function(angle, magnitude) {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
}


// Particle object
function Particle(point, velocity, acceleration) {
    this.position = point || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.acceleration = acceleration || new Vector(0, 0);
}

//
Particle.prototype.move = function() {
    // Current velocity + current acceleration
    this.velocity.add(this.acceleration);
    
    // Current velocity + position
    this.position.add(this.velocity);
}


// Particle emitter
function Emitter(point, velocity, spread) {
    // Vector
    this.position = point;
    // Vector
    this.velocity = velocity;
    // Possible angles = velocity + or - spread
    this.spread = spread || Math.PI /32;
    // Coloring
    this.drawColor = "#999";
}

Emitter.prototype.emitParticle = function () {
//    Use an angle randomized over the spread
    var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
//    Emitter velocity magnitude
    var magnitude = this.velocity.getMagnitude();
//    New velocity based on calculated angle and magnitude
    var velocity = Vector.fromAngle(angle, magnitude);
//    Return new Particle object
    return new Particle(position, velocity);
}


// maximum particles allowed on-screen
var maxParticles = 200;
// Amount of particles emitted each frame
var emissionRate = 4;

function addNewParticles() {
    // if at maxParticles, stop emitting
    if (particles.length > maxParticles) return;
    
    // For each emitter...
    for (var i = 0; i < emitters.length; i++) {
        
        // For [emissionRate], emit a particle
        for (var j = 0; j < emissionRate; j++) {
            particles.push(emitters[i].emitParticle());
        }
        
    }
}

function plotParticles(boundsX, boundsY) {
    // Array to hold particles within set bounds
    var currentParticles = [];
    
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        var pos = particle.position;
        
        // If out of bounds, drop this particle and move on to the next
        if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;
        
        // Move particles
        particle.move();
        
        // Add this particle to the list of current particles
        currentParticles.push(particle);
    }
    
    // Update global particles, clearing room for old particles to be collected
    particles = currentParticles;
}

var particleSize = 1;

function drawParticles() {
    // Set the color of particles
    ctx.fillStyle = 'rgb(0,0,255)';
    
    // For each particle...
    for (var i = 0; i < particles.length; i++) {
        var position = particles[i].position;
        
        // Draw a square at position [particleSize] wide and tall
        // This is a square, but I should probably make it a circle or something even nicer
        ctx.fillRect(position.x, position.y, particleSize, particleSize);
    }
}



