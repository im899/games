document.addEventListener("keydown", function(event) {
    const gameArea = document.getElementById('gameArea');
    const ball = document.getElementById('ball');
    let x = ball.offsetLeft;
    let y = ball.offsetTop;

    switch (event.key) {
        case "ArrowUp": y -= 10; break;
        case "ArrowDown": y += 10; break;
        case "ArrowLeft": x -= 10; break;
        case "ArrowRight": x += 10; break;
    }

    // Voorkom dat de bal uit de speelzone gaat
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > gameArea.clientWidth - ball.clientWidth) x = gameArea.clientWidth - ball.clientWidth;
    if (y > gameArea.clientHeight - ball.clientHeight) y = gameArea.clientHeight - ball.clientHeight;

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
});
document.addEventListener("keydown", function(event) {
    const gameArea = document.getElementById('gameArea');
    const ball = document.getElementById('ball');
    const enemy = document.getElementById('enemy');
    let x = ball.offsetLeft;
    let y = ball.offsetTop;

    switch (event.key) {
        case "ArrowUp": y -= 10; break;
        case "ArrowDown": y += 10; break;
        case "ArrowLeft": x -= 10; break;
        case "ArrowRight": x += 10; break;
    }

    // Voorkom dat de bal uit de speelzone gaat
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > gameArea.clientWidth - ball.clientWidth) x = gameArea.clientWidth - ball.clientWidth;
    if (y > gameArea.clientHeight - ball.clientHeight) y = gameArea.clientHeight - ball.clientHeight;

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    // Controleer op botsing met de vijand
    if (x < enemy.offsetLeft + enemy.offsetWidth &&
        x + ball.offsetWidth > enemy.offsetLeft &&
        y < enemy.offsetTop + enemy.offsetHeight &&
        y + ball.offsetHeight > enemy.offsetTop) {
        // Elimineer de vijand
        enemy.style.background = 'transparent';
        alert('Vijand geëlimineerd!');
    }
document.addEventListener("keydown", function(event) {
    const gameArea = document.getElementById('gameArea');
    const ball = document.getElementById('ball');
    const enemy = document.getElementById('enemy');
    const sound = document.getElementById('eliminateSound');
    const scoreElement = document.getElementById('score');
    let x = ball.offsetLeft;
    let y = ball.offsetTop;

    switch (event.key) {
        case "ArrowUp": y -= 10; break;
        case "ArrowDown": y += 10; break;
        case "ArrowLeft": x -= 10; break;
        case "ArrowRight": x += 10; break;
    }

    // Voorkom dat de bal uit de speelzone gaat
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > gameArea.clientWidth - ball.clientWidth) x = gameArea.clientWidth - ball.clientWidth;
    if (y > gameArea.clientHeight - ball.clientHeight) y = gameArea.clientHeight - ball.clientHeight;

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    // Controleer op botsing met obstakels
    document.querySelectorAll('.obstacle').forEach(function(obstacle) {
        if (x < obstacle.offsetLeft + obstacle.offsetWidth &&
            x + ball.offsetWidth > obstacle.offsetLeft &&
            y < obstacle.offsetTop + obstacle.offsetHeight &&
            y + ball.offsetHeight > obstacle.offsetTop) {
            alert('Je hebt een obstakel geraakt!');
            // Optioneel: reset de positie van de bal of geef een penalty
        }
    });

    // Controleer op botsing met de vijand
    if (x < enemy.offsetLeft + enemy.offsetWidth &&
        x + ball.offsetWidth > enemy.offsetLeft &&
        y < enemy.offsetTop + enemy.offsetHeight &&
        y + ball.offsetHeight > enemy.offsetTop) {
        enemy.style.background = 'transparent';  // Elimineer de vijand visueel
        sound.play();  // Speel het geluid af
        alert('Vijand geëlimineerd!');
        let count = parseInt(scoreElement.innerHTML.replace('Eliminaties: ', ''));
        scoreElement.innerHTML = 'Eliminaties: ' + (count + 1);
    }
});
