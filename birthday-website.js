// Global variables
let currentSection = 0;
const sections = document.querySelectorAll('.section');

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing birthday website...');
    
    // Initialize with a small delay to ensure DOM is ready
    setTimeout(() => {
        initFireworks();
        console.log('Fireworks initialized');
        
        initNavigation();
        console.log('Navigation initialized');
        
        // Initialize other sections when they come into view
        initScrollTriggers();
    }, 100);
});

// Initialize scroll triggers for animations
function initScrollTriggers() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                switch(sectionId) {
                    case 'birthday-cake':
                        if (!entry.target.dataset.initialized) {
                            initCake();
                            entry.target.dataset.initialized = 'true';
                            console.log('Cake initialized on scroll');
                        }
                        break;
                    case 'air-message':
                        if (!entry.target.dataset.initialized) {
                            initAirMessage();
                            entry.target.dataset.initialized = 'true';
                            console.log('Air message initialized on scroll');
                        }
                        break;
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('#birthday-cake, #air-message');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Section 1: Happy Birthday Fireworks Animation
function initFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    
    let w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight),
        hw = w / 2,
        hh = h / 2;
    
    const opts = {
        strings: ["HAPPY", "BIRTHDAY!", "to You"],
        charSize: 30,
        charSpacing: 35,
        lineHeight: 40,
        cx: w / 2,
        cy: h / 2,
        fireworkPrevPoints: 10,
        fireworkBaseLineWidth: 5,
        fireworkAddedLineWidth: 8,
        fireworkSpawnTime: 200,
        fireworkBaseReachTime: 30,
        fireworkAddedReachTime: 30,
        fireworkCircleBaseSize: 20,
        fireworkCircleAddedSize: 10,
        fireworkCircleBaseTime: 30,
        fireworkCircleAddedTime: 30,
        fireworkCircleFadeBaseTime: 10,
        fireworkCircleFadeAddedTime: 5,
        fireworkBaseShards: 5,
        fireworkAddedShards: 5,
        fireworkShardPrevPoints: 3,
        fireworkShardBaseVel: 4,
        fireworkShardAddedVel: 2,
        fireworkShardBaseSize: 3,
        fireworkShardAddedSize: 3,
        gravity: 0.1,
        upFlow: -0.1,
        letterContemplatingWaitTime: 360,
        balloonSpawnTime: 20,
        balloonBaseInflateTime: 10,
        balloonAddedInflateTime: 10,
        balloonBaseSize: 20,
        balloonAddedSize: 20,
        balloonBaseVel: 0.4,
        balloonAddedVel: 0.4,
        balloonBaseRadian: -(Math.PI / 2 - 0.5),
        balloonAddedRadian: -1,
    };
    
    const calc = {
        totalWidth: opts.charSpacing * Math.max(opts.strings[0].length, opts.strings[1].length),
    };
    
    const Tau = Math.PI * 2,
        TauQuarter = Tau / 4,
        letters = [];
    
    ctx.font = opts.charSize + "px Verdana";
    
    function Letter(char, x, y) {
        this.char = char;
        this.x = x;
        this.y = y;
        this.dx = -ctx.measureText(char).width / 2;
        this.dy = +opts.charSize / 2;
        this.fireworkDy = this.y - hh;
        
        var hue = (x / calc.totalWidth) * 360;
        this.color = "hsl(hue,80%,50%)".replace("hue", hue);
        this.lightAlphaColor = "hsla(hue,80%,light%,alp)".replace("hue", hue);
        this.lightColor = "hsl(hue,80%,light%)".replace("hue", hue);
        this.alphaColor = "hsla(hue,80%,50%,alp)".replace("hue", hue);
        
        this.reset();
    }
    
    Letter.prototype.reset = function () {
        this.phase = "firework";
        this.tick = 0;
        this.spawned = false;
        this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
        this.reachTime = (opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random()) | 0;
        this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
        this.prevPoints = [[0, hh, 0]];
    };
    
    Letter.prototype.step = function () {
        if (this.phase === "firework") {
            if (!this.spawned) {
                ++this.tick;
                if (this.tick >= this.spawningTime) {
                    this.tick = 0;
                    this.spawned = true;
                }
            } else {
                ++this.tick;
                
                var linearProportion = this.tick / this.reachTime,
                    armonicProportion = Math.sin(linearProportion * TauQuarter),
                    x = linearProportion * this.x,
                    y = hh + armonicProportion * this.fireworkDy;
                
                if (this.prevPoints.length > opts.fireworkPrevPoints)
                    this.prevPoints.shift();
                
                this.prevPoints.push([x, y, linearProportion * this.lineWidth]);
                
                var lineWidthProportion = 1 / (this.prevPoints.length - 1);
                
                for (var i = 1; i < this.prevPoints.length; ++i) {
                    var point = this.prevPoints[i],
                        point2 = this.prevPoints[i - 1];
                    
                    ctx.strokeStyle = this.alphaColor.replace("alp", i / this.prevPoints.length);
                    ctx.lineWidth = point[2] * lineWidthProportion * i;
                    ctx.beginPath();
                    ctx.moveTo(point[0], point[1]);
                    ctx.lineTo(point2[0], point2[1]);
                    ctx.stroke();
                }
                
                if (this.tick >= this.reachTime) {
                    this.phase = "contemplate";
                    this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
                    this.circleCompleteTime = (opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random()) | 0;
                    this.circleCreating = true;
                    this.circleFading = false;
                    this.circleFadeTime = (opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random()) | 0;
                    this.tick = 0;
                    this.tick2 = 0;
                    this.shards = [];
                    
                    var shardCount = (opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random()) | 0,
                        angle = Tau / shardCount,
                        cos = Math.cos(angle),
                        sin = Math.sin(angle),
                        x = 1,
                        y = 0;
                    
                    for (var i = 0; i < shardCount; ++i) {
                        var x1 = x;
                        x = x * cos - y * sin;
                        y = y * cos + x1 * sin;
                        this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor));
                    }
                }
            }
        } else if (this.phase === "contemplate") {
            ++this.tick;
            
            if (this.circleCreating) {
                ++this.tick2;
                var proportion = this.tick2 / this.circleCompleteTime,
                    armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;
                
                ctx.beginPath();
                ctx.fillStyle = this.lightAlphaColor.replace("light", 50 + 50 * proportion).replace("alp", proportion);
                ctx.beginPath();
                ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
                ctx.fill();
                
                if (this.tick2 > this.circleCompleteTime) {
                    this.tick2 = 0;
                    this.circleCreating = false;
                    this.circleFading = true;
                }
            } else if (this.circleFading) {
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
                
                ++this.tick2;
                var proportion = this.tick2 / this.circleFadeTime,
                    armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;
                
                ctx.beginPath();
                ctx.fillStyle = this.lightAlphaColor.replace("light", 100).replace("alp", 1 - armonic);
                ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
                ctx.fill();
                
                if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
            } else {
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
            }
            
            for (var i = 0; i < this.shards.length; ++i) {
                this.shards[i].step();
                if (!this.shards[i].alive) {
                    this.shards.splice(i, 1);
                    --i;
                }
            }
            
            if (this.tick > opts.letterContemplatingWaitTime) {
                this.phase = "balloon";
                this.tick = 0;
                this.spawning = true;
                this.spawnTime = (opts.balloonSpawnTime * Math.random()) | 0;
                this.inflating = false;
                this.inflateTime = (opts.balloonBaseInflateTime + opts.balloonAddedInflateTime * Math.random()) | 0;
                this.size = (opts.balloonBaseSize + opts.balloonAddedSize * Math.random()) | 0;
                
                var rad = opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random(),
                    vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();
                
                this.vx = Math.cos(rad) * vel;
                this.vy = Math.sin(rad) * vel;
            }
        } else if (this.phase === "balloon") {
            ctx.strokeStyle = this.lightColor.replace("light", 80);
            
            if (this.spawning) {
                ++this.tick;
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
                
                if (this.tick >= this.spawnTime) {
                    this.tick = 0;
                    this.spawning = false;
                    this.inflating = true;
                }
            } else if (this.inflating) {
                ++this.tick;
                
                var proportion = this.tick / this.inflateTime,
                    x = (this.cx = this.x),
                    y = (this.cy = this.y - this.size * proportion);
                
                ctx.fillStyle = this.alphaColor.replace("alp", proportion);
                ctx.beginPath();
                generateBalloonPath(x, y, this.size * proportion);
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, this.y);
                ctx.stroke();
                
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
                
                if (this.tick >= this.inflateTime) {
                    this.tick = 0;
                    this.inflating = false;
                }
            } else {
                this.cx += this.vx;
                this.cy += this.vy += opts.upFlow;
                
                ctx.fillStyle = this.color;
                ctx.beginPath();
                generateBalloonPath(this.cx, this.cy, this.size);
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(this.cx, this.cy);
                ctx.lineTo(this.cx, this.cy + this.size);
                ctx.stroke();
                
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.cx + this.dx, this.cy + this.dy + this.size);
                
                if (this.cy + this.size < -hh || this.cx < -hw || this.cy > hw)
                    this.phase = "done";
            }
        }
    };
    
    function Shard(x, y, vx, vy, color) {
        var vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();
        this.vx = vx * vel;
        this.vy = vy * vel;
        this.x = x;
        this.y = y;
        this.prevPoints = [[x, y]];
        this.color = color;
        this.alive = true;
        this.size = opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
    }
    
    Shard.prototype.step = function () {
        this.x += this.vx;
        this.y += this.vy += opts.gravity;
        
        if (this.prevPoints.length > opts.fireworkShardPrevPoints)
            this.prevPoints.shift();
        
        this.prevPoints.push([this.x, this.y]);
        
        var lineWidthProportion = this.size / this.prevPoints.length;
        
        for (var k = 0; k < this.prevPoints.length - 1; ++k) {
            var point = this.prevPoints[k],
                point2 = this.prevPoints[k + 1];
            
            ctx.strokeStyle = this.color.replace("alp", k / this.prevPoints.length);
            ctx.lineWidth = k * lineWidthProportion;
            ctx.beginPath();
            ctx.moveTo(point[0], point[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.stroke();
        }
        
        if (this.prevPoints[0][1] > hh) this.alive = false;
    };
    
    function generateBalloonPath(x, y, size) {
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size / 4, y - size, x, y - size);
        ctx.bezierCurveTo(x + size / 4, y - size, x + size / 2, y - size / 2, x, y);
    }
    
    function anim() {
        window.requestAnimationFrame(anim);
        
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, w, h);
        
        ctx.translate(hw, hh);
        
        var done = true;
        for (var l = 0; l < letters.length; ++l) {
            letters[l].step();
            if (letters[l].phase !== "done") done = false;
        }
        
        ctx.translate(-hw, -hh);
        
        if (done) for (var l = 0; l < letters.length; ++l) letters[l].reset();
    }
    
    // Initialize letters
    for (let i = 0; i < opts.strings.length; ++i) {
        for (var j = 0; j < opts.strings[i].length; ++j) {
            letters.push(
                new Letter(
                    opts.strings[i][j],
                    j * opts.charSpacing + opts.charSpacing / 2 - (opts.strings[i].length * opts.charSize) / 2,
                    i * opts.lineHeight + opts.lineHeight / 2 - (opts.strings.length * opts.lineHeight) / 2
                )
            );
        }
    }
    
    anim();
    
    window.addEventListener("resize", function () {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        hw = w / 2;
        hh = h / 2;
        ctx.font = opts.charSize + "px Verdana";
    });
}

