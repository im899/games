document.addEventListener("DOMContentLoaded", function() {
    const gameArea = document.getElementById('gameArea');
    const ball = document.getElementById('ball');
    const enemies = document.querySelectorAll('.enemy');
    const obstacles = document.querySelectorAll('.obstacle');
    const scoreElement = document.getElementById('score');
    const sound = document.getElementById('eliminateSound');
    let score = 0;

    document.addEventListener("keydown", function(event) {
        movePlayer(event);
    });

    function movePlayer(event) {
        let x = ball.offsetLeft;
        let y = ball.offsetTop;

        switch (event.key) {
            case "ArrowUp": y -= 10; break;
            case "ArrowDown": y += 10; break;
            case "ArrowLeft": x -= 10; break;
            case "ArrowRight": x += 10; break;
        }

        x = Math.max(0, Math.min(gameArea.clientWidth - ball.clientWidth, x));
        y = Math.max(0, Math.min(gameArea.clientHeight - ball.clientHeight, y));

        ball.style.left = x + 'px';
        ball.style.top = y + 'px';

        enemies.forEach(enemy => {
            if (checkCollision(ball, enemy)) {
                enemy.style.background = 'transparent';  // Elimineer de vijand visueel
                sound.play();  // Speel het geluid af
                score++;
                scoreElement.innerHTML = 'Eliminaties: ' + score;
                if (score >= 3) {
                    alert("Alle vijanden geëlimineerd! Spel wordt gereset.");
                    resetGame();
                }
            }
        });

        obstacles.forEach(obstacle => {
            if (checkCollision(ball, obstacle)) {
                alert('Je hebt een obstakel geraakt! Spel wordt gereset.');
                resetGame();
            }
        });
    }

    function checkCollision(a, b) {
        return a.offsetLeft < b.offsetLeft + b.offsetWidth &&
               a.offsetLeft + a.offsetWidth > b.offsetLeft &&
               a.offsetTop < b.offsetTop + b.offsetHeight &&
               a.offsetTop + a.offsetHeight > b.offsetTop;
    }

    function resetGame() {
        score = 0;
        scoreElement.innerHTML = 'Eliminaties: 0';
        enemies.forEach(enemy => {
            enemy.style.background = 'red';
        });
        ball.style.left = '0px';
        ball.style.top = '0px';
    }

    setInterval(moveEnemies, 50);
    function moveEnemies() {
        enemies.forEach(enemy => {
            let dx = (Math.random() - 0.5) * 10;
            let dy = (Math.random() - 0.5) * 10;
            let x = enemy.offsetLeft + dx;
            let y = enemy.offsetTop + dy;

            x = Math.max(0, Math.min(gameArea.clientWidth - enemy.clientWidth, x));
            y = Math.max(0, Math.min(gameArea.clientHeight - enemy.clientHeight, y));

            enemy.style.left = x + 'px';
            enemy.style.top = y + 'px';
        });
    }
});
