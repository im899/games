document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const enemy = document.getElementById('enemy');
    const gameArea = document.getElementById('gameArea');
    const obstacles = document.querySelectorAll('.obstacle');

    document.addEventListener('keydown', function(e) {
        movePlayer(e);
    });

    function movePlayer(event) {
        let x = player.offsetLeft;
        let y = player.offsetTop;
        switch(event.key) {
            case 'ArrowUp': y -= 20; break;
            case 'ArrowDown': y += 20; break;
            case 'ArrowLeft': x -= 20; break;
            case 'ArrowRight': x += 20; break;
        }
        x = Math.max(0, Math.min(gameArea.clientWidth - player.clientWidth, x));
        y = Math.max(0, Math.min(gameArea.clientHeight - player.clientHeight, y));
        player.style.left = x + 'px';
        player.style.top = y + 'px';

        checkCollisions();
    }

    function checkCollisions() {
        if (isCollision(player, enemy)) {
            alert('Vijand geëlimineerd! Spel wordt gereset.');
            resetGame();
        }

        obstacles.forEach(obstacle => {
            if (isCollision(player, obstacle)) {
                alert('Je hebt een obstakel geraakt! Spel wordt gereset.');
                resetGame();
            }
        });
    }

    function isCollision(a, b) {
        return a.offsetLeft < b.offsetLeft + b.offsetWidth &&
               a.offsetLeft + a.offsetWidth > b.offsetLeft &&
               a.offsetTop < b.offsetTop + b.offsetHeight &&
               a.offsetTop + a.offsetHeight > b.offsetTop;
    }

    function resetGame() {
        player.style.left = '10px';
        player.style.top = '10px';
        randomizeEnemy();
    }

    function randomizeEnemy() {
        const x = Math.floor(Math.random() * (gameArea.clientWidth - enemy.clientWidth));
        const y = Math.floor(Math.random() * (gameArea.clientHeight - enemy.clientHeight));
        enemy.style.left = x + 'px';
        enemy.style.top = y + 'px';
    }

    randomizeEnemy();
    setInterval(randomizeEnemy, 2000);  // Laat de vijand elke 2 seconden van positie veranderen
});
