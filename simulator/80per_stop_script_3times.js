(function () {
  let clicked_btn = false; // 버튼 중복 클릭 방지

  prevBtn = ""; // 이전 버튼
  curBtn = ""; // 새로 눌린 버튼

  const recoverTime = 8; // 감염 후 완치까지 걸리는 시간(초)
  const totalCount = 200; // 전체 사람 수
  const stop_ratio = 0.8; // 멈춰있는 비율
  const stopCount = totalCount * stop_ratio; // 멈춘 사람 수
  const moveCount = totalCount - stopCount; // 움직이는 사람 수
  const speed = 1; // 움직이는 속도
  const radius = 5; //반지름

  const healthy_color = "#b3bccb";
  const sick_color = "#dd002f";
  const recovered_color = "blue";

  let healthyCount = 0; //건강한 사람 수
  let sickCount = 0; //감염자 수
  let recoveredCount = 0; //완치자 수 (recoverTime에 따라 달라짐)

  const healthyBar = document.querySelector(".healthy .bar");
  const sickBar = document.querySelector(".sick .bar");
  const recoveredBar = document.querySelector(".recovered .bar");

  const healthyLabelCount = document.querySelector(".healthy .count");
  const sickLabelCount = document.querySelector(".sick .count");
  const recoveredLabelCount = document.querySelector(".recovered .count");

  const simulationBtn_80 = document.querySelector(".simulation-btn-80-3time");

  const canvasContainer = document.querySelector(".canvas-container");

  const canvas = document.querySelector(".canvas");
  const context = canvas.getContext("2d");
  // 그래프 그릴 캔버스
  const canvas2 = document.querySelector(".graph-canvas");
  const context2 = canvas2.getContext("2d");

  const circleAngle = Math.PI * 2;

  let move_balls = []; //움직이는 공들
  let stop_balls = []; //멈춰있는 공들
  let all_balls = []; //전체 공들

  let rafId;
  let stop;

  let startTime;

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

    infected(initialDelay) {
      const self = this;
      this.color = "#dd002f";

      if (initialDelay) {
        setTimeout(function () {
          self.recover();
        }, initialDelay + recoverTime * 1000);
      } else {
        setTimeout(function () {
          self.recover();
        }, recoverTime * 1000);
      }
    }

    recover() {
      this.color = "#1f71ff";
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

    for (let i = 0; i < all_balls.length; i++) {
      ball = all_balls[i];
      for (let j = i + 1; j < all_balls.length; j++) {
        testBall = all_balls[j];
        if (hitTest(ball, testBall)) {
          if (ball.color === "#dd002f" && testBall.color === "#b3bccb") {
            testBall.infected();
          }
          if (testBall.color === "#dd002f" && ball.color === "#b3bccb") {
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
      ball = all_balls[i];
      switch (ball.color) {
        case "#b3bccb":
          healthyCount++;
          break;
        case "#dd002f":
          sickCount++;
          break;
        case "#1f71ff":
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

    if (sickCount === 0 || prevBtn == "simulation-btn-80-3time") {
      stop = true;
    }
  }

  //drawGraph 그래프 그리기
  let graphX = 0;
  let countTime = 0;
  function drawGraph(recoveredCount, healthyCount, sickCount) {
    if (countTime > 1) {
      let recoveredHeight = (recoveredCount / totalCount) * canvas2.height;
      let healthyHeight = (healthyCount / totalCount) * canvas2.height;
      let sickHeight = (sickCount / totalCount) * canvas2.height;

      context2.fillStyle = "#1f71ff"; //완치
      context2.fillRect(graphX, 0, 1, recoveredHeight);
      context2.fillStyle = "#b3bccb"; //건강
      context2.fillRect(graphX, recoveredHeight, 1, healthyHeight);
      context2.fillStyle = "#dd002f"; //감염
      context2.fillRect(graphX, recoveredHeight + healthyHeight, 1, sickHeight);
      graphX++;
      countTime = 0;
    }
    countTime++;
  }

  function stop_canLocate(ball) {
    let value = true;
    for (let i = 0; i < stop_balls.length; i++) {
      if (hitTest(ball, stop_balls[i])) {
        value = false;
      }
    }
    return value;
  }

  function move_canLocate(ball) {
    let value = true;
    for (let i = 0; i < move_balls.length; i++) {
      if (hitTest(ball, move_balls[i])) {
        value = false;
      }
    }
    return value;
  }

  function init() {
    startTime = new Date().getTime();
    if (simulClick == false) {
      cancelAnimationFrame(rafId);
      canvasContainer.classList.add("stop");
      simulClick == true;
    }
    simulClick == false;

    all_balls = [];
    stop_balls = [];
    move_balls = [];

    stop = false;
    canvasContainer.classList.remove("stop");
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    graphX = 0;

    let stop_ball;
    let move_ball;
    // stop_balls[] 만들기
    for (let i = 0; i < stopCount; i++) {
      let stop_positionOK = false;
      while (!stop_positionOK) {
        stop_ball = new Ball({
          x:
            radius * 2 +
            Math.floor(Math.random() * (canvas.width - radius * 3)),
          y:
            radius * 2 +
            Math.floor(Math.random() * (canvas.height - radius * 3)),
          angle: Math.round(Math.random() * 360),
          color: "#b3bccb",
        });
        stop_positionOK = stop_canLocate(stop_ball);
      }
      stop_balls.push(stop_ball);
      all_balls.push(stop_ball);
    }
    // move_balls[] 만들기
    for (let i = 0; i < moveCount; i++) {
      let move_positionOK = false;
      while (!move_positionOK) {
        move_ball = new Ball({
          x:
            radius * 2 +
            Math.floor(Math.random() * (canvas.width - radius * 3)),
          y:
            radius * 2 +
            Math.floor(Math.random() * (canvas.height - radius * 3)),
          angle: Math.round(Math.random() * 360),
          color: "#b3bccb",
        });
        move_positionOK = move_canLocate(move_ball);
      }
      move_balls.push(move_ball);
      all_balls.push(move_ball);
    }
    all_balls[Math.floor(Math.random() * totalCount)].infected(10000);

    loop();
  }

  function setSocialDistancing(ratio) {
    if (ratio === 0) {
      move_balls = [...move_balls, ...stop_balls];
      stop_balls = [];
    } else {
      let stop_balls_count = totalCount * ratio;
      if (stop_balls_count > stop_balls.length) {
        for (let i = stop_balls.length; i < stop_balls_count; i++) {
          stop_balls.push(move_balls.pop());
        }
      } else {
        for (let i = stop_balls_count; i > stop_balls.length; i--) {
          move_balls.push(stop_balls.pop());
        }
      }
    }
  }

  let distanceSettingIdx = 0;
  function loop() {
    let timeSinceStart = new Date().getTime() - startTime;

    let socialDistanceSettings = [
      { ms: 0, ratio: 0.8 },
      { ms: 10000, ratio: 0 },
      { ms: 15000, ratio: 0.8 },
      { ms: 20000, ratio: 0 },
      { ms: 25000, ratio: 0.8 },
    ];

    if (
      distanceSettingIdx !== null &&
      socialDistanceSettings[distanceSettingIdx].ms <= timeSinceStart
    ) {
      setSocialDistancing(socialDistanceSettings[distanceSettingIdx].ratio);
      if (distanceSettingIdx + 1 === socialDistanceSettings.length) {
        distanceSettingIdx = null;
      } else {
        distanceSettingIdx++;
      }
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    let move_ball;
    let stop_ball;
    for (let i = 0; i < move_balls.length; i++) {
      move_ball = move_balls[i];

      if (move_ball.x > canvas.width - radius || move_ball.x < radius) {
        move_ball.angle = 180 - move_ball.angle;
      } else if (move_ball.y > canvas.height - radius || move_ball.y < radius) {
        move_ball.angle = 360 - move_ball.angle;
      }

      move_ball.x += Math.cos(toRadian(move_ball.angle)) * speed;
      move_ball.y += Math.sin(toRadian(move_ball.angle)) * speed;
      move_balls[i].draw();

      move_ball.nextX =
        move_ball.x + Math.cos(toRadian(move_ball.angle)) * speed;
      move_ball.nextY =
        move_ball.y + Math.sin(toRadian(move_ball.angle)) * speed;
    }

    for (let j = 0; j < stop_balls.length; j++) {
      stop_ball = stop_balls[j];
      stop_balls[j].draw();
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
      curBtn = "simulation-btn-80-3time";

      init();
    }
  }

  simulationBtn_80.addEventListener("click", chk_btn_click);
})();