// Section 2: Birthday Cake Animation
function initCake() {
    console.log('Cake animation starting...');
    
    // The SVG is already in the HTML, just trigger the animation
    const cakeSvg = document.getElementById('cake');
    if (cakeSvg) {
        // Find the first path and add the missing animation element
        const firstPath = cakeSvg.querySelector('path');
        if (firstPath) {
            // Check if bizcocho_2 animation already exists
            let bizcocho2 = cakeSvg.querySelector('#bizcocho_2');
            if (!bizcocho2) {
                bizcocho2 = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                bizcocho2.setAttribute("id", "bizcocho_2");
                bizcocho2.setAttribute("attributeName", "d");
                bizcocho2.setAttribute("calcMode", "spline");
                bizcocho2.setAttribute("keySplines", "0 0 1 1");
                bizcocho2.setAttribute("begin", "0s");
                bizcocho2.setAttribute("dur", "0.5s");
                bizcocho2.setAttribute("fill", "freeze");
                bizcocho2.setAttribute("values", `
                    M173.667-13.94c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002
                    c44.697,0,96.586,0,147.334,0C177.667-29.942,177.668-13.94,173.667-13.94z
                    ;
                    M173.667,267.257c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002
                    c44.697,0,96.586,0,147.334,0C177.667,251.255,177.668,267.257,173.667,267.257z
                `);
                firstPath.appendChild(bizcocho2);
            }
        }
        
        // Make sure the cake is visible
        const cakeElement = document.querySelector('.cake');
        if (cakeElement) {
            cakeElement.style.transform = 'translateY(0)';
        }
    }
}

