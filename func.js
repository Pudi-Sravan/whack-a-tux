document.addEventListener("DOMContentLoaded", function() {
    const igloos = document.querySelectorAll(".igloo");
    const highscoreElement = document.getElementById("highscore");
    let highscore = 0;
    let tuxInterval;

    function getRandomIglooIndex() {
        return Math.floor(Math.random() * igloos.length);
    }

    function showTux() {
        const randomIglooIndex = getRandomIglooIndex();
        const randomIgloo = igloos[randomIglooIndex];
        const iglooRect = randomIgloo.getBoundingClientRect();

        const tux = document.createElement("div");
        tux.classList.add("tux");
        tux.style.backgroundImage = "url(tux2.png)";
        tux.style.backgroundSize = "cover";
        tux.style.height = "80px"; // Adjust the size as needed
        tux.style.width = "74px"; // Adjust the size as needed
        tux.style.position = "absolute";

        // Set the initial position of the tux to the right of the igloo
        const initialTop = iglooRect.top + Math.random() * (iglooRect.height - tux.offsetHeight-10);
        const initialRight = iglooRect.right;
        tux.style.top = `${initialTop}px`;
        tux.style.right = `${initialRight}px`;

        document.body.appendChild(tux);

        // Animate the tux to glide from right to left
        let position = initialRight;
        const moveInterval = setInterval(() => {
            tux.style.display='block'
            position -= 3; // Adjust the speed as needed
            tux.style.right = `${position}px`;
            if (position <= iglooRect.left - tux.offsetWidth) {
                clearInterval(moveInterval);
                tux.remove();
            }
        }, 20); // Adjust the interval as needed

        // Add click event listener to the tux
        tux.addEventListener('click', function() {
            const clickedIglooIndex = Array.from(igloos).indexOf(randomIgloo) + 1;
            if (clickedIglooIndex === randomIglooIndex + 1) {
                highscore++;
                highscoreElement.textContent = highscore;
            }
            tux.remove();
        });
    }

    function startGame() {
        tuxInterval = setInterval(showTux, 2000);
    }

    startGame();
});
