
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");

// ボールの位置と速度
let x = 100;
let y = 80;
let vx = 180;
let vy = 140;
let r = 14;

// ボールの色
let color = "#ffd166";

let last = performance.now();

// ボールの移動と壁の判定
function update(dt) {
  x = x + vx * dt;
  y = y + vy * dt;

  // 左右の壁
  if (x + r > canvas.width) {
    x = canvas.width - r;
    vx = -vx;
  }
  if (x - r < 0) {
    x = r;
    vx = -vx;
  }

  // 上下の壁
  // 下の壁：当たるたびに少し遅くなる
if (y + r > canvas.height) {
  y = canvas.height - r;
  vx *= 0.9;
  vy = -vy * 0.9;
}
  if (y - r < 0) {
    y = r;
    vy = -vy;
  }
}

// ボールの描画
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// ゲームループ
function loop(now) {
  const dt = (now - last) / 1000;
  last = now;

  update(dt);
  draw();

  requestAnimationFrame(loop);


// キーを押したときの処理
document.addEventListener("keydown", (e) => {

  if (e.code === "ArrowUp") {
  vx = Math.sign(vx) * Math.min(Math.abs(vx) * 1.2, 600);
  vy = Math.sign(vy) * Math.min(Math.abs(vy) * 1.2, 600);
}

  // ↓：ボールの速さを0.8倍にする
if (e.code === "ArrowDown") {
  vx = Math.sign(vx) * Math.max(Math.abs(vx) * 0.8, 30);
  vy = Math.sign(vy) * Math.max(Math.abs(vy) * 0.8, 30);
}

  // ←：ボールを小さくする
  if (e.code === "ArrowLeft") {
    r = Math.max(5, r - 2);
  }

  // →：ボールを大きくする
  if (e.code === "ArrowRight") {
    r = Math.min(50, r + 2);
  }

  // C：ボールの色を変更する
  if (e.code === "KeyC") {
    color = color === "#ffd166" ? "#7aa2ff" : "#ffd166";
  }

});


}

requestAnimationFrame(loop);


