document.addEventListener("DOMContentLoaded", function() {
    const gameArea = document.getElementById('gameArea');
    const ball = document.getElementById('ball');
    const enemy = document.getElementById('enemy');
    const obstacles = document.querySelectorAll('.obstacle');
    const scoreElement = document.getElementById('score');
    const sound = document.getElementById('eliminateSound');
    let score = 0;
    let enemySpeedX = 1;
    let enemySpeedY = 1;

    document.addEventListener("keydown", function(event) {
        let x = ball.offsetLeft;
        let y = ball.offsetTop;

        switch (event.key) {
            case "ArrowUp": y -= 10; break;
            case "ArrowDown": y += 10; break;
            case "ArrowLeft": x -= 10; break;
            case "ArrowRight": x += 10; break;
        }

        // Voorkom dat de bal uit de speelzone gaat
        x = Math.max(0, Math.min(gameArea.clientWidth - ball.clientWidth, x));
        y = Math.max(0, Math.min(gameArea.clientHeight - ball.clientHeight, y));

        ball.style.left = x + 'px';
        ball.style.top = y + 'px';

        // Controleer op botsing met obstakels
        obstacles.forEach(function(obstacle) {
            if (checkCollision(ball, obstacle)) {
                alert('Je hebt een obstakel geraakt!');
            }
        });

        // Controleer op botsing met de vijand
        if (checkCollision(ball, enemy)) {
            enemy.style.background = 'transparent';  // Elimineer de vijand visueel
            sound.play();  // Speel het geluid af
            score++;
            scoreElement.innerHTML = 'Eliminaties: ' + score;
        }
    });

    function moveEnemy() {
        let x = enemy.offsetLeft + enemySpeedX;
        let y = enemy.offsetTop + enemySpeedY;

        // Bounce off the walls
        if (x < 0 || x > gameArea.clientWidth - enemy.clientWidth) {
            enemySpeedX *= -1;
        }
        if (y < 0 || y > gameArea.clientHeight - enemy.clientHeight) {
            enemySpeedY *= -1;
        }

        enemy.style.left = x + 'px';
        enemy.style.top = y + 'px';
    }

    function checkCollision(a, b) {
        return a.offsetLeft < b.offsetLeft + b.offsetWidth &&
               a.offsetLeft + a.offsetWidth > b.offsetLeft &&
               a.offsetTop < b.offsetTop + b.offsetHeight &&
               a.offsetTop + a.offsetHeight > b.offsetTop;
    }

    setInterval(moveEnemy, 20);
});
