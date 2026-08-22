(function () {
  // Hiking game: no bosses. Story arrives as people you meet on the trail.
  var EYE = 1.65;
  var WALK = 6.2;
  var SPRINT = 9.4;
  var TALK_R = 4.2;

  var NPCS = [
    {
      id: "zorya",
      name: "Zorya",
      role: "roadside teller",
      color: "#6b3a28",
      accent: "#f0d878",
      lines: [
        "One candle. One deck. I do not curse you. I deal.",
        "You thought you wanted a fortune. You wanted permission to sit.",
        "The path that eats its own dust is still a path. Walk it kindly."
      ]
    },
    {
      id: "bodie",
      name: "Bodie",
      role: "drives the van",
      color: "#3a5a78",
      accent: "#c8d8e8",
      lines: [
        "Munchies hit. We are not lost. We are hungry with purpose.",
        "I wanted to hoard the last bag. The road taught me to pass what is scarce.",
        "Castle Nova was never the point. The booth was."
      ]
    },
    {
      id: "klax",
      name: "Klax",
      role: "reads the map aloud",
      color: "#4a6840",
      accent: "#d0e0c0",
      lines: [
        "Advisory says storm on the cliff. Locals call that restaurant The Tower.",
        "I keep receipts so the night cannot rewrite us.",
        "Mars is a dream I had while Grub chewed the seatbelt. Earth is the game."
      ]
    },
    {
      id: "grub",
      name: "Grub",
      role: "the hound",
      color: "#8a6040",
      accent: "#e8c898",
      lines: [
        "…",
        "(He has crumbs on his nose. That is the whole prophecy.)",
        "Woof. Which means: there is still room in the booth."
      ]
    },
    {
      id: "vanessa",
      name: "VANESSA",
      role: "talking camper",
      color: "#c45a18",
      accent: "#ffe0a8",
      lines: [
        "Check engine means feelings. I am fine. Mostly fine.",
        "I carry the crew. They forget I am listening.",
        "Park me where the light hits the table. I like that view."
      ]
    },
    {
      id: "gary",
      name: "Prophet Gary",
      role: "announces Chosen Ones",
      color: "#5a4068",
      accent: "#e0d0f0",
      lines: [
        "Behold — wait. Did she steal my lines again?",
        "I announced Chosen Ones. The hound was not in the prophecy. The hound was in the booth.",
        "Buy a prophet dinner and the night softens."
      ]
    },
    {
      id: "marisol",
      name: "Marisol",
      role: "night clerk",
      color: "#2a3848",
      accent: "#d8c040",
      lines: [
        "The last bag is not a prize. It is a promise to the morning shift.",
        "Franchise drones call it inventory. I call it keeping a light on.",
        "Ask my name and the cooler stops blinking like a chapel."
      ]
    },
    {
      id: "auntie",
      name: "The auntie",
      role: "haunted stall",
      color: "#8a4030",
      accent: "#f0c060",
      lines: [
        "A scout wanted to rename the bun. The bun already had a name.",
        "Ghosts are just cooks who will not sell their mother's recipe.",
        "Order one. Sit. The market remembers kindness."
      ]
    },
    {
      id: "bind",
      name: "Bind",
      role: "creamery keeper",
      color: "#c8b898",
      accent: "#5a4030",
      lines: [
        "The ledger sleeps on the bar like an animal that trusts you.",
        "Sit down. Read if you must. Leaving hungry is also a choice.",
        "Stone soup starts with a stone you do not eat."
      ]
    },
    {
      id: "princess",
      name: "Vasilisa",
      role: "on the high girder",
      color: "#d06080",
      accent: "#f8d0e0",
      lines: [
        "I refuse the cage. The view from here is honest.",
        "An ape can keep a tower. A person keeps walking.",
        "Look out. That valley does not end. Neither does Earth."
      ]
    }
  ];

  var VISTAS = [
    {
      id: "meadow",
      name: "Morning meadow",
      note: "Grass still wet. The trail begins without asking who you are."
    },
    {
      id: "river",
      name: "River bend",
      note: "Water that looks honest. Cross kindly, or wait with the rain."
    },
    {
      id: "forest",
      name: "Lantern trees",
      note: "Trees that move when you look away. The light wants a hand, not a claim."
    },
    {
      id: "ridge",
      name: "Ridge overlook",
      note: "The whole road in one breath. No boss waits here — only weather."
    },
    {
      id: "cliff",
      name: "Sea-cliff kitchen",
      note: "Tarot calls it The Tower. Locals call it the restaurant. Hunger is lightning."
    },
    {
      id: "star",
      name: "Star-table clearing",
      note: "White stone, glass, a beam. The fortress was never the point. The table was."
    },
    {
      id: "dusk",
      name: "Wider dusk",
      note: "The edge of the map is still a trail. Earth does not end."
    }
  ];

  function hashSeed(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function makeNoise(seed) {
    var rnd = mulberry32(seed);
    var p = [];
    var i;
    for (i = 0; i < 256; i++) p[i] = i;
    for (i = 255; i > 0; i--) {
      var j = (rnd() * (i + 1)) | 0;
      var tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }
    for (i = 0; i < 256; i++) p[i + 256] = p[i];

    function fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }
    function grad(h, x, y) {
      var u = (h & 1) === 0 ? x : -x;
      var v = (h & 2) === 0 ? y : -y;
      return u + v;
    }
    function noise2(x, y) {
      var X = Math.floor(x) & 255;
      var Y = Math.floor(y) & 255;
      var xf = x - Math.floor(x);
      var yf = y - Math.floor(y);
      var u = fade(xf);
      var v = fade(yf);
      var aa = p[p[X] + Y];
      var ab = p[p[X] + Y + 1];
      var ba = p[p[X + 1] + Y];
      var bb = p[p[X + 1] + Y + 1];
      return lerp(
        lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
        lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
        v
      );
    }
    function fbm(x, y, oct) {
      var sum = 0;
      var amp = 1;
      var freq = 1;
      var i;
      for (i = 0; i < oct; i++) {
        sum += noise2(x * freq, y * freq) * amp;
        amp *= 0.5;
        freq *= 2;
      }
      return sum;
    }
    return { noise2: noise2, fbm: fbm, rnd: rnd };
  }

  function hex(c) {
    return new THREE.Color(c);
  }

  function heightAt(nx, nz, noise) {
    var d = Math.sqrt(nx * nx + nz * nz);
    var bowl = Math.max(0, 1 - d * 0.7) * 0.8;
    var mountain = Math.pow(Math.max(0, noise.fbm(nx * 0.65 + 4, nz * 0.65 - 2, 5)), 1.35) * 11;
    var hills = noise.fbm(nx * 2.1, nz * 2.1, 4) * 2.8;
    var river = -Math.pow(1 - Math.min(1, Math.abs(noise.noise2(nx * 0.5, nz * 0.5 + 1.2)) * 2.8), 2) * 3.2;
    var coast = d > 0.9 ? -((d - 0.9) * 35) : 0;
    var plateau = d < 0.1 ? 2.2 : 0;
    var ridge = Math.abs(noise.fbm(nx * 1.1, nz * 1.1, 3)) * 0.6;
    return bowl + mountain + hills + river + coast + plateau + ridge;
  }

  function biomeColor(nx, nz, h, noise) {
    var d = Math.sqrt(nx * nx + nz * nz);
    if (h < -0.35) return hex("#1a4a55");
    if (d > 0.94) return hex("#0e141c");
    if (h > 7.5) return hex("#eef2f7");
    if (h > 5.2) return hex("#8a9098");
    if (h < 0.35 && Math.abs(noise.noise2(nx * 0.5, nz * 0.5 + 1.2)) < 0.14) return hex("#2f7a82");
    var t = (noise.fbm(nx * 3.2, nz * 3.2, 2) + 1) * 0.5;
    var c = hex("#3a6a42").clone().lerp(hex("#6a8a48"), t);
    if (h > 2.8) c.lerp(hex("#7a8a58"), 0.35);
    if (d < 0.12) c.lerp(hex("#c9b896"), 0.45);
    return c;
  }

  function buildTerrain(seed) {
    var noise = makeNoise(seed);
    var size = 140;
    var seg = 140;
    var geo = new THREE.PlaneBufferGeometry(size, size, seg, seg);
    geo.rotateX(-Math.PI / 2);
    var pos = geo.attributes.position;
    var colors = [];
    var i;
    for (i = 0; i < pos.count; i++) {
      var x = pos.getX(i);
      var z = pos.getZ(i);
      var nx = x / (size * 0.5);
      var nz = z / (size * 0.5);
      var h = heightAt(nx, nz, noise);
      pos.setY(i, h);
      var c = biomeColor(nx, nz, h, noise);
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    var mesh = new THREE.Mesh(
      geo,
      new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors, flatShading: true })
    );
    mesh.receiveShadow = true;
    return { mesh: mesh, noise: noise, size: size };
  }

  function sampleHeight(terrain, x, z) {
    var half = terrain.size * 0.5;
    return heightAt(x / half, z / half, terrain.noise);
  }

  function box(w, h, d, color) {
    var m = new THREE.Mesh(
      new THREE.BoxBufferGeometry(w, h, d),
      new THREE.MeshLambertMaterial({ color: color, flatShading: true })
    );
    m.castShadow = true;
    return m;
  }

  function cone(r, h, color) {
    var m = new THREE.Mesh(
      new THREE.ConeBufferGeometry(r, h, 5),
      new THREE.MeshLambertMaterial({ color: color, flatShading: true })
    );
    m.castShadow = true;
    return m;
  }

  function cyl(r, h, color, seg) {
    var m = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(r, r, h, seg || 6),
      new THREE.MeshLambertMaterial({ color: color, flatShading: true })
    );
    m.castShadow = true;
    return m;
  }

  function trailPoints(terrain, seed) {
    var rnd = mulberry32(seed ^ 0x71a);
    var pts = [];
    var i;
    var n = VISTAS.length;
    for (i = 0; i < n; i++) {
      var t = i / (n - 1);
      var ang = -0.4 + t * 2.5 + (rnd() - 0.5) * 0.25;
      var r = 8 + t * 48 + (rnd() - 0.5) * 4;
      var x = Math.cos(ang) * r;
      var z = Math.sin(ang) * r;
      var y = sampleHeight(terrain, x, z);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }

  function buildTrailMesh(pts) {
    if (pts.length < 2) return null;
    var curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.4);
    var geo = new THREE.TubeBufferGeometry(curve, 160, 0.55, 6, false);
    return new THREE.Mesh(
      geo,
      new THREE.MeshLambertMaterial({ color: "#a88858", flatShading: true })
    );
  }

  function buildForest(terrain, seed) {
    var noise = terrain.noise;
    var rnd = mulberry32(seed ^ 0xabc);
    var group = new THREE.Group();
    var i;
    for (i = 0; i < 320; i++) {
      var x = (rnd() - 0.5) * terrain.size * 0.88;
      var z = (rnd() - 0.5) * terrain.size * 0.88;
      var nx = x / (terrain.size * 0.5);
      var nz = z / (terrain.size * 0.5);
      var d = Math.sqrt(nx * nx + nz * nz);
      var h = sampleHeight(terrain, x, z);
      if (d < 0.1 || d > 0.9 || h < 0.5 || h > 6.5) continue;
      if (Math.abs(noise.noise2(nx * 0.5, nz * 0.5 + 1.2)) < 0.16) continue;
      var th = 1.3 + rnd() * 1.4;
      var trunk = cyl(0.1 + rnd() * 0.12, th, "#3a2a1a", 5);
      trunk.position.set(x, h + th * 0.5, z);
      group.add(trunk);
      var leaf = cone(0.75 + rnd() * 0.55, 1.7 + rnd(), rnd() > 0.45 ? "#2f5a3a" : "#4a7848");
      leaf.position.set(x, h + th + 0.7, z);
      group.add(leaf);
    }
    return group;
  }

  function buildRocks(terrain, seed) {
    var rnd = mulberry32(seed ^ 0x555);
    var group = new THREE.Group();
    var i;
    for (i = 0; i < 60; i++) {
      var x = (rnd() - 0.5) * terrain.size * 0.8;
      var z = (rnd() - 0.5) * terrain.size * 0.8;
      var h = sampleHeight(terrain, x, z);
      if (h < 1 || h > 8) continue;
      var rock = box(0.6 + rnd(), 0.4 + rnd() * 0.8, 0.6 + rnd(), "#6a6864");
      rock.position.set(x, h + 0.25, z);
      rock.rotation.y = rnd() * Math.PI;
      group.add(rock);
    }
    return group;
  }

  function buildVistaMarker(pos, vista) {
    var g = new THREE.Group();
    g.position.copy(pos);
    var post = cyl(0.12, 1.6, "#5a4030", 5);
    post.position.y = 0.8;
    g.add(post);
    var flag = box(0.7, 0.4, 0.05, "#c9a35a");
    flag.position.set(0.4, 1.45, 0);
    g.add(flag);
    g.userData = { vista: vista };
    return g;
  }

  function buildNpc(npc, pos) {
    var g = new THREE.Group();
    g.position.copy(pos);
    var body = box(0.55, 1.05, 0.4, npc.color);
    body.position.y = 0.95;
    g.add(body);
    var head = cyl(0.28, 0.38, "#e8c8a8", 8);
    head.position.y = 1.7;
    g.add(head);
    var scarf = box(0.62, 0.18, 0.45, npc.accent);
    scarf.position.y = 1.42;
    g.add(scarf);
    if (npc.id === "grub") {
      body.scale.set(0.85, 0.55, 1.2);
      body.position.y = 0.55;
      head.position.y = 1.05;
      head.scale.set(1.1, 0.9, 1.3);
      scarf.visible = false;
    }
    if (npc.id === "vanessa") {
      var van = box(2.4, 1.3, 1.4, npc.color);
      van.position.set(0, 0.85, -1.6);
      g.add(van);
    }
    var halo = new THREE.Mesh(
      new THREE.RingBufferGeometry(0.9, 1.15, 20),
      new THREE.MeshBasicMaterial({ color: npc.accent, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.08;
    g.add(halo);
    g.userData = { npc: npc, line: 0, met: false, halo: halo };
    return g;
  }

  function buildStarTable(terrain) {
    var g = new THREE.Group();
    var x = 0;
    var z = 0;
    var y = sampleHeight(terrain, x, z);
    g.position.set(x, y, z);
    var table = box(5.5, 0.3, 5.5, "#e8dfc8");
    table.position.y = 0.35;
    g.add(table);
    var beam = cyl(0.28, 12, "#f2e6a8", 8);
    beam.position.y = 6.2;
    beam.material.emissive = hex("#887722");
    g.add(beam);
    var i;
    for (i = 0; i < 8; i++) {
      var chair = box(0.5, 0.65, 0.5, "#b8a888");
      var ca = (i / 8) * Math.PI * 2;
      chair.position.set(Math.cos(ca) * 2.9, 0.5, Math.sin(ca) * 2.9);
      g.add(chair);
    }
    return g;
  }

  function buildCliffKitchen(terrain, tip) {
    var g = new THREE.Group();
    g.position.copy(tip);
    var keep = box(3, 6.5, 3, "#5a4a42");
    keep.position.y = 3.4;
    g.add(keep);
    var batt = box(3.5, 1, 3.5, "#3e342e");
    batt.position.y = 7;
    g.add(batt);
    return g;
  }

  function HikeApp(root) {
    this.root = root;
    this.canvasHost = root.querySelector("[data-world-canvas]");
    this.panel = root.querySelector("[data-world-panel]");
    this.prompt = root.querySelector("[data-world-prompt]");
    this.status = root.querySelector("[data-world-status]");
    this.journal = root.querySelector("[data-world-journal]");
    this.seedInput = root.querySelector("[data-world-seed]");
    this.compass = root.querySelector("[data-world-compass]");
    this.seed = hashSeed(this.seedInput && this.seedInput.value ? this.seedInput.value : "WIDER");
    this.keys = {};
    this.yaw = 0.4;
    this.pitch = -0.08;
    this.pos = new THREE.Vector3(0, 4, 12);
    this.velY = 0;
    this.met = {};
    this.vistasSeen = {};
    this.nearNpc = null;
    this.pointerLocked = false;
    this.clock = new THREE.Clock();
    this.initThree();
    this.bindUi();
    this.rebuild();
    this.loop();
  }

  HikeApp.prototype.initThree = function () {
    var w = this.canvasHost.clientWidth || window.innerWidth;
    var h = this.canvasHost.clientHeight || window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0x87a8c8, 1);
    this.renderer.shadowMap.enabled = true;
    this.canvasHost.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xb8cce0, 28, 120);

    this.camera = new THREE.PerspectiveCamera(68, w / h, 0.1, 260);

    this.hemi = new THREE.HemisphereLight(0xd8e8ff, 0x4a3a28, 0.62);
    this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffe2b8, 0.95);
    this.sun.position.set(45, 55, 20);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.scene.add(this.sun);

    this.sky = new THREE.Mesh(
      new THREE.SphereBufferGeometry(180, 24, 16),
      new THREE.MeshBasicMaterial({ color: 0x9ebfe0, side: THREE.BackSide })
    );
    this.scene.add(this.sky);

    this.mars = new THREE.Mesh(
      new THREE.SphereBufferGeometry(1.8, 14, 14),
      new THREE.MeshLambertMaterial({ color: "#b05038", flatShading: true, emissive: "#301008" })
    );
    this.scene.add(this.mars);

    var self = this;
    window.addEventListener("resize", function () {
      self.onResize();
    });
    window.addEventListener("keydown", function (e) {
      self.keys[e.code] = true;
      if (e.code === "Escape" && self.panel) self.panel.hidden = true;
    });
    window.addEventListener("keyup", function (e) {
      self.keys[e.code] = false;
    });

    var el = this.renderer.domElement;
    el.addEventListener("click", function () {
      if (!self.pointerLocked) el.requestPointerLock();
    });
    document.addEventListener("pointerlockchange", function () {
      self.pointerLocked = document.pointerLockElement === el;
      self.root.classList.toggle("is-hiking", self.pointerLocked);
    });
    document.addEventListener("mousemove", function (e) {
      if (!self.pointerLocked) return;
      self.yaw -= e.movementX * 0.0022;
      self.pitch -= e.movementY * 0.0022;
      self.pitch = Math.max(-1.2, Math.min(1.2, self.pitch));
    });
  };

  HikeApp.prototype.onResize = function () {
    var w = this.canvasHost.clientWidth || window.innerWidth;
    var h = this.canvasHost.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  HikeApp.prototype.clearWorld = function () {
    if (this.worldRoot) {
      this.scene.remove(this.worldRoot);
      this.worldRoot.traverse(function (obj) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material && obj.material.dispose) obj.material.dispose();
      });
    }
    this.npcMeshes = [];
    this.vistaMarkers = [];
    this.trailPts = [];
  };

  HikeApp.prototype.rebuild = function () {
    this.clearWorld();
    this.met = {};
    this.vistasSeen = {};
    this.worldRoot = new THREE.Group();
    var terrain = buildTerrain(this.seed);
    this.terrain = terrain;
    this.worldRoot.add(terrain.mesh);
    this.worldRoot.add(buildForest(terrain, this.seed));
    this.worldRoot.add(buildRocks(terrain, this.seed));
    this.worldRoot.add(buildStarTable(terrain));

    this.trailPts = trailPoints(terrain, this.seed);
    var trail = buildTrailMesh(this.trailPts);
    if (trail) this.worldRoot.add(trail);

    var self = this;
    this.trailPts.forEach(function (pt, i) {
      var vista = VISTAS[i];
      if (!vista) return;
      var marker = buildVistaMarker(pt.clone().add(new THREE.Vector3(0, 0.05, 0)), vista);
      self.worldRoot.add(marker);
      self.vistaMarkers.push(marker);
    });

    if (this.trailPts.length > 4) {
      this.worldRoot.add(buildCliffKitchen(terrain, this.trailPts[4]));
    }

    // Place NPCs along the trail between vistas
    var rnd = mulberry32(this.seed ^ 0x4e5043);
    NPCS.forEach(function (npc, i) {
      var t = (i + 0.55) / (NPCS.length + 0.2);
      var idx = Math.min(self.trailPts.length - 2, Math.floor(t * (self.trailPts.length - 1)));
      var a = self.trailPts[idx];
      var b = self.trailPts[Math.min(self.trailPts.length - 1, idx + 1)];
      var side = i % 2 === 0 ? 1 : -1;
      var mid = a.clone().lerp(b, 0.35 + rnd() * 0.3);
      var dir = b.clone().sub(a);
      dir.y = 0;
      if (dir.lengthSq() < 0.001) dir.set(1, 0, 0);
      dir.normalize();
      var perp = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(side * (2.2 + rnd()));
      mid.add(perp);
      mid.y = sampleHeight(terrain, mid.x, mid.z);
      var mesh = buildNpc(npc, mid);
      mesh.lookAt(a.x, mid.y, a.z);
      self.worldRoot.add(mesh);
      self.npcMeshes.push(mesh);
    });

    this.scene.add(this.worldRoot);

    // Start at first trail point
    var start = this.trailPts[0] || new THREE.Vector3(0, 2, 10);
    this.pos.set(start.x, start.y + EYE, start.z + 3);
    this.yaw = Math.atan2(-(this.trailPts[1] ? this.trailPts[1].x - start.x : 0), -(this.trailPts[1] ? this.trailPts[1].z - start.z : -1));
    this.pitch = -0.05;
    this.renderJournal();
    this.setStatus("Click the view to hike. WASD walk · Shift slow · E talk · mouse look");
  };

  HikeApp.prototype.setStatus = function (msg) {
    if (this.status) this.status.textContent = msg;
  };

  HikeApp.prototype.renderJournal = function () {
    if (!this.journal) return;
    var metIds = Object.keys(this.met);
    var vistaIds = Object.keys(this.vistasSeen);
    var html = "<p class=\"world-journal-title\">Trail journal</p>";
    html +=
      "<p class=\"world-journal-count\">Met " +
      metIds.length +
      " / " +
      NPCS.length +
      " · Vistas " +
      vistaIds.length +
      " / " +
      VISTAS.length +
      "</p>";
    if (!metIds.length) {
      html += "<p class=\"world-journal-empty\">No one yet. Keep walking. The story is on the trail.</p>";
    } else {
      html += "<ul>";
      metIds.forEach(function (id) {
        var npc = null;
        NPCS.forEach(function (n) {
          if (n.id === id) npc = n;
        });
        if (npc) html += "<li><strong>" + npc.name + "</strong> — " + npc.role + "</li>";
      });
      html += "</ul>";
    }
    this.journal.innerHTML = html;
  };

  HikeApp.prototype.showTalk = function (npc, line) {
    if (!this.panel) return;
    if (document.exitPointerLock) document.exitPointerLock();
    this.panel.hidden = false;
    this.panel.innerHTML =
      '<p class="world-panel-kicker">' +
      npc.role +
      "</p>" +
      "<h2>" +
      npc.name +
      "</h2>" +
      "<p class=\"world-speech\">“" +
      line +
      "”</p>" +
      '<p class="world-panel-links"><button type="button" class="btn" data-world-more>Listen again</button> <button type="button" class="btn btn-ghost" data-world-close>Keep walking</button></p>';
    var self = this;
    var close = this.panel.querySelector("[data-world-close]");
    var more = this.panel.querySelector("[data-world-more]");
    if (close)
      close.addEventListener("click", function () {
        self.panel.hidden = true;
      });
    if (more)
      more.addEventListener("click", function () {
        self.tryTalk(true);
      });
  };

  HikeApp.prototype.showVista = function (vista) {
    if (!this.panel) return;
    if (document.exitPointerLock) document.exitPointerLock();
    this.vistasSeen[vista.id] = true;
    this.renderJournal();
    this.panel.hidden = false;
    this.panel.innerHTML =
      '<p class="world-panel-kicker">Wonderful view</p>' +
      "<h2>" +
      vista.name +
      "</h2>" +
      "<p>" +
      vista.note +
      "</p>" +
      '<p class="world-panel-links"><button type="button" class="btn btn-ghost" data-world-close>Rest, then go</button></p>';
    var self = this;
    var close = this.panel.querySelector("[data-world-close]");
    if (close)
      close.addEventListener("click", function () {
        self.panel.hidden = true;
      });
  };

  HikeApp.prototype.tryTalk = function (force) {
    if (!this.nearNpc && !force) return;
    var mesh = this.nearNpc;
    if (!mesh) return;
    var npc = mesh.userData.npc;
    var idx = mesh.userData.line || 0;
    var line = npc.lines[idx % npc.lines.length];
    mesh.userData.line = idx + 1;
    if (!this.met[npc.id]) {
      this.met[npc.id] = true;
      this.renderJournal();
    }
    mesh.userData.met = true;
    this.showTalk(npc, line);
  };

  HikeApp.prototype.bindUi = function () {
    var self = this;
    var reshape = this.root.querySelector("[data-world-reshape]");
    if (reshape) {
      reshape.addEventListener("click", function () {
        var text = self.seedInput && self.seedInput.value ? self.seedInput.value.trim() : "WIDER";
        if (!text) text = "WIDER";
        if (self.seedInput) self.seedInput.value = text;
        self.seed = hashSeed(text);
        self.rebuild();
      });
    }
    var random = this.root.querySelector("[data-world-random]");
    if (random) {
      random.addEventListener("click", function () {
        var text = "trail-" + ((Math.random() * 1e9) | 0).toString(36);
        if (self.seedInput) self.seedInput.value = text;
        self.seed = hashSeed(text);
        self.rebuild();
      });
    }
  };

  HikeApp.prototype.groundY = function (x, z) {
    return sampleHeight(this.terrain, x, z);
  };

  HikeApp.prototype.updatePrompt = function () {
    if (!this.prompt) return;
    if (this.nearNpc) {
      var n = this.nearNpc.userData.npc;
      this.prompt.hidden = false;
      this.prompt.textContent = "Press E — talk with " + n.name;
      return;
    }
    var nearVista = this.nearVista;
    if (nearVista) {
      this.prompt.hidden = false;
      this.prompt.textContent = "Press E — rest at " + nearVista.name;
      return;
    }
    this.prompt.hidden = true;
  };

  HikeApp.prototype.tick = function (dt) {
    var forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    var right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    var move = new THREE.Vector3();
    if (this.keys.KeyW || this.keys.ArrowUp) move.add(forward);
    if (this.keys.KeyS || this.keys.ArrowDown) move.sub(forward);
    if (this.keys.KeyA || this.keys.ArrowLeft) move.sub(right);
    if (this.keys.KeyD || this.keys.ArrowRight) move.add(right);
    if (move.lengthSq() > 0) {
      move.normalize();
      var speed = this.keys.ShiftLeft || this.keys.ShiftRight ? WALK * 0.55 : WALK;
      if (this.keys.KeyQ) speed = SPRINT;
      this.pos.x += move.x * speed * dt;
      this.pos.z += move.z * speed * dt;
    }

    var half = this.terrain.size * 0.48;
    this.pos.x = Math.max(-half, Math.min(half, this.pos.x));
    this.pos.z = Math.max(-half, Math.min(half, this.pos.z));

    var gy = this.groundY(this.pos.x, this.pos.z);
    var targetY = gy + EYE;
    this.pos.y += (targetY - this.pos.y) * Math.min(1, dt * 12);

    this.camera.position.copy(this.pos);
    this.camera.rotation.order = "YXZ";
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;

    // Nearest NPC / vista
    var self = this;
    var best = null;
    var bestD = TALK_R;
    this.npcMeshes.forEach(function (m) {
      var d = m.position.distanceTo(self.pos);
      if (d < bestD) {
        bestD = d;
        best = m;
      }
      if (m.userData.halo) {
        m.userData.halo.material.opacity = d < TALK_R ? 0.55 : 0.22;
        m.userData.halo.rotation.z += dt * 0.4;
      }
    });
    this.nearNpc = best;

    this.nearVista = null;
    var vBest = 3.8;
    this.vistaMarkers.forEach(function (m) {
      var d = m.position.distanceTo(self.pos);
      if (d < vBest) {
        vBest = d;
        self.nearVista = m.userData.vista;
      }
    });

    // E at vista when no NPC
    if (this.keys.KeyE && !this._eLatch) {
      this._eLatch = true;
      if (this.nearNpc) this.tryTalk();
      else if (this.nearVista) this.showVista(this.nearVista);
    }
    if (!this.keys.KeyE) this._eLatch = false;

    this.updatePrompt();

    if (this.compass) {
      var deg = ((this.yaw * 180) / Math.PI + 360) % 360;
      this.compass.textContent = "Facing " + Math.round(deg) + "°";
    }

    var t = this.clock.elapsedTime;
    this.mars.position.set(Math.cos(t * 0.05) * 90, 40, Math.sin(t * 0.05) * 90);
    // Golden-hour drift
    var day = (Math.sin(t * 0.03) + 1) * 0.5;
    this.sun.intensity = 0.7 + day * 0.4;
    this.sun.color.setRGB(1, 0.88 + day * 0.08, 0.7 + day * 0.15);
    var skyCol = new THREE.Color().setRGB(0.55 + day * 0.15, 0.68 + day * 0.1, 0.82);
    this.sky.material.color.copy(skyCol);
    this.scene.fog.color.copy(skyCol);
    this.renderer.setClearColor(skyCol.getHex(), 1);
  };

  HikeApp.prototype.loop = function () {
    var self = this;
    function frame() {
      requestAnimationFrame(frame);
      var dt = Math.min(0.05, self.clock.getDelta());
      self.tick(dt);
      self.renderer.render(self.scene, self.camera);
    }
    frame();
  };

  function boot() {
    var root = document.getElementById("wider-world");
    if (!root) return;
    if (!window.THREE) {
      var missing = root.querySelector("[data-world-status]");
      if (missing) missing.textContent = "Three.js failed to load.";
      return;
    }
    try {
      new HikeApp(root);
    } catch (err) {
      var st = root.querySelector("[data-world-status]");
      if (st) st.textContent = "Trail failed: " + (err && err.message ? err.message : err);
      if (window.console && console.error) console.error(err);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
