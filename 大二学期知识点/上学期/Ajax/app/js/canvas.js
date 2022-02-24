(function () {
  let huhuiyu = {
    startAnimate(el) {
      el.innerHTML = '';
      let elCanvas = document.createElement('canvas');
      el.appendChild(elCanvas);
      huhuiyu.el = elCanvas;
      init(elCanvas);
      animation();
    }
  };

  window.huhuiyu_canvas01 = huhuiyu;

  let canvas, ctx, w, h, hue, stars, count, maxStars;
  let canvas2, ctx2;
  let half, gradient2;

  function init(elCanvas) {
    canvas = elCanvas;
    ctx = canvas.getContext('2d');
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    hue = 217;
    stars = [];
    count = 0;
    maxStars = 1200;

    canvas2 = document.createElement('canvas');
    ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    half = canvas2.width / 2;
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    for (let i = 0; i < maxStars; i++) {
      new Star();
    }
  }
  // End cache

  function random(min, max) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }

    if (min > max) {
      let hold = max;
      max = min;
      min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function maxOrbit(x, y) {
    let max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
  }

  let Star = function () {
    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 12;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 900000;
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
  };

  Star.prototype.draw = function () {
    let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
      canvas2,
      x - this.radius / 2,
      y - this.radius / 2,
      this.radius,
      this.radius
    );
    this.timePassed += this.speed;
  };

  function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 1, l = stars.length; i < l; i++) {
      stars[i].draw();
    }

    window.requestAnimationFrame(animation);
  }
})();
(function () {
  let huhuiyu = {
    startAnimate(el) {
      el.innerHTML = '';
      let canvas = document.createElement('canvas');
      el.appendChild(canvas);
      huhuiyu.el = canvas;
      init();
      loop();
    }
  };

  window.huhuiyu_canvas02 = huhuiyu;

  let w, h, ctx, tick, lines, dieX, dieY, baseRad;

  function init() {
    (w = huhuiyu.el.width = window.innerWidth),
      (h = huhuiyu.el.height = window.innerHeight),
      (ctx = huhuiyu.el.getContext('2d')),
      (opts = {
        len: 20,
        count: 50,
        baseTime: 10,
        addedTime: 10,
        dieChance: 0.05,
        spawnChance: 1,
        sparkChance: 0.1,
        sparkDist: 10,
        sparkSize: 2,
        color: 'hsl(hue,100%,light%)',
        baseLight: 50,
        addedLight: 10,
        shadowToTimePropMult: 6,
        baseLightInputMultiplier: 0.01,
        addedLightInputMultiplier: 0.02,
        cx: w / 2,
        cy: h / 2,
        repaintAlpha: 0.04,
        hueChange: 0.1
      }),
      (tick = 0),
      (lines = []),
      (dieX = w / 2 / opts.len),
      (dieY = h / 2 / opts.len),
      (baseRad = (Math.PI * 2) / 6);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
  }

  function loop() {
    window.requestAnimationFrame(loop);
    ++tick;
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha);
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    if (lines.length < opts.count && Math.random() < opts.spawnChance)
      lines.push(new Line());
    lines.map(function (line) {
      line.step();
    });
  }

  function Line() {
    this.reset();
  }
  Line.prototype.reset = function () {
    this.x = 0;
    this.y = 0;
    this.addedX = 0;
    this.addedY = 0;
    this.rad = 0;
    this.lightInputMultiplier =
      opts.baseLightInputMultiplier +
      opts.addedLightInputMultiplier * Math.random();
    this.color = opts.color.replace('hue', tick * opts.hueChange);
    this.cumulativeTime = 0;
    this.beginPhase();
  };
  Line.prototype.beginPhase = function () {
    this.x += this.addedX;
    this.y += this.addedY;
    this.time = 0;
    this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
    this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
    this.addedX = Math.cos(this.rad);
    this.addedY = Math.sin(this.rad);
    if (
      Math.random() < opts.dieChance ||
      this.x > dieX ||
      this.x < -dieX ||
      this.y > dieY ||
      this.y < -dieY
    )
      this.reset();
  };
  Line.prototype.step = function () {
    ++this.time;
    ++this.cumulativeTime;
    if (this.time >= this.targetTime) this.beginPhase();
    let prop = this.time / this.targetTime,
      wave = Math.sin((prop * Math.PI) / 2),
      x = this.addedX * wave,
      y = this.addedY * wave;
    ctx.shadowBlur = prop * opts.shadowToTimePropMult;
    ctx.fillStyle = ctx.shadowColor = this.color.replace(
      'light',
      opts.baseLight +
        opts.addedLight *
          Math.sin(this.cumulativeTime * this.lightInputMultiplier)
    );
    ctx.fillRect(
      opts.cx + (this.x + x) * opts.len,
      opts.cy + (this.y + y) * opts.len,
      2,
      2
    );
    if (Math.random() < opts.sparkChance)
      ctx.fillRect(
        opts.cx +
          (this.x + x) * opts.len +
          Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
          opts.sparkSize / 2,
        opts.cy +
          (this.y + y) * opts.len +
          Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
          opts.sparkSize / 2,
        opts.sparkSize,
        opts.sparkSize
      );
  };
  // loop();
  window.addEventListener('resize', function () {
    w = huhuiyu.el.width = window.innerWidth;
    h = huhuiyu.el.height = window.innerHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    opts.cx = w / 2;
    opts.cy = h / 2;
    dieX = w / 2 / opts.len;
    dieY = h / 2 / opts.len;
  });
})();
(function () {
  let huhuiyu = {
    startAnimate(el) {
      el.innerHTML = '';
      let elCanvas = document.createElement('canvas');
      el.appendChild(elCanvas);
      init(elCanvas);
    }
  };
  window.huhuiyu_canvas03 = huhuiyu;

  let canvas, ctx, width, height, size, lines, tick;

  function line() {
    this.path = [];
    this.speed = rand(10, 20);
    this.count = randInt(10, 30);
    (this.x = width / 2), +1;
    this.y = height / 2 + 1;
    this.target = {
      x: width / 2,
      y: height / 2
    };
    this.dist = 0;
    this.angle = 0;
    this.hue = tick / 5;
    this.life = 1;
    this.updateAngle();
    this.updateDist();
  }

  line.prototype.step = function (i) {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    this.updateDist();

    if (this.dist < this.speed) {
      this.x = this.target.x;
      this.y = this.target.y;
      this.changeTarget();
    }

    this.path.push({
      x: this.x,
      y: this.y
    });
    if (this.path.length > this.count) {
      this.path.shift();
    }

    this.life -= 0.001;

    if (this.life <= 0) {
      this.path = null;
      lines.splice(i, 1);
    }
  };

  line.prototype.updateDist = function () {
    var dx = this.target.x - this.x,
      dy = this.target.y - this.y;
    this.dist = Math.sqrt(dx * dx + dy * dy);
  };

  line.prototype.updateAngle = function () {
    var dx = this.target.x - this.x,
      dy = this.target.y - this.y;
    this.angle = Math.atan2(dy, dx);
  };

  line.prototype.changeTarget = function () {
    var randStart = randInt(0, 3);
    switch (randStart) {
      case 0: // up
        this.target.y = this.y - size;
        break;
      case 1: // right
        this.target.x = this.x + size;
        break;
      case 2: // down
        this.target.y = this.y + size;
        break;
      case 3: // left
        this.target.x = this.x - size;
    }
    this.updateAngle();
  };

  line.prototype.draw = function (i) {
    ctx.beginPath();
    var rando = rand(0, 10);
    for (var j = 0, length = this.path.length; j < length; j++) {
      ctx[j === 0 ? 'moveTo' : 'lineTo'](
        this.path[j].x + rand(-rando, rando),
        this.path[j].y + rand(-rando, rando)
      );
    }
    ctx.strokeStyle =
      'hsla(' +
      rand(this.hue, this.hue + 30) +
      ', 80%, 55%, ' +
      this.life / 3 +
      ')';
    ctx.lineWidth = rand(0.1, 2);
    ctx.stroke();
  };

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function init(elCanvas) {
    canvas = elCanvas;
    ctx = canvas.getContext('2d');
    size = 30;
    lines = [];
    reset();
    loop();
  }

  function reset() {
    width = Math.ceil(window.innerWidth / 2) * 2;
    height = Math.ceil(window.innerHeight / 2) * 2;
    tick = 0;

    lines.length = 0;
    canvas.width = width;
    canvas.height = height;
  }

  function create() {
    if (tick % 10 === 0) {
      lines.push(new line());
    }
  }

  function step() {
    var i = lines.length;
    while (i--) {
      lines[i].step(i);
    }
  }

  function clear() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
  }

  function draw() {
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(tick * 0.001);
    var scale = 0.8 + Math.cos(tick * 0.02) * 0.2;
    ctx.scale(scale, scale);
    ctx.translate(-width / 2, -height / 2);
    var i = lines.length;
    while (i--) {
      lines[i].draw(i);
    }
    ctx.restore();
  }

  function loop() {
    requestAnimationFrame(loop);
    create();
    step();
    clear();
    draw();
    tick++;
  }

  function onresize() {
    reset();
  }

  window.addEventListener('resize', onresize);
})();
(function () {
  let huhuiyu = {
    startAnimate(el) {
      el.innerHTML = '';
      let elCanvas = document.createElement('canvas');
      el.appendChild(elCanvas);
      let app = new Build(elCanvas);
      app.run();
    }
  };
  window.huhuiyu_canvas04 = huhuiyu;

  let num = 200;
  let w = window.innerWidth;
  let h = window.innerHeight;
  let max = 100;
  let _x = 0;
  let _y = 0;
  let _z = 150;
  let dtr = function (d) {
    return (d * Math.PI) / 180;
  };

  let rnd = function () {
    return Math.sin((Math.floor(Math.random() * 360) * Math.PI) / 180);
  };
  let dist = function (p1, p2, p3) {
    return Math.sqrt(
      Math.pow(p2.x - p1.x, 2) +
        Math.pow(p2.y - p1.y, 2) +
        Math.pow(p2.z - p1.z, 2)
    );
  };

  let cam = {
    obj: {
      x: _x,
      y: _y,
      z: _z
    },
    dest: {
      x: 0,
      y: 0,
      z: 1
    },
    dist: {
      x: 0,
      y: 0,
      z: 200
    },
    ang: {
      cplane: 0,
      splane: 0,
      ctheta: 0,
      stheta: 0
    },
    zoom: 1,
    disp: {
      x: w / 2,
      y: h / 2,
      z: 0
    },
    upd: function () {
      cam.dist.x = cam.dest.x - cam.obj.x;
      cam.dist.y = cam.dest.y - cam.obj.y;
      cam.dist.z = cam.dest.z - cam.obj.z;
      cam.ang.cplane =
        -cam.dist.z /
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
      cam.ang.splane =
        cam.dist.x /
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
      cam.ang.ctheta =
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) /
        Math.sqrt(
          cam.dist.x * cam.dist.x +
            cam.dist.y * cam.dist.y +
            cam.dist.z * cam.dist.z
        );
      cam.ang.stheta =
        -cam.dist.y /
        Math.sqrt(
          cam.dist.x * cam.dist.x +
            cam.dist.y * cam.dist.y +
            cam.dist.z * cam.dist.z
        );
    }
  };

  let trans = {
    parts: {
      sz: function (p, sz) {
        return {
          x: p.x * sz.x,
          y: p.y * sz.y,
          z: p.z * sz.z
        };
      },
      rot: {
        x: function (p, rot) {
          return {
            x: p.x,
            y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
            z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
          };
        },
        y: function (p, rot) {
          return {
            x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
            y: p.y,
            z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
          };
        },
        z: function (p, rot) {
          return {
            x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
            y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
            z: p.z
          };
        }
      },
      pos: function (p, pos) {
        return {
          x: p.x + pos.x,
          y: p.y + pos.y,
          z: p.z + pos.z
        };
      }
    },
    pov: {
      plane: function (p) {
        return {
          x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
          y: p.y,
          z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
        };
      },
      theta: function (p) {
        return {
          x: p.x,
          y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
          z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
        };
      },
      set: function (p) {
        return {
          x: p.x - cam.obj.x,
          y: p.y - cam.obj.y,
          z: p.z - cam.obj.z
        };
      }
    },
    persp: function (p) {
      return {
        x: ((p.x * cam.dist.z) / p.z) * cam.zoom,
        y: ((p.y * cam.dist.z) / p.z) * cam.zoom,
        z: p.z * cam.zoom,
        p: cam.dist.z / p.z
      };
    },
    disp: function (p, disp) {
      return {
        x: p.x + disp.x,
        y: -p.y + disp.y,
        z: p.z + disp.z,
        p: p.p
      };
    },
    steps: function (_obj_, sz, rot, pos, disp) {
      let _args = trans.parts.sz(_obj_, sz);
      _args = trans.parts.rot.x(_args, rot);
      _args = trans.parts.rot.y(_args, rot);
      _args = trans.parts.rot.z(_args, rot);
      _args = trans.parts.pos(_args, pos);
      _args = trans.pov.plane(_args);
      _args = trans.pov.theta(_args);
      _args = trans.pov.set(_args);
      _args = trans.persp(_args);
      _args = trans.disp(_args, disp);
      return _args;
    }
  };

  let Build;

  (function () {
    'use strict';
    let threeD = function (param) {
      this.transIn = {};
      this.transOut = {};
      this.transIn.vtx = param.vtx;
      this.transIn.sz = param.sz;
      this.transIn.rot = param.rot;
      this.transIn.pos = param.pos;
    };

    threeD.prototype.vupd = function () {
      this.transOut = trans.steps(
        this.transIn.vtx,
        this.transIn.sz,
        this.transIn.rot,
        this.transIn.pos,
        cam.disp
      );
    };

    Build = function (elCanvas) {
      this.vel = 0.04;
      this.lim = 360;
      this.diff = 200;
      this.initPos = 100;
      this.toX = _x;
      this.toY = _y;
      this.canvas = elCanvas;
      this.go();
    };

    Build.prototype.go = function () {
      // this.canvas = document.getElementById('canv');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.$ = this.canvas.getContext('2d');
      this.$.globalCompositeOperation = 'source-over';
      this.varr = [];
      this.dist = [];
      this.calc = [];

      for (let i = 0, len = num; i < len; i++) {
        this.add();
      }

      this.rotObj = {
        x: 0,
        y: 0,
        z: 0
      };
      this.objSz = {
        x: w / 5,
        y: h / 5,
        z: w / 5
      };
    };

    Build.prototype.add = function () {
      this.varr.push(
        new threeD({
          vtx: {
            x: rnd(),
            y: rnd(),
            z: rnd()
          },
          sz: {
            x: 0,
            y: 0,
            z: 0
          },
          rot: {
            x: 20,
            y: -20,
            z: 0
          },
          pos: {
            x: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            y: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            z: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180)
          }
        })
      );
      this.calc.push({
        x: 360 * Math.random(),
        y: 360 * Math.random(),
        z: 360 * Math.random()
      });
    };

    Build.prototype.upd = function () {
      cam.obj.x += (this.toX - cam.obj.x) * 0.05;
      cam.obj.y += (this.toY - cam.obj.y) * 0.05;
    };

    Build.prototype.draw = function () {
      // this.$.fillStyle = '#000000';
      this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
      cam.upd();
      this.rotObj.x += 0.1;
      this.rotObj.y += 0.1;
      this.rotObj.z += 0.1;

      for (let i = 0; i < this.varr.length; i++) {
        for (let val in this.calc[i]) {
          if (this.calc[i].hasOwnProperty(val)) {
            this.calc[i][val] += this.vel;
            if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
          }
        }

        this.varr[i].transIn.pos = {
          x: this.diff * Math.cos((this.calc[i].x * Math.PI) / 180),
          y: this.diff * Math.sin((this.calc[i].y * Math.PI) / 180),
          z: this.diff * Math.sin((this.calc[i].z * Math.PI) / 180)
        };
        this.varr[i].transIn.rot = this.rotObj;
        this.varr[i].transIn.sz = this.objSz;
        this.varr[i].vupd();
        if (this.varr[i].transOut.p < 0) continue;
        let g = this.$.createRadialGradient(
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p,
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p * 2
        );
        this.$.globalCompositeOperation = 'lighter';
        g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
        g.addColorStop(0.5, 'hsla(' + (i + 2) + ',85%, 40%,1)');
        g.addColorStop(1, 'hsla(' + i + ',85%, 40%,.5)');
        this.$.fillStyle = g;
        this.$.beginPath();
        this.$.arc(
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p * 2,
          0,
          Math.PI * 2,
          false
        );
        this.$.fill();
        this.$.closePath();
      }
    };
    Build.prototype.anim = function () {
      window.requestAnimationFrame = (function () {
        return (
          window.requestAnimationFrame ||
          function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();
      let anim = function () {
        this.upd();
        this.draw();
        window.requestAnimationFrame(anim);
      }.bind(this);
      window.requestAnimationFrame(anim);
    };

    Build.prototype.run = function () {
      this.anim();

      window.addEventListener(
        'mousemove',
        function (e) {
          this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
          this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
        }.bind(this)
      );
      window.addEventListener(
        'touchmove',
        function (e) {
          e.preventDefault();
          this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
          this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
        }.bind(this)
      );
      window.addEventListener(
        'mousedown',
        function (e) {
          for (let i = 0; i < 100; i++) {
            this.add();
          }
        }.bind(this)
      );
      window.addEventListener(
        'touchstart',
        function (e) {
          e.preventDefault();
          for (let i = 0; i < 100; i++) {
            this.add();
          }
        }.bind(this)
      );
    };
  })();

  window.addEventListener(
    'resize',
    function () {
      canvas.width = w = window.innerWidth;
      canvas.height = h = window.innerHeight;
    },
    false
  );
})();
(function () {
  let huhuiyu = {
    startAnimate(el) {
      el.innerHTML = '';
      let elCanvas = document.createElement('canvas');
      el.appendChild(elCanvas);
      init(elCanvas);
    }
  };
  window.huhuiyu_canvas05 = huhuiyu;
  let canvas, ctx;
  let mousePosition;

  function init(elCanvas) {
    canvas = elCanvas;
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = new Color(150).style;

    mousePosition = {
      x: (30 * canvas.width) / 100,
      y: (30 * canvas.height) / 100
    };

    canvas.addEventListener('mousemove', function (event) {
      mousePosition.x = event.pageX;
      mousePosition.y = event.pageY;
    });

    canvas.addEventListener('mouseleave', function (event) {
      mousePosition.x = canvas.width / 2;
      mousePosition.y = canvas.height / 2;
    });

    createDots();
    requestAnimationFrame(animateDots);
  }

  let dots = {
    nb: 750,
    distance: 50,
    d_radius: 100,
    array: []
  };

  function colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
  }

  function createColorStyle(r, g, b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
  }

  function mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }

  function averageColorStyles(dot1, dot2) {
    let color1 = dot1.color,
      color2 = dot2.color;

    let r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
      g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
      b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
  }

  function Color(min) {
    min = min || 0;
    this.r = colorValue(min);
    this.g = colorValue(min);
    this.b = colorValue(min);
    this.style = createColorStyle(this.r, this.g, this.b);
  }

  function Dot() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();

    this.radius = Math.random() * 2;

    this.color = new Color();
    // console.log(this);
  }

  Dot.prototype = {
    draw: function () {
      ctx.beginPath();
      ctx.fillStyle = this.color.style;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
  };

  function createDots() {
    for (i = 0; i < dots.nb; i++) {
      dots.array.push(new Dot());
    }
  }

  function moveDots() {
    for (i = 0; i < dots.nb; i++) {
      let dot = dots.array[i];

      if (dot.y < 0 || dot.y > canvas.height) {
        dot.vx = dot.vx;
        dot.vy = -dot.vy;
      } else if (dot.x < 0 || dot.x > canvas.width) {
        dot.vx = -dot.vx;
        dot.vy = dot.vy;
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  }

  function connectDots() {
    for (i = 0; i < dots.nb; i++) {
      for (j = 0; j < dots.nb; j++) {
        i_dot = dots.array[i];
        j_dot = dots.array[j];

        if (
          i_dot.x - j_dot.x < dots.distance &&
          i_dot.y - j_dot.y < dots.distance &&
          i_dot.x - j_dot.x > -dots.distance &&
          i_dot.y - j_dot.y > -dots.distance
        ) {
          if (
            i_dot.x - mousePosition.x < dots.d_radius &&
            i_dot.y - mousePosition.y < dots.d_radius &&
            i_dot.x - mousePosition.x > -dots.d_radius &&
            i_dot.y - mousePosition.y > -dots.d_radius
          ) {
            ctx.beginPath();
            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
            ctx.moveTo(i_dot.x, i_dot.y);
            ctx.lineTo(j_dot.x, j_dot.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }

  function drawDots() {
    for (i = 0; i < dots.nb; i++) {
      let dot = dots.array[i];
      dot.draw();
    }
  }

  function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveDots();
    connectDots();
    drawDots();

    requestAnimationFrame(animateDots);
  }
})();
(function () {
  let huhuiyu = {
    startAnimate(el) {
      el.innerHTML = '';
      let elCanvas = document.createElement('canvas');
      el.appendChild(elCanvas);
      init(elCanvas);
    }
  };
  window.huhuiyu_canvas06 = huhuiyu;

  function init(elCanvas) {
    canvas = elCanvas;
    ctx = canvas.getContext('2d', {
      desynchronized:
        window.canvasOptions &&
        window.canvasOptions.desynchronized !== undefined
          ? window.canvasOptions.desynchronized
          : _defaulCanvasOptions.desynchronized
      // preserveDrawingBuffer: true // WebGL
    });
    _originalCtx = ctx;

    window.canvasOptions = {
      //- autoClear: true,
      autoCompensate: false,
      autoPushPop: true,
      canvas: true,
      centered: true,
      width: null,
      height: null
    };

    canvas.addEventListener(
      'mouseenter',
      (e) => (updateMouse(e), (mouseIn = true))
    );
    canvas.addEventListener(
      'mouseleave',
      (e) => (updateMouse(e), (mouseIn = false), (mouseDown = false))
    );
    canvas.addEventListener(
      'mousemove',
      (e) => (updateMouse(e), (mouseIn = true), (mouseMove = e.timeStamp))
    );
    canvas.addEventListener(
      'mousedown',
      (e) => (updateMouse(e), (mouseIn = true), (mouseDown = true))
    );
    canvas.addEventListener(
      'mouseup',
      (e) => (updateMouse(e), (mouseDown = false))
    );
    canvas.addEventListener(
      'touchstart',
      (e) => (updateMouse(e), (mouseIn = true))
    );
    canvas.addEventListener(
      'touchend',
      (e) => (updateMouse(e), (mouseIn = false), (mouseDown = false))
    );
    canvas.addEventListener(
      'touchcancel',
      (e) => (updateMouse(e), (mouseIn = false), (mouseDown = false))
    );
    canvas.addEventListener(
      'touchmove',
      (e) => (updateMouse(e), (mouseIn = true))
    );
    window.addEventListener('resize', _resizeCanvas);
    setup();

    mousePos = createVector();
    mousePosPrev = createVector();
    Object.assign(
      _canvasOptions,
      _defaulCanvasOptions,
      'canvasOptions' in window ? window.canvasOptions : {}
    );
    if (_canvasOptions.canvas === false) {
      document.body.removeChild(canvas);
    }
    _resizeCanvas();
    // if ('setup' in window) {
    //   window.setup();
    // }

    frameCount = 0;
    _anim = requestAnimationFrame(_draw);
    // window.addEventListener('load', () => {

    // });
  }

  const {
    E,
    LN10,
    LN2,
    LOG10E,
    LOG2E,
    PI,
    SQRT1_2,
    SQRT2,
    abs,
    acos,
    acosh,
    asin,
    asinh,
    atan,
    atan2,
    atanh,
    cbrt,
    ceil,
    clz32,
    cosh,
    exp,
    expm1,
    floor,
    fround,
    hypot,
    imul,
    log,
    log10,
    log1p,
    log2,
    max,
    min,
    pow,
    /* random, */ round,
    sign,
    sinh,
    sqrt,
    tan,
    tanh,
    trunc
  } = Math;

  let _codepenIDRegex =
    /codepen\.io\/[^/]+\/(?:pen|debug|fullpage|fullembedgrid)\/([^?#]+)/;

  // Why not?
  const ZERO = 0.0;
  const ONE = 1.0;
  const TWO = 2.0;
  const THREE = 3.0;
  const FOUR = 4.0;
  const FIVE = 5.0;
  const SIX = 6.0;
  const SEVEN = 7.0;
  const EIGHT = 8.0;
  const NINE = 9.0;
  const TEN = 10.0;
  const ELEVEN = 11.0;
  const TWELVE = 12.0;
  const SIXTEEN = 16.0;
  const THIRTY = 30.0;
  const THIRTY_TWO = 32.0;
  const SIXTY = 60.0;
  const HUNDRED = 100.0;
  const THOUSAND = 1000.0;

  const HALF = ONE / TWO;
  const THIRD = ONE / THREE;
  const TWO_THIRDS = THIRD * TWO;
  const QUARTER = ONE / FOUR;
  const THREE_QUARTER = QUARTER * THREE;
  const FIFTH = ONE / FIVE;
  const SIXTH = ONE / SIX;
  const SEVENTH = ONE / SEVEN;
  const EIGHTH = ONE / EIGHT;
  const TWELFTH = ONE / TWELVE;
  const SIXTEENTH = ONE / SIXTEEN;
  const ONE_THIRTIETH = ONE / THIRTY;
  const THIRTY_SECONDTH = ONE / THIRTY_TWO;
  const SIXTIETH = ONE / SIXTY;

  const TENTH = 1e-1;
  const HUNDREDTH = 1e-2;
  const THOUSANDTH = 1e-3;
  const TEN_THOUSANDTH = 1e-4;
  const HUNDRED_THOUSANDTH = 1e-5;
  const MILLIONTH = 1e-6;
  const TEN_MILLIONTH = 1e-7;
  const HUNDRED_MILLIONTH = 1e-8;
  const BILLIONTH = 1e-9;
  const TEN_BILLIONTH = 1e-10;
  const HUNDRED_BILLIONTH = 1e-11;

  const HALF_PI = PI * HALF;
  const THIRD_PI = PI * THIRD;
  const THREE_QUARTER_PI = PI * THREE_QUARTER;
  const QUARTER_PI = PI * QUARTER;
  const FIFTH_PI = PI * FIFTH;
  const SIXTH_PI = PI * SIXTH;
  const SEVENTH_PI = PI * SEVENTH;
  const EIGHTH_PI = PI * EIGHTH;
  const TWELFTH_PI = PI * TWELFTH;
  const SIXTEENTH_PI = PI * SIXTEENTH;
  const THIRTY_SECONDTH_PI = PI * THIRTY_SECONDTH;
  const TAU = PI * TWO;
  const TWO_TAU = TAU * TWO;
  const HALF_TAU = PI;
  const THIRD_TAU = TAU * THIRD;
  const QUARTER_TAU = HALF_PI;
  const FIFTH_TAU = TAU * FIFTH;
  const SIXTH_TAU = THIRD_PI;
  const EIGHTH_TAU = QUARTER_PI;
  const TWELFTH_TAU = SIXTH_PI;
  const SIXTEENTH_TAU = EIGHTH_PI;
  const THIRTY_SECONDTH_TAU = SIXTEENTH_PI;

  const SQRT_3 = sqrt(THREE);
  const SQRT_4 = sqrt(FOUR);
  const SQRT_5 = sqrt(FIVE);

  const PHI = (1 + sqrt(5)) * 0.5;
  const GOLDEN_ANGLE = 1 / (PHI * PHI);

  const COLOR_BLACK = hsl(0, 0, 0);
  const COLOR_WHITE = hsl(0, 0, 100);
  const COLOR_RED = hsl(0, 100, 50);
  const COLOR_ORANGE = hsl(30, 100, 50);
  const COLOR_YELLOW = hsl(60, 100, 50);
  const COLOR_GREEN = hsl(120, 100, 50);
  const COLOR_CYAN = hsl(180, 100, 50);
  const COLOR_BLUE = hsl(240, 100, 50);
  const COLOR_PURPLE = hsl(280, 100, 50);
  const COLOR_MAGENTA = hsl(300, 100, 50);

  const TEXTALIGN_LEFT = 'left';
  const TEXTALIGN_CENTER = 'center';
  const TEXTALIGN_RIGHT = 'right';
  const TEXTBASELINE_TOP = 'top';
  const TEXTBASELINE_MIDDLE = 'middle';
  const TEXTBASELINE_BOTTOM = 'bottom';

  let _defaulCanvasOptions = {
    autoClear: false,
    autoCompensate: true,
    autoPushPop: false,
    canvas: true,
    centered: false,
    desynchronized: false,
    width: null,
    height: null
  };
  let _canvasOptions = {};
  let canvas;
  let ctx;
  let _originalCtx;

  let _anim,
    _lastCanvasTime,
    canvasFrameRate,
    frameCount,
    width,
    height,
    width_half,
    height_half,
    width_quarter,
    height_quarter;
  let _canvasCurrentlyCentered = false;
  let mouseIn = false,
    mouseDown = false,
    mouseMove = null,
    mousePos = null,
    mousePosPrev = null;

  function updateMouse(e) {
    // Modified from p5.js
    if (e && !e.clientX) {
      e = e.touches ? e.touches[0] : e.changedTouches ? e.changedTouches[0] : e;
    }
    let rect = canvas.getBoundingClientRect();
    let sx = canvas.scrollWidth / width;
    let sy = canvas.scrollHeight / height;
    let x = (e.clientX - rect.left) / sx;
    let y = (e.clientY - rect.top) / sy;
    if (x < 0) x = 0;
    else if (x > width) x = width;
    if (y < 0) y = 0;
    else if (y > height) y = height;
    if (mousePos) {
      mousePosPrev.set(mousePos);
      mousePos.set(x, y);
    }
    // return { x, y, winX: e.clientX, winY: e.clientY, id: e.identifier };
  }

  // let mouseIn = false, mouseDown = false, mouseMove = null, mousePos = { x: 0, y: 0 };
  // function updateMouse(e) {
  // 	if(e && !e.clientX) {
  // 		e = e.touches ? e.touches[0] : (e.changedTouches ? e.changedTouches[0] : e);
  // 	}
  // 	const { innerWidth: width, innerHeight: height } = window;
  // 	uniforms.mouse.value.set(e.clientX / width, 1 - e.clientY / height);
  // }

  // [
  // 	[ 'mouseenter', e => mouseIn = true ],
  // 	[ 'mouseleave', e => (mouseIn = false, mouseDown = false) ],
  // 	[ 'mousemove', e => (mouseIn = true, mouseMove = e.timeStamp) ],
  // 	[ 'mousedown', e => (mouseIn = true, mouseDown = true) ],
  // 	[ 'mouseup', e => mouseDown = false ],
  // 	[ 'touchstart', e => mouseIn = true ],
  // 	[ 'touchend', e => (mouseIn = false, mouseDown = false) ],
  // 	[ 'touchcancel', e => (mouseIn = false, mouseDown = false) ],
  // 	[ 'touchmove', e => (mouseIn = true, mouseMove = e.timeStamp) ]
  // ].forEach(([ eventName, cb ]) => document.body.addEventListener(eventName, e => {
  // 	updateMouse(e);
  // 	cb(e);
  // }));

  function _draw(timestamp) {
    frameCount++;
    canvasFrameRate = 1000.0 / (timestamp - _lastCanvasTime);
    _lastCanvasTime = timestamp;
    ctx = _originalCtx;
    _canvasOptions.autoClear && clear(null);
    if (_canvasOptions.autoPushPop) {
      push();
      _canvasOptions.centered &&
        (_canvasCurrentlyCentered = true) &&
        translateCenter();
      _canvasOptions.autoCompensate && compensateCanvas();
    }
    // 'draw' in window && window.draw(timestamp);
    draw(timestamp);
    _canvasOptions.autoPushPop && pop();
    _canvasCurrentlyCentered = false;
    _anim = requestAnimationFrame(_draw);
  }

  function _resizeCanvas(specificCanvas) {
    // if(_canvasOptions.width === null)
    width = canvas.width =
      _canvasOptions.width !== null ? _canvasOptions.width : window.innerWidth;
    height = canvas.height =
      _canvasOptions.height !== null
        ? _canvasOptions.height
        : window.innerHeight;
    width_quarter = (width_half = width * HALF) * HALF;
    height_quarter = (height_half = height * HALF) * HALF;
    ctx.fillStyle = 'hsl(0, 0%, 100%)';
    ctx.strokeStyle = 'hsl(0, 0%, 100%)';
    if ('onResize' in window) {
      window.onResize();
    }
  }

  function clear(x, y, w, h) {
    if (x !== undefined && typeof x === 'number') {
      ctx.clearRect(x, y, w, h);
    } else if (
      _canvasOptions.centered &&
      _canvasCurrentlyCentered /*  && x !== null */
    ) {
      ctx.clearRect(-width_half, -height_half, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  function background(a) {
    push();
    if (typeof a !== 'number') {
      fillStyle(a);
    }
    if (_canvasOptions.centered && _canvasCurrentlyCentered) {
      ctx.fillRect(-width_half, -height_half, width, height);
    } else {
      ctx.fillRect(0, 0, width, height);
    }
    pop();
  }

  function globalAlpha(alpha = ctx.globalAlpha) {
    return (ctx.globalAlpha = alpha);
  }

  function fillStyle(...args) {
    if (args.length === 1) {
      let a = args[0];
      if (
        typeof a === 'string' ||
        a instanceof CanvasGradient ||
        a instanceof CanvasPattern
      ) {
        ctx.fillStyle = args[0];
      }
    }
    return ctx.fillStyle;
  }

  function lineWidth(w) {
    if (typeof w === 'number') {
      ctx.lineWidth = w;
    }
    return ctx.lineWidth;
  }

  // "butt" || "round" || "square";
  function lineCap(style = 'butt') {
    ctx.lineCap = style;
  }

  // "bevel" || "round" || "miter"
  function lineJoin(style) {
    ctx.lineJoin = style;
  }

  function miterLimit(value = 10) {
    ctx.miterLimit = value;
  }

  function strokeStyle(...args) {
    if (args.length === 1) {
      let a = args[0];
      if (typeof a === 'string' || a instanceof CanvasGradient) {
        ctx.strokeStyle = a;
      }
    } else if (args.length === 2) {
      strokeStyle(args[0]);
      lineWidth(args[1]);
    }
    return ctx.strokeStyle;
  }

  function lerpRGB(...args) {
    let r1 = 255;
    let b1 = 255;
    let g1 = 255;
    let a1 = 1;
    let r2 = 0;
    let g2 = 0;
    let b2 = 0;
    let a2 = 1;
    let t = 0.5;
    if (args.length === 3) {
      if (Array.isArray(args[0]) && Array.isArray(args[1])) {
        return lerpRGB(...args[0], ...args[1], args[2]);
      }
      [
        { r: r1 = 255, b: b1 = 255, g: g1 = 255, a: a1 = 1 },
        { r: r2 = 0, b: b2 = 0, g: g2 = 0, a: a2 = 1 },
        t
      ] = args;
    } else if (args.length === 7) {
      [r1, g1, b1, r2, g2, b2, t] = args;
    } else if (args.length === 9) {
      [r1, g1, b1, a1, r2, g2, b2, a2, t] = args;
    } else if (args.length === 2 && Array.isArray(args[0])) {
      if (args[0].length === 2) {
        return lerpRGB(...args[0], args[1]);
      }
      // TODO: Allow (possibly weighted) lerping between n-count RGBs at specified positions
    } else {
      return { r: 127.5, g: 127.5, b: 127.5, a: 1 };
    }
    let r = lerp(r1, r2, t);
    let g = lerp(g1, g2, t);
    let b = lerp(b1, b2, t);
    let a = lerp(a1, a2, t);
    return { r, g, b, a };
  }

  function hsl(hue, sat, light, alpha = 1) {
    if (typeof hue !== 'number') {
      if (Array.isArray(hue)) {
        [hue, sat, light, alpha = alpha] = hue;
      } else if ('h' in hue) {
        ({ h: hue, s: sat, l: light, a: alpha = alpha } = hue);
      }
    }
    hue = hue % 360;
    if (hue < 0) {
      hue += 360;
    }
    return `hsl(${hue} ${sat}% ${light}% / ${alpha})`;
  }

  function parseHSL(input) {
    if (typeof input !== 'string') {
      return input;
    }
    let result = input.match(
      /hsla?\(([\d.]+)\s*,?\s*([\d.]+)%\s*,?\s*([\d.]+)%\s*[/,]?\s*([\d.]*)?\)/
    );
    if (result) {
      let [i, h, s, l, a] = result;
      return { input, h, s, l, a };
    }
    return null;
  }

  function setHueHSL(input, val) {
    if (val === undefined) return input;
    let p = parseHSL(input);
    p.h = val;
    return hsl(p);
  }

  function rotateHSL(input, amt = 90) {
    if (amt === 0) return input;
    let p = parseHSL(input);
    p.h += amt;
    return hsl(p);
  }

  function saturateHSL(input, amt = 0.1) {
    if (amt === 0) return input;
    let p = parseHSL(input);
    p.s *= 1 + amt;
    return hsl(p);
  }

  function lightenHSL(input, amt = 0.1) {
    if (amt === 0) return input;
    let p = parseHSL(input);
    p.l *= 1 + amt;
    return hsl(p);
  }

  function rgb(r = 255, g = 255, b = 255, a = 1) {
    if (typeof r !== 'number' && 'r' in r) {
      ({ r = 255, g = 255, b = 255, a = 1 } = r);
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function fill(...args) {
    if (args.length) {
      fillStyle(...args);
    }
    ctx.fill();
  }

  function stroke(...args) {
    if (args.length) {
      strokeStyle(...args);
    }
    ctx.stroke();
  }

  function clip() {
    ctx.clip();
  }

  function createLinearGradient(x1 = -100, y1 = -100, x2 = 100, y2 = 100) {
    // 	if(typeof x1 !== 'number') {
    // 		if('x' in x1) {

    // 		}
    // 	}
    return ctx.createLinearGradient(x1, y1, x2, y2);
  }

  function createRadialGradient(
    x1 = 0,
    y1 = 0,
    r1 = 0,
    x2 = 0,
    y2 = 0,
    r2 = 200
  ) {
    return ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
  }

  function drawImage(img, x = 0, y = 0, ...args) {
    ctx.drawImage(img, x, y, ...args);
  }

  function strokeText(str = 'Hello world', x = 0, y = 0) {
    ctx.strokeText(str, x, y);
  }

  function fillText(str = 'Hello world', x = 0, y = 0) {
    ctx.fillText(str, x, y);
  }

  function strokeFillText(str = 'Hello world', x = 0, y = 0) {
    strokeText(str, x, y);
    fillText(str, x, y);
  }

  function fillStrokeText(str = 'Hello world', x = 0, y = 0) {
    fillText(str, x, y);
    strokeText(str, x, y);
  }

  function measureText(...args) {
    return ctx.measureText(...args);
  }

  // ctx.textAlign = "left" || "right" || "center" || "start" || "end";
  function textAlign(str = 'left') {
    ctx.textAlign = str;
  }

  // ctx.textBaseline = "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
  function textBaseline(str = 'left') {
    if (str === 'center') str = 'middle';
    ctx.textBaseline = str;
  }

  function push() {
    ctx.save();
  }

  function pop() {
    ctx.restore();
  }

  function resetTransform() {
    ctx.resetTransform();
  }

  function translate(x = 0, y = 0) {
    if (typeof x === 'number') {
      ctx.translate(x, y);
    } else if ('x' in x) {
      ctx.translate(x.x, x.y);
    }
  }

  function translateCenter(x = 0, y = 0) {
    ctx.translate(width_half + x, height_half + y);
  }

  function rotate(rot, offsetX, offsetY) {
    rot = rot % TAU;
    if (offsetX === undefined) {
      ctx.rotate(rot);
    } else if (typeof offsetX !== 'number') {
      if ('x' in offsetX) {
        ctx.translate(offsetX.x, offsetX.y);
        ctx.rotate(rot);
        ctx.translate(-offsetX.x, -offsetX.y);
      }
    } else {
      ctx.translate(offsetX, offsetY);
      ctx.rotate(rot);
      ctx.translate(-offsetX, -offsetY);
    }
  }

  function scale(x = 1, y = x) {
    ctx.scale(x, y);
  }

  function shearX(rad) {
    ctx.transform(1, 0, tan(rad), 1, 0, 0);
  }

  function shearY(rad) {
    ctx.transform(1, tan(rad), 0, 1, 0, 0);
  }

  function compensateCanvas() {
    let offX = 0;
    let offY = 0;
    if (width % 2) offX += 0.5;
    if (height % 2) offY += 0.5;
    if (offX || offY) {
      translate(offX, offY);
    }
  }

  const compOper = {
    default: 'source-over',
    sourceOver: 'source-over',
    sourceIn: 'source-in',
    sourceOut: 'source-out',
    sourceAtop: 'source-atop',
    destinationOver: 'destination-over',
    destinationIn: 'destination-in',
    destinationOut: 'destination-out',
    destinationAtop: 'destination-atop',
    lighter: 'lighter',
    copy: 'copy',
    xor: 'xor',
    multiply: 'multiply',
    screen: 'screen',
    overlay: 'overlay',
    darken: 'darken',
    lighten: 'lighten',
    colorDodge: 'color-dodge',
    colorBurn: 'color-burn',
    hardLight: 'hard-light',
    softLight: 'soft-light',
    difference: 'difference',
    exclusion: 'exclusion',
    hue: 'hue',
    saturation: 'saturation',
    color: 'color',
    luminosity: 'luminosity',
    source: {
      over: 'source-over',
      in: 'source-in',
      out: 'source-out',
      atop: 'source-atop'
    },
    destination: {
      over: 'destination-over',
      in: 'destination-in',
      out: 'destination-out',
      atop: 'destination-atop'
    },
    light: {
      hard: 'hard-light',
      soft: 'soft-light'
    }
  };

  function compositeOperation(type = compOper.default) {
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
    ctx.globalCompositeOperation = type;
  }

  // const filters = [
  // 		[ 'url', [ 'url' ] ],
  // 		[ 'blur', [ 'length' ] ],
  // 		[ 'brightness', [ 'percentage' ] ],
  // 		[ 'contrast', [ 'percentage' ] ]
  // 	];

  function filter(filterFuncs = 'none') {
    ctx.filter = filterFuncs;
  }

  function beginPath() {
    ctx.beginPath();
  }

  function moveTo(x, y) {
    if (typeof x === 'number') {
      ctx.moveTo(x, y);
    } else if ('x' in x) {
      ctx.moveTo(x.x, x.y);
    }
  }

  function lineTo(x, y) {
    if (typeof x === 'number') {
      ctx.lineTo(x, y);
    } else if ('x' in x) {
      ctx.lineTo(x.x, x.y);
    }
  }

  function quadraticCurveTo(cpX, cpY, x, y) {
    // ctx.quadraticCurveTo(cpX, cpY, x, y);
    let a = [];
    let b = [];
    if (typeof cpX === 'number') {
      a = [cpX, cpY];
      if (typeof x === 'number') {
        b = [x, y];
      } else if ('x' in x) {
        b = x.xy;
      }
    } else if ('x' in cpX) {
      a = cpX.xy;
      if (typeof cpY === 'number') {
        b = [cpY, x];
      } else if ('x' in cpY) {
        b = cpY.xy;
      }
    }
    ctx.quadraticCurveTo(a[0], a[1], b[0], b[1]);
  }

  function bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
    let a = [];
    let b = [];
    let c = [];
    if (typeof cp1X === 'number') {
      a = [cp1X, cp1Y];
      if (typeof cp2X === 'number') {
        b = [cp2X, cp2Y];
        if (typeof x === 'number') {
          c = [x, y];
        } else if ('x' in x) {
          c = x.xy;
        }
      } else if ('x' in cp2X) {
        b = cp2X.xy;
        if (typeof cp2Y === 'number') {
          c = [cp2Y, x];
        } else if ('x' in cp2Y) {
          c = cp2Y.xy;
        }
      }
    } else if ('x' in cp1X) {
      a = cp1X.xy;
      if (typeof cp1Y === 'number') {
        b = [cp1Y, cp2X];
        if (typeof cp2Y === 'number') {
          c = [cp2Y, x];
        } else if ('x' in cp2Y) {
          c = cp2Y.xy;
        }
      } else if ('x' in cp1Y) {
        b = cp1Y.xy;
        if (typeof cp2X === 'number') {
          c = [cp2X, cp2Y];
        } else if ('x' in cp2X) {
          c = cp2X.xy;
        }
      }
    }
    ctx.bezierCurveTo(a[0], a[1], b[0], b[1], c[0], c[1]);
  }

  function closePath() {
    ctx.closePath();
  }

  function point(x = 0, y = 0, r = 0, g = 0, b = 0, a = 255, doPut_ = true) {
    // let imgData = ctx.createImageData(1, 1);
    // imgData.data[0] = r;
    // imgData.data[1] = g;
    // imgData.data[2] = b;
    // imgData.data[3] = a;
    // if(doPut_) {
    // 	ctx.putImageData(imgData, x, y);
    // }
    // return imgData;
  }

  function line(x = 0, y = 0, x_ = 0, y_ = 0) {
    if (typeof x === 'number') {
      moveTo(x, y);
      lineTo(x_, y_);
    } else if ('x' in x) {
      moveTo(x);
      lineTo(y, x_);
    }
  }

  function vertices(...verts) {
    if (verts.length === 0) return;
    else if (verts.length === 1 && Array.isArray(verts[0])) {
      verts = verts[0];
    }
    for (let i = 0; i < verts.length; i++) {
      let n = verts[i];
      let x = 0;
      let y = 0;
      if (Array.isArray(n)) {
        [x, y] = n;
      } else if (n instanceof Vector || ('x' in n && 'y' in n)) {
        ({ x, y } = n);
      }
      lineTo(x, y);
    }
  }

  function arcTo(x1 = 0, y1 = 0, x2 = 0, y2 = 0, radius = 50) {
    ctx.arcTo(x1, y1, x2, y2, radius);
  }

  function rect(x = 0, y = 0, w = 10, h = w, r = 0) {
    if (r > 0) {
      moveTo(x + r, y);
      arcTo(x + w, y, x + w, y + h, r);
      arcTo(x + w, y + h, x, y + h, r);
      arcTo(x, y + h, x, y, r);
      arcTo(x, y, x + w, y, r);
      closePath();
    } else {
      ctx.rect(x, y, w, h);
    }
  }

  function arc(
    x = 0,
    y = 0,
    radius = 50,
    startAngle = 0,
    endAngle = Math.PI * 2,
    anticlockwise = false
  ) {
    if (radius < 0) radius = 0;
    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  }

  function circle(x = 0, y = undefined, rX = 20, rY = undefined) {
    if (typeof x !== 'number' && 'x' in x) {
      if (y !== undefined) {
        rX = y;
      }
      y = x.y;
      x = x.x;
    } else if (y === undefined) {
      y = 0;
    }
    if (typeof rX !== 'number' && 'x' in rX) {
      rY = rX.y;
      rX = rX.x;
    }
    ctx.moveTo(x + rX, y);
    if (rY !== undefined) {
      ellipse(x, y, rX, rY);
    } else {
      if (rX < 0) rX = 0;
      ctx.arc(x, y, rX, 0, TAU);
    }
  }

  function ellipse(
    x = 0,
    y = 0,
    rX = 50,
    rY = 50,
    rot = 0,
    angStart = 0,
    angEnd = Math.PI * 2,
    antiCw = false
  ) {
    if (rX < 0) rX = 0;
    if (rY < 0) rY = 0;
    ctx.ellipse(x, y, rX, rY, rot, angStart, angEnd, antiCw);
  }

  function regularPolygon(sides, radius = 50, rotation = 0) {
    let circumference = TAU * radius;
    let count = min(sides, circumference);
    for (let i = 0; i < count; i++) {
      let t = (i / count) * TAU + rotation;
      let x = cos(t) * radius;
      let y = sin(t) * radius;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
  }

  function genRegularPolygon(sides = 3, radius = 50, rotation = 0) {
    let iSizes = (1 / sides) * TAU;
    let data = {
      sides,
      radius,
      rotation,
      points: []
    };
    for (let i = 0; i < sides; i++) {
      let t = i * iSizes + rotation;
      let x = cos(t) * radius;
      let y = sin(t) * radius;
      let point = createVector(x, y);
      Object.assign(point, { i, t });
      data.points.push(point);
    }
    return data;
  }

  function getCodePenID() {
    if (_codepenIDRegex.test(window.location.href)) {
      return _codepenIDRegex.exec(window.location.href)[1];
    } else {
      let metas = document.getElementsByTagName('link');
      for (let i = 0; i < metas.length; i++) {
        let m = metas[i];
        if (m.getAttribute('rel') == 'canonical') {
          let id = _codepenIDRegex.exec(m.getAttribute('href'));
          if (id) {
            return id[1];
          }
        }
      }
    }
  }

  function isPreviewEmbed() {
    return location.href.includes('/fullcpgrid/');
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.src = url;
    });
  }

  loadImage.alca = function (urlPart) {
    return loadImage('https://alca.tv/static/' + urlPart);
  };

  loadImage.alca.pen = function (urlPart) {
    return loadImage.alca('codepen/' + urlPart);
  };

  loadImage.alca.pen._ = function (urlPart) {
    return loadImage.alca.pen(`pens/${getCodePenID()}/${urlPart}`);
  };

  function loadVideo(url) {
    return new Promise((resolve, reject) => {
      let vid = document.createElement('video');
      vid.crossOrigin = 'anonymous';
      vid.onloadeddata = () => resolve(vid);
      vid.preload = true;
      vid.muted = true;
      vid.src = url;
      vid.load();
    });
  }

  loadVideo.alca = function (urlPart) {
    return loadVideo('https://alca.tv/static/' + urlPart);
  };

  loadVideo.alca.pen = function (urlPart) {
    return loadVideo.alca('codepen/' + urlPart);
  };

  loadVideo.alca.pen._ = function (urlPart) {
    return loadVideo.alca.pen(`pens/${getCodePenID()}/${urlPart}`);
  };

  function loadData(url) {
    return fetch(url);
  }

  loadData.alca = function (urlPart) {
    return loadData('https://alca.tv/static/' + urlPart);
  };

  function loadText(url) {
    return loadData(url).then((res) => res.text());
  }

  loadText.alca = function (urlPart) {
    return loadText('https://alca.tv/static/' + urlPart);
  };

  function loadJSON(url) {
    return loadData(url).then((res) => res.json());
  }

  loadJSON.alca = function (urlPart) {
    return loadJSON('https://alca.tv/static/' + urlPart);
  };

  function getImageData(img, ...args) {
    if (img instanceof Image) {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      Object.assign(canvas, { width: img.width, height: img.height });
      ctx.drawImage(img, 0, 0);
      let data;
      if (args.length) {
        data = ctx.getImageData(...args);
      } else {
        data = ctx.getImageData(0, 0, img.width, img.height);
      }
      return Object.assign(data, { canvas, ctx });
    } else {
      return ctx.getImageData(img, ...args);
    }
  }

  function xyToI(x, y, w, h) {
    if (typeof x !== 'number' && 'x' in x) {
      h = w;
      w = y;
      ({ x, y } = x);
    }
    if (w === undefined) w = 1;
    // if(h === undefined) h = Infinity;
    return x + w * y;
  }

  function iToXY(i, w, h) {
    return createVector(i % w, floor(i / w));
  }

  function random(low = 1, high = null) {
    if (Array.isArray(low)) {
      return low[floor(Math.random() * low.length)];
    }
    if (high === null) {
      return Math.random() * low;
    }
    return Math.random() * (high - low) + low;
  }

  let _randomGaussianPrevious = false;
  let _randomGaussianY2 = 0;

  // https://github.com/processing/p5.js/blob/5a46133fdc3e8c42fda1c1888864cf499940d86d/src/math/random.js#L166
  // Offset, deviation
  function randomGaussian(mean = 0, sd = 1) {
    let y1, x1, x2, w;
    if (_randomGaussianPrevious) {
      y1 = _randomGaussianY2;
      _randomGaussianPrevious = false;
    } else {
      do {
        x1 = random(2) - 1;
        x2 = random(2) - 1;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1);
      w = sqrt((-2 * log(w)) / w);
      y1 = x1 * w;
      _randomGaussianY2 = x2 * w;
      _randomGaussianPrevious = true;
    }
    return y1 * (sd || 1) + mean;
  }

  function map(n, a, b, c, d) {
    return ((n - a) * (d - c)) / (b - a) + c;
  }

  function constrain(n, mn, mx) {
    return max(mn, min(mx, n));
  }

  function lerp(start, stop, amt = 0.5) {
    if (typeof start !== 'number') {
      return Vector.lerp(start, stop, amt);
    }
    return amt * (stop - start) + start;
  }

  function _distSq(x1, y1, x2, y2) {
    let _x = x2 - x1;
    let _y = y2 - y1;
    return _x * _x + _y * _y;
  }

  function distSq(x1, y1, x2, y2) {
    if (
      x1 === undefined ||
      y1 === undefined ||
      x2 === undefined ||
      y2 === undefined
    ) {
      return 0;
    } else if (typeof x1 === 'number') {
      if (x1 === x1) {
        return _distSq(x1, y1, x2, y2);
      }
      return 0;
    } else if ('x' in x1) {
      return _distSq(x1.x, x1.y, y1.x, y1.y);
    }
    return 0;
  }

  function dist(x1, y1, x2, y2) {
    let d = distSq(x1, y1, x2, y2);
    if (d === 0) {
      return 0;
    }
    return sqrt(d);
  }

  function cos(input, mult = null) {
    let c = Math.cos(input % TAU);
    if (mult === null) {
      return c;
    }
    return c * mult;
  }

  function sin(input, mult = null) {
    let s = Math.sin(input % TAU);
    if (mult === null) {
      return s;
    }
    return s * mult;
  }

  function createVector(x, y, z) {
    return new Vector(x, y, z);
  }

  class Vector {
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    toString() {
      let { x, y, z } = this;
      return `{ x: ${x}, y: ${y}, z: ${z} }`;
    }

    static center() {
      return createVector(width_half, height_half);
    }

    static from(v, ...args) {
      if (v === undefined) {
        return createVector();
      } else if (Array.isArray(v)) {
        return createVector(...v);
      } else if (typeof v === 'object') {
        return createVector(v.x, v.y, v.z);
      } else if (typeof v === 'number') {
        return createVector(v, ...args);
      }
    }

    static fromAngle(angle, mult = 1) {
      let v = createVector(cos(angle), sin(angle));
      if (mult !== 1) v.mult(mult);
      return v;
    }

    static random2D(angle = true, mult = 1) {
      let v;
      if (angle === true) {
        v = Vector.fromAngle(random(TAU));
      } else {
        v = createVector(random(-1, 1), random(-1, 1));
      }
      if (typeof angle === 'number') {
        v.mult(angle);
      } else if (mult !== 1) {
        v.mult(mult);
      }
      return v;
    }

    static lerp(start, stop, amt = 0.5, apply = false) {
      let x = start.x === stop.x ? start.x : lerp(start.x, stop.x, amt);
      let y = start.y === stop.y ? start.y : lerp(start.y, stop.y, amt);
      let z =
        start.z === undefined
          ? stop.z === undefined
            ? 0
            : stop.z
          : start.z === stop.z
          ? start.z
          : lerp(start.z, stop.z, amt);
      if (apply) {
        return start.set(x, y, z);
      }
      return createVector(x, y, z);
    }

    get xy() {
      return [this.x, this.y];
    }
    get yx() {
      return [this.y, this.x];
    }
    get xz() {
      return [this.x, this.z];
    }
    get zx() {
      return [this.z, this.x];
    }
    get yz() {
      return [this.y, this.z];
    }
    get zy() {
      return [this.z, this.y];
    }
    get xyz() {
      return [this.x, this.y, this.z];
    }
    get xzy() {
      return [this.x, this.z, this.y];
    }
    get yxz() {
      return [this.y, this.x, this.z];
    }
    get yzx() {
      return [this.y, this.z, this.x];
    }
    get zyx() {
      return [this.z, this.y, this.x];
    }
    get zxy() {
      return [this.z, this.x, this.y];
    }

    get xyObject() {
      return { x: this.x, y: this.y };
    }
    get xzObject() {
      return { x: this.x, z: this.z };
    }
    get yzObject() {
      return { y: this.y, z: this.z };
    }
    get xyzObject() {
      return { x: this.x, y: this.y, z: this.z };
    }

    copy() {
      return createVector(this.x, this.y, this.z);
    }

    get _() {
      return this.copy();
    }

    equals(vec) {
      return this.x === vec.x && this.y === vec.y;
    }

    equals3D(vec = {}) {
      return this.x === vec.x && this.y === vec.y && this.z === vec.z;
    }

    draw() {
      point(this.x, this.y);
    }

    set(x = this.x, y = this.y, z = this.z) {
      if (x instanceof Vector) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        return this;
      }
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
    setX(x = this.x) {
      if (x instanceof Vector) {
        this.x = x.x;
        return this;
      }
      this.x = x;
      return this;
    }
    setY(y = this.y) {
      if (y instanceof Vector) {
        this.y = y.y;
        return this;
      }
      this.y = y;
      return this;
    }
    setZ(z = this.z) {
      if (z instanceof Vector) {
        this.z = z.z;
        return this;
      }
      this.z = z;
      return this;
    }
    setXY(x = this.x, y = this.y) {
      if (x instanceof Vector) {
        this.x = x.x;
        this.y = x.y;
        return this;
      }
      this.x = x;
      this.y = y;
      return this;
    }
    setYZ(y = this.y, z = this.z) {
      if (y instanceof Vector) {
        this.y = y.y;
        this.z = y.z;
        return this;
      }
      this.y = y;
      this.z = z;
      return this;
    }
    setXZ(x = this.x, z = this.y) {
      if (x instanceof Vector) {
        this.x = x.x;
        this.z = x.z;
        return this;
      }
      this.x = x;
      this.z = z;
      return this;
    }
    setZX(...args) {
      return this.setXZ(...args);
    }

    add(x = 0, y = x, z = 0) {
      if (x instanceof Vector) {
        this.x += x.x;
        this.y += x.y;
        this.z += x.z;
        return this;
      }
      this.x += x;
      this.y += y;
      this.z += z;
      return this;
    }
    addX(n = 0) {
      if (n instanceof Vector) {
        this.x += n.x;
        return this;
      }
      this.x += n;
      return this;
    }
    addY(n = 0) {
      if (n instanceof Vector) {
        this.y += n.y;
        return this;
      }
      this.y += n;
      return this;
    }
    addZ(n = 0) {
      if (n instanceof Vector) {
        this.z += n.z;
        return this;
      }
      this.z += n;
      return this;
    }
    sub(x = 0, y = x, z = 0) {
      if (x instanceof Vector) {
        this.x -= x.x;
        this.y -= x.y;
        this.z -= x.z;
        return this;
      }
      this.x -= x;
      this.y -= y;
      this.z -= z;
      return this;
    }
    subX(n = 0) {
      if (n instanceof Vector) {
        this.x -= n.x;
        return this;
      }
      this.x -= n;
      return this;
    }
    subY(n = 0) {
      if (n instanceof Vector) {
        this.y -= n.y;
        return this;
      }
      this.y -= n;
      return this;
    }
    subZ(n = 0) {
      if (n instanceof Vector) {
        this.z -= n.z;
        return this;
      }
      this.z -= n;
      return this;
    }
    mult(x = 1, y = x, z = x) {
      if (x instanceof Vector) {
        this.x *= x.x;
        this.y *= x.y;
        this.z *= x.z;
        return this;
      }
      this.x *= x;
      this.y *= y;
      this.z *= z;
      return this;
    }
    multX(n = 1) {
      if (n instanceof Vector) {
        this.x *= n.x;
        return this;
      }
      this.x *= n;
      return this;
    }
    multY(n = 1) {
      if (n instanceof Vector) {
        this.y *= n.y;
        return this;
      }
      this.y *= n;
      return this;
    }
    multZ(n = 1) {
      if (n instanceof Vector) {
        this.z *= n.z;
        return this;
      }
      this.z *= n;
      return this;
    }
    div(x = 1, y = x, z = x) {
      if (x instanceof Vector) {
        this.x /= x.x;
        this.y /= x.y;
        this.z /= x.z;
        return this;
      }
      this.x /= x;
      this.y /= y;
      this.z /= z;
      return this;
    }
    divX(n = 1) {
      if (n instanceof Vector) {
        this.x /= n.x;
        return this;
      }
      this.x /= n;
      return this;
    }
    divY(n = 1) {
      if (n instanceof Vector) {
        this.y /= n.y;
        return this;
      }
      this.y /= n;
      return this;
    }
    divZ(n = 1) {
      if (n instanceof Vector) {
        this.z /= n.z;
        return this;
      }
      this.z /= n;
      return this;
    }

    mod(x, y, z) {
      if (x === undefined) return this;
      else if (x instanceof Vector) {
        this.x %= x.x;
        this.y %= x.y;
        this.z %= x.z;
        return this;
      }
      this.x %= x;
      this.y %= y === undefined ? x : y;
      this.z %= z === undefined ? x : y;
      return this;
    }
    // TODO: modX, modY, modZ

    min(mX = this.x, mY = this.y, mZ = this.z) {
      if (mX instanceof Vector) {
        this.x = min(this.x, mX.x);
        this.y = min(this.y, mX.y);
        this.z = min(this.z, mX.z);
        return this;
      }
      this.x = min(this.x, mX);
      this.y = min(this.y, mY);
      this.z = min(this.z, mZ);
      return this;
    }
    max(mX = this.x, mY = this.y, mZ = this.z) {
      if (mX instanceof Vector) {
        this.x = max(this.x, mX.x);
        this.y = max(this.y, mX.y);
        this.z = max(this.z, mX.z);
        return this;
      }
      this.x = max(this.x, mX);
      this.y = max(this.y, mY);
      this.z = max(this.z, mZ);
      return this;
    }
    minX(n) {
      this.x = min(this.x, n instanceof Vector ? n.x : n);
      return this;
    }
    minY(n) {
      this.y = min(this.y, n instanceof Vector ? n.y : n);
      return this;
    }
    minZ(n) {
      this.z = min(this.z, n instanceof Vector ? n.z : n);
      return this;
    }
    maxX(n) {
      this.x = max(this.x, n instanceof Vector ? n.x : n);
      return this;
    }
    maxY(n) {
      this.y = max(this.y, n instanceof Vector ? n.y : n);
      return this;
    }
    maxZ(n) {
      this.z = max(this.z, n instanceof Vector ? n.z : n);
      return this;
    }

    heading() {
      return atan2(this.y, this.x);
    }
    rotate(a = 0) {
      // if(a === 0) {
      // 	return this;
      // }
      // let newHeading = this.heading() + a;
      // let mag = this.mag();
      // return this.set(cos(newHeading), sin(newHeading)).mult(mag);
      if (!a) {
        return this;
      }
      const c = cos(a);
      const s = sin(a);
      const { x, y } = this;
      this.x = x * c - y * s;
      this.y = x * s + y * c;
      return this;
    }
    rotateXY(a) {
      let v = new Vector(this.x, this.y).rotate(a);
      this.x = v.x;
      this.y = v.y;
      return this;
    }
    rotateYZ(a) {
      let v = new Vector(this.y, this.z).rotate(a);
      this.y = v.x;
      this.z = v.y;
      return this;
    }
    rotateZX(a) {
      let v = new Vector(this.z, this.x).rotate(a);
      this.z = v.x;
      this.x = v.y;
      return this;
    }
    magSq() {
      return this.x * this.x + this.y * this.y;
    }
    magSq3D() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    mag() {
      return Math.sqrt(this.magSq());
      // return hypot(this.x, this.y);
    }
    mag3D() {
      return Math.sqrt(this.magSq3D());
      // return hypot(this.x, this.y);
    }
    normalize(mag = this.mag()) {
      return mag === 0 ? this : this.div(mag);
    }
    normalize3D(mag = this.mag3D()) {
      return mag === 0 ? this : this.div(mag);
    }
    setMag(mag) {
      return this.normalize().mult(mag);
    }
    setMag3D(mag) {
      return this.normalize3D().mult(mag);
    }
    limit(max) {
      const magSq = this.magSq();
      if (magSq > max * max) {
        this.div(sqrt(magSq));
        this.mult(max);
      }
      return this;
    }
    limit3D(max) {
      const magSq = this.magSq3D();
      if (magSq > max * max) {
        this.div(sqrt(magSq));
        this.mult(max);
      }
      return this;
    }
    dot(x = 0, y = 0) {
      if (x instanceof Vector) {
        return this.dot(x.x, x.y);
      }
      return this.x * x + this.y * y;
    }
    dot3D(x = 0, y = 0, z = 0) {
      if (x instanceof Vector) {
        return this.dot(x.x, x.y, x.z);
      }
      return this.x * x + this.y * y + this.z * z;
    }
    dist(x, y) {
      if (x instanceof Vector) {
        return x.copy().sub(this).mag();
      } else if (typeof x === 'object' && 'x' in x) {
        ({ x, y } = x);
      }
      return dist(this.x, this.y, x, y);
    }
    dist3D(v) {
      return v.copy().sub(this).mag3D();
    }
    lerp(stop, amt) {
      return Vector.lerp(this, stop, amt, true);
    }
    round() {
      this.x = round(this.x);
      this.y = round(this.y);
      this.z = round(this.z);
      return this;
    }
    floor() {
      this.x = floor(this.x);
      this.y = floor(this.y);
      this.z = floor(this.z);
      return this;
    }
    fastFloor() {
      this.x = ~~this.x;
      this.y = ~~this.y;
      this.z = ~~this.z;
      return this;
    }
    ceil() {
      this.x = ceil(this.x);
      this.y = ceil(this.y);
      this.z = ceil(this.z);
      return this;
    }
  }

  // Robert Penner - http://gizma.com/easing/
  // t: Current time
  // b: Start value
  // c: Change in value
  // d: Duration

  function linearTween /* simple linear tweening    */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    return (c * t) / d + b;
  }
  function easeInQuad /* quadratic   easing in     */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    return c * t * t + b;
  }
  function easeOutQuad /* quadratic   easing out    */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    return -c * t * (t - 2) + b;
  }
  function easeInOutQuad /* quadratic   easing in/out */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d * 0.5;
    if (t < 1) return c * 0.5 * t * t + b;
    t--;
    return -c * 0.5 * (t * (t - 2) - 1) + b;
  }
  function easeInCubic /* cubic       easing in     */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    return c * t * t * t + b;
  }
  function easeOutCubic /* cubic       easing out    */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  }
  function easeInOutCubic /* cubic       easing in/out */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d * 0.5;
    if (t < 1) return c * 0.5 * t * t * t + b;
    t -= 2;
    return c * 0.5 * (t * t * t + 2) + b;
  }
  function easeInQuart /* quartic     easing in     */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    return c * t * t * t * t + b;
  }
  function easeOutQuart /* quartic     easing out    */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  }
  function easeInOutQuart /* quartic     easing in/out */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d * 0.5;
    if (t < 1) return c * 0.5 * t * t * t * t + b;
    t -= 2;
    return -c * 0.5 * (t * t * t * t - 2) + b;
  }
  function easeInQuint /* quintic     easing in     */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    return c * t * t * t * t * t + b;
  }
  function easeOutQuint /* quintic     easing out    */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
  }
  function easeInOutQuint /* quintic     easing in/out */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d * 0.5;
    if (t < 1) return c * 0.5 * t * t * t * t * t + b;
    t -= 2;
    return c * 0.5 * (t * t * t * t * t + 2) + b;
  }
  function easeInSine /* sinusoidal  easing in     */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    return -c * cos((t / d) * HALF_PI) + c + b;
  }
  function easeOutSine /* sinusoidal  easing out    */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    return c * sin((t / d) * HALF_PI) + b;
  }
  function easeInOutSine /* sinusoidal  easing in/out */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    return -c * 0.5 * (cos((PI * t) / d) - 1) + b;
  }
  function easeInExpo /* exponential easing in     */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    return c * pow(2, 10 * (t / d - 1)) + b;
  }
  function easeOutExpo /* exponential easing out    */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    return c * (-pow(2, (-10 * t) / d) + 1) + b;
  }
  function easeInOutExpo /* exponential easing in/out */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d * 0.5;
    if (t < 1) return c * 0.5 * pow(2, 10 * (t - 1)) + b;
    t--;
    return c * 0.5 * (-pow(2, -10 * t) + 2) + b;
  }
  function easeInCirc /* circular    easing in     */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    return -c * (sqrt(1 - t * t) - 1) + b;
  }
  function easeOutCirc /* circular    easing out    */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d;
    t--;
    return c * sqrt(1 - t * t) + b;
  }
  function easeInOutCirc /* circular    easing in/out */(
    t = 0.5,
    b = 0,
    c = 1,
    d = 1
  ) {
    t /= d * 0.5;
    if (t < 1) return -c * 0.5 * (sqrt(1 - t * t) - 1) + b;
    t -= 2;
    return c * 0.5 * (sqrt(1 - t * t) + 1) + b;
  }

  const ease = {
    linearTween,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint,
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInExpo,
    easeOutExpo,
    easeInOutExpo,
    easeInCirc,
    easeOutCirc,
    easeInOutCirc,
    in: {
      linear: linearTween,
      quad: easeInQuad,
      cubic: easeInCubic,
      quart: easeInQuart,
      quint: easeInQuint,
      sine: easeInSine,
      expo: easeInExpo,
      circ: easeInCirc
    },
    out: {
      linear: linearTween,
      quad: easeOutQuad,
      cubic: easeOutCubic,
      quart: easeOutQuart,
      quint: easeOutQuint,
      sine: easeOutSine,
      expo: easeOutExpo,
      circ: easeOutCirc
    },
    inOut: {
      linear: linearTween,
      quad: easeInOutQuad,
      cubic: easeInOutCubic,
      quart: easeInOutQuart,
      quint: easeInOutQuint,
      sine: easeInOutSine,
      expo: easeInOutExpo,
      circ: easeInOutCirc
    },
    linear: Object.assign(linearTween, {
      in: linearTween,
      out: linearTween,
      inOut: linearTween
    }),
    quad: { in: easeInQuad, out: easeOutQuad, inOut: easeInOutQuad },
    cubic: { in: easeInCubic, out: easeOutCubic, inOut: easeInOutCubic },
    quart: { in: easeInQuart, out: easeOutQuart, inOut: easeInOutQuart },
    quint: { in: easeInQuint, out: easeOutQuint, inOut: easeInOutQuint },
    sine: { in: easeInSine, out: easeOutSine, inOut: easeInOutSine },
    expo: { in: easeInExpo, out: easeOutExpo, inOut: easeInOutExpo },
    circ: { in: easeInCirc, out: easeOutCirc, inOut: easeInOutCirc }
  };

  function getTimeArray(timestamp = null) {
    if (timestamp === null) {
      timestamp = new Date();
    } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      let parsedTimestamp = Date.parse(timestamp);
      if (!isNaN(parsedTimestamp)) {
        timestamp = new Date(parsedTimestamp);
      } else {
        throw new RangeError('Invalid Date');
      }
    } else if (!(timestamp instanceof Date)) {
      throw new TypeError('Unsupported timestamp');
    }
    let arr = [
      timestamp.getHours(),
      timestamp.getMinutes(),
      timestamp.getSeconds(),
      timestamp.getMilliseconds()
    ];
    return arr;
  }

  function getTimeArrayPadded(...opts) {
    return getTimeArray(...opts).map((n) => `0${n}`.slice(-2));
  }

  function getTimeArraySmooth(...opts) {
    let arr = getTimeArray(...opts);
    let milliseconds = arr[3] / 1000;
    let seconds = (arr[2] + milliseconds) / 60;
    let minutes = (arr[1] + seconds) / 60;
    let hours = ((arr[0] % 12 || 12) + minutes) / 12;
    return [hours, minutes, seconds, milliseconds];
  }

  function loadWebFont(fontName) {
    if ('WebFont' in window === false) {
      return Promise.reject(
        'WebFont not available. Load using this script: https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js'
      );
    }
    if (fontName === '') {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      let options = { fontactive: resolve };
      let providers = {};
      if (typeof fontName === 'string') {
        providers = { google: { families: [fontName] } };
      } else if (Array.isArray(fontName)) {
        providers = { google: { families: fontName } };
      } else {
        providers = fontName;
      }
      Object.assign(options, providers);
      WebFont.load(options);
    });
  }

  function isFontDefault() {
    return ctx.font === '10px sans-serif';
  }

  function font(fontStr, fallbackIfDefault) {
    if (fontStr !== undefined) {
      ctx.font = fontStr;
      if (fallbackIfDefault !== undefined && isFontDefault()) {
        ctx.font = fallbackIfDefault;
      }
    }
    return ctx.font;
  }

  const particles = [];
  const padding = 100;

  function setup() {
    for (let i = 0; i < 10; i++) {
      const p = new Particle();
      particles.push(p);
    }
  }

  function draw(e) {
    // rotate(e * 0.0001);
    compositeOperation(compOper.lighter);
    // lineWidth(2);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      // if(p.dead) continue;
      if (p.dead) {
        particles.splice(i, 1);
        continue;
      }
      beginPath();
      circle(p.pos, 1);
      p.pos.add(p.vel);
      ctx.shadowColor = hsl(p.hue, 100, 70, 1);
      ctx.shadowBlur = 10;
      const t = (e - p.lastChanged) / 4000;
      fill(hsl(p.hue, 100, 60, 0.3));
      if (
        p.pos.x < -width_half - padding ||
        p.pos.x > width_half + padding ||
        p.pos.y < -height_half - padding ||
        p.pos.y > height_half + padding
      ) {
        if (p.splitable) {
          p.reset();
        } else {
          p.dead = true;
        }
      } else if (random(0.03, 1) < t) {
        p.lastChanged = e;
        p.pickDirection();
        if (particles.length < 300 && random(0.1, 1) < t) {
          const splitP = new Particle();
          splitP.splitable = false;
          splitP.pos.set(p.pos);
          splitP.vel.set(p.vel);
          splitP.pickDirection();
          particles.push(splitP);
        }
      }
    }
  }

  class Particle {
    constructor() {
      this.reset();
      this.splitable = true;
      this.dead = false;
    }
    reset() {
      this.lastChanged = performance.now();
      this.hue = random(130) + 180;
      this.pos = createVector(0, 0);
      this.vel = createVector(2, 0);
      this.pickDirection([-2, -1, 0, 1, 2, 3]);
    }
    pickDirection(range = [-1, 0, 1]) {
      this.vel.rotate(random(range) * THIRD_PI);
    }
  }
})();
(function () {
  let huhuiyu = {
    startAnimate(el) {
      el.innerHTML = '';
      let elCanvas = document.createElement('canvas');
      el.appendChild(elCanvas);
      init(elCanvas);
    }
  };
  window.huhuiyu_canvas07 = huhuiyu;

  function init(elCanvas) {
    canvas = elCanvas;
    ctx = canvas.getContext('2d');
    resize();
  }

  let canvas;
  let ctx;
  let width;
  let height;
  class Line {
    constructor(origin, size, length, color, style = 'pattern') {
      this.size = size;
      this.origin = origin;
      this.length = length;
      this.color = color;
      this.style = style;
      this.origin = `M${origin.x},${origin.y}`;
      this.offSet = 0;
      this.line = null;
      this.offSetSpeed = length / size;
    }
    getColorString() {
      return `hsla(${this.color.h}deg,${this.color.s}%,${this.color.l}%,${this.color.a})`;
    }
    generators() {
      return [
        {
          line: `h${this.size}`,
          mag: this.size
        },
        {
          line: `h-${this.size}`,
          mag: this.size
        },
        {
          line: `v${this.size}`,
          mag: this.size
        },
        {
          line: `v-${this.size}`,
          mag: this.size
        },
        {
          line: `l${this.size},${this.size}`,
          mag: Math.hypot(this.size, this.size)
        },
        {
          line: `l${this.size}-${this.size}`,
          mag: Math.hypot(this.size, this.size)
        },
        {
          line: `l-${this.size},${this.size}`,
          mag: Math.hypot(this.size, this.size)
        },
        {
          line: `l-${this.size}-${this.size}`,
          mag: Math.hypot(this.size, this.size)
        }
      ];
    }
    generate() {
      let segments = this.generators(this.size);
      let path = this.origin;
      let mag = 0;
      let fragment;
      let i;
      for (i = 0; i < this.length; i += 1) {
        fragment = segments[(Math.random() * segments.length) | 0];
        path += ` ${fragment.line}`;
        mag += fragment.mag;
      }
      this.line = {
        path,
        mag
      };
      return this;
    }
    renderStyle(style) {
      if (style === 'glitches') {
        ctx.lineDashOffset = this.line.mag + this.offSet;
        ctx.setLineDash([
          this.size ** 1.5,
          (this.line.mag / this.length) * this.size ** 2
        ]);
        this.offSet += 20;
        // this.size / (this.size ** 2);
        ctx.lineWidth = 2;
        return this;
      }
      if (style === 'pattern') {
        ctx.lineDashOffset = this.line.mag - this.offSet;
        ctx.setLineDash([this.line.mag, this.line.mag]);
        this.offSet += 10;
        //this.size / (this.size ** 100);
        ctx.lineWidth = 0.2;
      }
    }
    mutatePath() {
      let lineFragment = this.line.path.split(' ').slice(1);
      let generator = this.generators();
      lineFragment[(Math.random() * lineFragment.length) | 0] =
        generator[(Math.random() * generator.length) | 0].line;
      this.line.path = `${this.line.path.split(' ')[0]} ${lineFragment.join(
        ' '
      )}`;
    }
    draw() {
      !this.line && this.generate();

      ctx.strokeStyle = this.getColorString();
      this.renderStyle(this.style);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke(new Path2D(this.line.path));
      return this;
    }
  }
  function clear() {
    ctx.fillStyle = `hsla(200deg, 20%, 10%, 0.3)`;
    ctx.fillRect(0, 0, width, height);
  }
  function generateLines(amount) {
    let lines = [];
    let styles = [
      {
        size: 1.25,
        style: 'pattern',
        color: { h: 210, s: 100, l: 70, a: 0.5 }
      },
      { size: 2.5, style: 'pattern', color: { h: 190, s: 90, l: 50, a: 0.3 } },
      { size: 5, style: 'pattern', color: { h: 210, s: 70, l: 60, a: 0.2 } },
      { size: 10, style: 'pattern', color: { h: 310, s: 80, l: 55, a: 0.15 } },
      { size: 20, style: 'pattern', color: { h: 200, s: 25, l: 35, a: 0.12 } },
      { size: 20, style: 'pattern', color: { h: 210, s: 20, l: 40, a: 0.12 } },
      { size: 40, style: 'pattern', color: { h: 190, s: 40, l: 50, a: 0.12 } },
      { size: 80, style: 'pattern', color: { h: 220, s: 50, l: 60, a: 0.12 } },
      { size: 40, style: 'glitches', color: { h: 300, s: 100, l: 50, a: 0.3 } },
      { size: 20, style: 'glitches', color: { h: 210, s: 100, l: 50, a: 0.3 } },
      { size: 60, style: 'glitches', color: { h: 30, s: 100, l: 50, a: 0.3 } }
    ];
    for (let i = 0; i < amount; i += 1) {
      let style = styles[(Math.random() ** 2 * styles.length) | 0];
      lines.push(
        new Line(
          { x: width * 0.5, y: height * 0.5 },
          style.size,
          500 + Math.random() * 1000,
          style.color,
          style.style
        )
      );
    }
    return lines;
  }
  let id;
  function resize() {
    id = cancelAnimationFrame(id);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const lines = generateLines(40);
    function update() {
      if (!(id % 3)) {
        clear();
        lines.forEach((line) => {
          line.draw();
          if (!(id % 5) && Math.random() > 0.95) {
            line.mutatePath();
          }
        });
      }
      id = requestAnimationFrame(update);
    }
    id = requestAnimationFrame(update);
  }
  window.addEventListener('resize', resize, {
    passive: true
  });
})();
