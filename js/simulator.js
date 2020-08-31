let prevBtn;
let curBtn;

(function () {
  let clicked_btn = false; // 버튼 중복 클릭 방지

  prevBtn = ""; // 이전 버튼
  curBtn = ""; // 새로 눌린 버튼

  const recoverTime = 8; // 감염 후 완치까지 걸리는 시간(초)
  const totalCount = 200; // 사람 수
  const speed = 1; // 움직이는 속도
  const radius = 5; // 반지름

  // 건강 silver
  // 감염 red
  // 완치 blue

  let healthyCount = 0;
  let sickCount = 0;
  let recoveredCount = 0;

  const healthyBar = document.querySelector(".healthy .bar");
  const sickBar = document.querySelector(".sick .bar");
  const recoveredBar = document.querySelector(".recovered .bar");
  const healthyLabelCount = document.querySelector(".healthy .count");
  const sickLabelCount = document.querySelector(".sick .count");
  const recoveredLabelCount = document.querySelector(".recovered .count");
  const simulationBtn = document.querySelector(".simulation-btn");
  const canvasContainer = document.querySelector(".canvas-container");
  const canvas = document.querySelector(".canvas");
  const context = canvas.getContext("2d");
  const canvas2 = document.querySelector(".graph-canvas");
  const context2 = canvas2.getContext("2d");
  const circleAngle = Math.PI * 2;

  let balls = [];
  let rafId;
  let stop;

  class Ball {
    constructor(info) {
      this.x = info.x;
      this.y = info.y;
      this.nextX = this.x;
      this.nextY = this.y;
      this.angle = info.angle;
      this.color = info.color;
      this.draw();
    }

    infected() {
      const self = this;
      this.color = "red";
      setTimeout(function () {
        self.recover();
      }, recoverTime * 1000);
    }

    recover() {
      this.color = "blue";
    }

    draw() {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, radius, 0, circleAngle, false);
      context.closePath();
      context.fill();
    }
  }

  function toRadian(d) {
    return (d * Math.PI) / 180;
  }

  function toDegree(r) {
    return (r * 180) / Math.PI;
  }

  function hitTest(ball1, ball2) {
    let value;
    const dx = ball1.nextX - ball2.nextX;
    const dy = ball1.nextY - ball2.nextY;
    const dist = dx * dx + dy * dy;
    if (dist <= radius * 2 * (radius * 2)) {
      value = true;
    }
    return value;
  }

  function checkCollision() {
    let ball;
    let testBall;
    for (let i = 0; i < balls.length; i++) {
      ball = balls[i];
      for (let j = i + 1; j < balls.length; j++) {
        testBall = balls[j];
        if (hitTest(ball, testBall)) {
          if (ball.color === "red" && testBall.color === "silver") {
            testBall.infected();
          }
          if (testBall.color === "red" && ball.color === "silver") {
            ball.infected();
          }
          const angle1 = ball.angle;
          const angle2 = testBall.angle;
          ball.angle = angle2;
          testBall.angle = angle1;
        }
      }
    }
  }

  function checkCount() {
    let ball;
    let healthyCount = 0;
    let sickCount = 0;
    let recoveredCount = 0;
    for (let i = 0; i < totalCount; i++) {
      ball = balls[i];
      switch (ball.color) {
        case "silver":
          healthyCount++;
          break;
        case "red":
          sickCount++;
          break;
        case "blue":
          recoveredCount++;
          break;
      }
    }
    healthyLabelCount.innerHTML = healthyCount;
    sickLabelCount.innerHTML = sickCount;
    recoveredLabelCount.innerHTML = recoveredCount;
    healthyBar.style.width = `${(healthyCount / totalCount) * 100}%`;
    sickBar.style.width = `${(sickCount / totalCount) * 100}%`;
    recoveredBar.style.width = `${(recoveredCount / totalCount) * 100}%`;

    drawGraph(recoveredCount, healthyCount, sickCount);

    if (sickCount === 0 || prevBtn == "simulation-btn") {
      stop = true;
    }
  }

  let graphX = 0;
  function drawGraph(recoveredCount, healthyCount, sickCount) {
    let recoveredHeight = (recoveredCount / totalCount) * canvas2.height;
    let healthyHeight = (healthyCount / totalCount) * canvas2.height;
    let sickHeight = (sickCount / totalCount) * canvas2.height;
    context2.fillStyle = "blue";
    context2.fillRect(graphX, 0, 1, recoveredHeight);
    context2.fillStyle = "silver";
    context2.fillRect(graphX, recoveredHeight, 1, healthyHeight);
    context2.fillStyle = "red";
    context2.fillRect(graphX, recoveredHeight + healthyHeight, 1, sickHeight);
    graphX++;
  }

  function canLocate(ball) {
    let value = true;
    for (let i = 0; i < balls.length; i++) {
      if (hitTest(ball, balls[i])) {
        value = false;
      }
    }
    return value;
  }

  function init() {
    if (simulClick == false) {
      cancelAnimationFrame(rafId);
      canvasContainer.classList.add("stop");
      simulClick == true;
      stop = true;
    }
    simulClick == false;
    balls = [];
    stop = false;
    canvasContainer.classList.remove("stop");
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    graphX = 0;

    let ball;
    for (let i = 0; i < totalCount; i++) {
      let positionOK = false;
      while (!positionOK) {
        ball = new Ball({
          x:
            radius * 2 +
            Math.floor(Math.random() * (canvas.width - radius * 3)),
          y:
            radius * 2 +
            Math.floor(Math.random() * (canvas.height - radius * 3)),
          angle: Math.round(Math.random() * 360),
          color: "silver",
        });
        positionOK = canLocate(ball);
      }
      balls.push(ball);
    }
    // 한 명 감염시키고 시작
    balls[Math.floor(Math.random() * totalCount)].infected();
    loop();
  }

  function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let ball;
    for (let i = 0; i < totalCount; i++) {
      ball = balls[i];

      if (ball.x > canvas.width - radius || ball.x < radius) {
        ball.angle = 180 - ball.angle;
      } else if (ball.y > canvas.height - radius || ball.y < radius) {
        ball.angle = 360 - ball.angle;
      }

      ball.x += Math.cos(toRadian(ball.angle)) * speed;
      ball.y += Math.sin(toRadian(ball.angle)) * speed;
      balls[i].draw();

      ball.nextX = ball.x + Math.cos(toRadian(ball.angle)) * speed;
      ball.nextY = ball.y + Math.sin(toRadian(ball.angle)) * speed;
    }

    checkCollision();
    checkCount();

    rafId = requestAnimationFrame(loop);

    if (stop) {
      cancelAnimationFrame(rafId);
      canvasContainer.classList.add("stop");
      clicked_btn = false;
    }
  }

  function chk_btn_click() {
    if (clicked_btn == true) {
      return;
    } else {
      clicked_btn = true;

      prevBtn = curBtn;
      curBtn = "simulation-btn";

      init();
    }
  }

  simulationBtn.addEventListener("click", chk_btn_click);
})();