// Section 3: Air Message Animation
function initAirMessage() {
    const colors = [
        {
            a: 'navy',
            b: '#fff',
            c: '#f3e412',
            d: '#0482d6',
        },
        {
            a: '#f83b3b',
            b: 'pink',
            c: 'yellow',
            d: '#fc65c9',
        },
        {
            a: '#fff',
            b: '#3b3bca',
            c: '#9953f5',
            d: '#67fdf1',
        },
        {
            a: 'navy',
            b: '#a6e1fc',
            c: '#9df312',
            d: '#ffef5d',
        }
    ];

    const planeSvg = () => {
        const { a, b, c, d } = colors[Math.floor(Math.random() * colors.length)];
        return `<svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 52 26"><path fill="${a}" d="M 35 2h1v1h-1v-1"/> <path fill="${a}" d="M 42 2h1v1h-1v-1"/> <path fill="${a}" d="M 9 3h1v1h-1v-1"/> <path fill="${a}" d="M 16 3h1v1h-1v-1"/> <path fill="${a}" d="M 34 3h1v6h-1v-6"/> <path fill="${b}" d="M 35 3h1v1h1v1h4v-1h1v-1h1v6h-1v1h-6v-1h-1v-6"/> <path fill="${a}" d="M 36 3h1v1h-1v-1"/> <path fill="${a}" d="M 41 3h1v1h-1v-1"/> <path fill="${a}" d="M 43 3h1v6h-1v-6"/> <path fill="${a}" d="M 8 4h1v6h-1v-6"/> <path fill="${b}" d="M 9 4h1v1h1v1h4v-1h1v-1h1v6h-1v1h-6v-1h-1v-6"/> <path fill="${a}" d="M 10 4h1v1h-1v-1"/> <path fill="${a}" d="M 15 4h1v1h-1v-1"/> <path fill="${a}" d="M 17 4h1v6h-1v-6"/> <path fill="${a}" d="M 37 4h4v1h-4v-1"/> <path fill="${a}" d="M 11 5h4v1h-4v-1"/> <path fill="${c}" d="M 23 6h2v6h-1v-1h-1v-1h-3v-1h1v-1h1v-1h1v-1"/> <path fill="${a}" d="M 36 6h1v2h-1v-2"/> <path fill="${a}" d="M 41 6h1v2h-1v-2"/> <path fill="${c}" d="M 49 6h2v6h-1v-1h-1v-1h-3v-1h1v-1h1v-1h1v-1"/> <path fill="${a}" d="M 10 7h1v2h-1v-2"/> <path fill="${a}" d="M 15 7h1v2h-1v-2"/> <path fill="${a}" d="M 38 8h2v1h-2v-1"/> <path fill="${a}" d="M 12 9h2v1h-2v-1"/> <path fill="${a}" d="M 35 9h1v1h-1v-1"/> <path fill="${a}" d="M 42 9h1v1h-1v-1"/> <path fill="${d}" d="M 5 10h3v1h1v1h1v1h6v-1h1v-1h1v-1h5v1h1v1h1v2h-4v1h1v1h1v1h-1v1h-5v-3h-1v-1h-6v1h-1v3h-6v-1h-1v-1h-1v-3h1v-1h1v-1h2v-1"/> <path fill="${c}" d="M 8 10h1v1h-1v-1"/> <path fill="${a}" d="M 9 10h1v1h-1v-1"/> <path fill="${a}" d="M 16 10h1v1h-1v-1"/> <path fill="${c}" d="M 17 10h1v1h-1v-1"/> <path fill="${d}" d="M 31 10h3v1h1v1h1v1h6v-1h1v-1h1v-1h5v1h1v1h1v2h-4v1h1v1h1v1h-1v1h-5v-3h-1v-1h-6v1h-1v3h-6v-1h-1v-1h-1v-3h1v-1h1v-1h2v-1"/> <path fill="${c}" d="M 34 10h1v1h-1v-1"/> <path fill="${b}" d="M 35 10h1v1h-1v-1"/> <path fill="${a}" d="M 36 10h6v1h-6v-1"/> <path fill="${b}" d="M 42 10h1v1h-1v-1"/> <path fill="${c}" d="M 43 10h1v1h-1v-1"/> <path fill="${c}" d="M 9 11h1v1h-1v-1"/> <path fill="${a}" d="M 10 11h6v1h-6v-1"/> <path fill="${c}" d="M 16 11h1v1h-1v-1"/> <path fill="${c}" d="M 35 11h1v1h-1v-1"/> <path fill="${b}" d="M 36 11h6v1h-6v-1"/> <path fill="${c}" d="M 42 11h1v1h-1v-1"/> <path fill="${c}" d="M 10 12h6v1h-6v-1"/> <path fill="${c}" d="M 36 12h6v1h-6v-1"/> <path fill="${c}" d="M 10 14h6v1h1v7h-1v1h-3v-1h-1v-1h-1v-1h-1v-1h-1v-4h1v-1"/> <path fill="${c}" d="M 21 14h4v4h-1v-1h-1v-1h-1v-1h-1v-1"/> <path fill="${c}" d="M 36 14h6v1h1v7h-1v1h-3v-1h-1v-1h-1v-1h-1v-1h-1v-4h1v-1"/> <path fill="${c}" d="M 47 14h4v4h-1v-1h-1v-1h-1v-1h-1v-1"/></svg>`;
    };

    const rope = () => {
        const a = '#fff';
        return `
        <div class="rope">
          <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 26 26">
            <path fill="${a}" d="M 24 9h1v1h-1v-1"/> <path fill="${a}" d="M 23 10h1v1h-1v-1"/> <path fill="${a}" d="M 22 11h1v1h-1v-1"/> <path fill="${a}" d="M 21 12h1v1h-1v-1"/> <path fill="${a}" d="M 1 13h20v1h-20v-1"/> <path fill="${a}" d="M 21 14h1v1h-1v-1"/> <path fill="${a}" d="M 22 15h1v1h-1v-1"/> <path fill="${a}" d="M 23 16h1v1h-1v-1"/> <path fill="${a}" d="M 24 17h1v1h-1v-1"/>
          </svg>
        </div>`;
    };

    const planeTimer = [];
    const wrapper = document.querySelector('#air-message .wrapper');
    const cellD = 60;
    const topValues = [0.5, 1.5, 2.5, 3.5];
    let bannerContent = 'Happy#Birthday#to#You#Beautiful#Person';
    const banners = [];
    let spriteId = 0;
    let topIndex = 3;
    let count = 0;
    let bannerIndex = 0;

    const animate = (actor, frame, cellD) => {
        const leftV = +(actor.style.left).replace('px', '');
        let newLeftV = leftV - cellD;
        newLeftV = newLeftV < ((-1 * (frame - 1)) * cellD) ? 0 : newLeftV;
        actor.style.left = `${newLeftV}px`;
    };

    const bop = (actors, index) => {
        const actor = actors[index];
        const motion = 6;
        const topV = actor.dataset.top ? actor.dataset.top : motion;
        const newTopV = +topV === motion ? -motion : motion;
        actor.style.top = `${newTopV}px`;
        actor.dataset.top = newTopV;
        if (actor.classList.contains('front')) actor.childNodes[3].style.transform = `rotate(${newTopV / (motion / -2)}deg)`;
        setTimeout(() => {
            const newIndex = index >= (actors.length - 1) ? 0 : index + 1;
            bop(actors, newIndex);
        }, 120);
    };

    const mapModules = words => {
        return words.map(word => {
            return `
            <div class="message module module_${spriteId}">
              ${word}
            </div>
            `;
        }).join('');
    };

    const createPlane = sentence => {
        const plane = document.createElement('div');
        spriteId++;
        plane.classList.add('plane_wrapper');
        plane.innerHTML = `
        <div class="front module module_${spriteId}">
          <div class="sprite_container">
            <div class="sprite sprite_${spriteId}">
              ${planeSvg()}
            </div>    
          </div>
          ${rope()}
        </div>    
        ${mapModules(sentence.split(' '))}
        `;
        wrapper.append(plane);
        const sprite = document.querySelector(`.sprite_${spriteId}`);
        setInterval(() => {
            animate(sprite, 2, cellD);
        }, 200);
        const modules = document.querySelectorAll(`.module_${spriteId}`);
        bop(modules, 0);
        topIndex = (topIndex + 1) < topValues.length ? topIndex + 1 : 0;

        if (count === banners.length) {
            topIndex = 0;
            count = 0;
            return;
        }
        plane.style.top = `${topValues[topIndex] * plane.offsetHeight + (20 * topValues[topIndex])}px`;
        plane.style.left = '100%';
        plane.style.transition = '6s ease';

        planeTimer[bannerIndex].timerOne = setTimeout(() => {
            plane.style.left = '10%';
        }, 100);
        planeTimer[bannerIndex].timerTwo = setTimeout(() => {
            plane.style.left = `-${plane.offsetWidth + 200}px`;
        }, 8000);
        planeTimer[bannerIndex].timerThree = setTimeout(() => {
            wrapper.removeChild(plane);
            const planeNo = document.querySelectorAll('.plane_wrapper').length;
            if ((count === banners.length && planeNo < banners.length)) {
                topIndex = 3;
                count = 0;
                createPlanes();
            }
        }, 30000);
    };

    const calcWrapIndex = () => {
        const flexWrapper = document.querySelector('#air-message .flex_wrapper');
        const wrapIndex = [];
        flexWrapper.innerHTML = bannerContent.split('#').map(word => {
            return `
              <div class="message_ghost">
                ${word}
              </div>
            `;
        }).join('');
        const messageGhosts = document.querySelectorAll('.message_ghost');
        messageGhosts.forEach((message, i) => {
            if (i === (messageGhosts.length - 1)) return;
            if (message.getBoundingClientRect().y < messageGhosts[i + 1].getBoundingClientRect().y) {
                wrapIndex.push(i);
            }
        });
        return wrapIndex;
    };

    const splitTextForBanners = () => {
        banners.length = 0;
        const word = [];
        const wrapIndex = calcWrapIndex();
        let hashCount = -1;
        bannerContent.split('').forEach((letter, i) => {
            if (letter === '#') hashCount++;
            word.push(letter);
            if ((wrapIndex.find(i => i === hashCount) && letter === '#')) {
                banners.push(word.join(''));
                word.length = 0;
            }
            if (i === (bannerContent.length - 1)) banners.push(word.join(''));
        });
    };

    const createTimers = () => {
        planeTimer.length = 0;
        banners.forEach(() => {
            planeTimer.push({
                timerOne: null,
                timerTwo: null,
                timerThree: null,
            });
        });
    };

    const createPlanes = () => {
        const bannerText = banners[bannerIndex].split('').reverse().join('')[0] === '#' ? banners[bannerIndex] : banners[bannerIndex] += '#';

        if (bannerText !== '#') createPlane(bannerText.replaceAll('#', ' '));
        bannerIndex = (bannerIndex + 1) < banners.length ? bannerIndex + 1 : 0;

        if (bannerIndex === 0) spriteId = 0;

        count++;
        setTimeout(() => {
            if (count === banners.length) return;
            createPlanes();
        }, 3000);
    };

    const resetPlanes = () => {
        planeTimer.forEach(timers => {
            clearTimeout(timers.timerOne);
            clearTimeout(timers.timerTwo);
            clearTimeout(timers.timerThree);
        });
        wrapper.innerHTML = '';
        spriteId = 0;
        topIndex = 3;
        count = 0;
        bannerIndex = 0;
        splitTextForBanners();
        createTimers();
        createPlanes();
    };

    splitTextForBanners();
    createTimers();
    createPlanes();

    window.addEventListener('resize', resetPlanes);
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Trigger animation for the target section
                setTimeout(() => {
                    switch(targetId) {
                        case '#birthday-cake':
                            if (!targetSection.dataset.initialized) {
                                initCake();
                                targetSection.dataset.initialized = 'true';
                            }
                            break;
                        case '#air-message':
                            if (!targetSection.dataset.initialized) {
                                initAirMessage();
                                targetSection.dataset.initialized = 'true';
                            }
                            break;
                    }
                }, 1000); // Wait for scroll to complete
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    });
}
