document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const nameScreen = document.getElementById('name-screen');
    const genderScreen = document.getElementById('gender-screen');
    const boyQuestion1 = document.getElementById('boy-question1');
    const boyQuestion2 = document.getElementById('boy-question2');
    const question1 = document.getElementById('question1');
    const question2 = document.getElementById('question2');
    const question3 = document.getElementById('question3');
    const question4 = document.getElementById('question4');
    const confused = document.getElementById('confused');
    const giveUp = document.getElementById('give-up');
    const finalReveal = document.getElementById('final-reveal');
    const boyDirect = document.getElementById('boy-direct');
    
    const nameInput = document.getElementById('name');
    const nameDisplay = document.getElementById('name-display');
    
    // Confetti function for boy reveal
    function celebrateWithConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const myConfetti = confetti.create(canvas, { resize: true });
        
        const colors = ['#0d47a1', '#1976d2', '#bbdefb', '#2196f3', '#64b5f6']; // Blue theme colors
        
        // Launch confetti
        myConfetti({
            particleCount: 150,
            spread: 160,
            origin: { y: 0.6 },
            colors: colors,
            shapes: ['circle', 'square'],
            gravity: 0.5,
            scalar: 1.2
        });
        
        // Add a second burst
        setTimeout(() => {
            myConfetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.7 },
                colors: colors
            });
        }, 500);
    }
    
    // Function to switch screens
    function showScreen(hideElement, showElement) {
        hideElement.classList.remove('active');
        setTimeout(() => {
            showElement.classList.add('active');
        }, 500);
    }
    
    // Name submission
    document.getElementById('submit-name').addEventListener('click', function() {
        const name = nameInput.value.trim();
        if (name) {
            nameDisplay.textContent = `Thank you, ${name}!`;
            showScreen(nameScreen, genderScreen);
        } else {
            alert('Please enter your name to continue.');
        }
    });
    
    // Boy button - start with questions instead of direct path
    document.getElementById('boy-button').addEventListener('click', function() {
        document.body.classList.add('blue');
        showScreen(genderScreen, boyQuestion1);
    });

    // Boy Question 1 responses
    document.getElementById('boy-yes1').addEventListener('click', function() {
        document.body.classList.remove('blue');
        document.body.classList.add('bluer');
        showScreen(boyQuestion1, boyQuestion2);
    });
    
    document.getElementById('boy-no1').addEventListener('click', function() {
        document.body.classList.remove('blue');
        showScreen(boyQuestion1, genderScreen); // Redirect back to gender selection
    });

    // Boy Question 2 responses
    document.getElementById('boy-yes2').addEventListener('click', function() {
        document.body.classList.remove('bluer');
        document.body.classList.add('blue');
        showScreen(boyQuestion2, boyDirect);
        
        // Start countdown after screen transition
        setTimeout(() => {
            const countdownElement = document.getElementById('countdown-direct');
            const revealElements = document.querySelectorAll('.reveal-content-direct');
            startCountdown(countdownElement, revealElements);
        }, 600);
    });
    
    document.getElementById('boy-no2').addEventListener('click', function() {
        document.body.classList.remove('bluer');
        showScreen(boyQuestion2, genderScreen); // Redirect back to gender selection
    });
    
    // Girl button - start the questioning path
    document.getElementById('girl-button').addEventListener('click', function() {
        document.body.classList.add('pink');
        showScreen(genderScreen, question1);
    });
    
    // Question 1 responses
    document.getElementById('yes1').addEventListener('click', function() {
        document.body.classList.remove('pink');
        document.body.classList.add('pinker');
        showScreen(question1, question2);
    });
    
    document.getElementById('no1').addEventListener('click', function() {
        document.body.classList.remove('pink');
        showScreen(question1, genderScreen); // Redirect back to gender selection
    });
    
    // Question 2 responses
    document.getElementById('yes2').addEventListener('click', function() {
        document.body.classList.remove('pinker');
        document.body.classList.add('pinkest');
        showScreen(question2, question3);
    });
    
    document.getElementById('no2').addEventListener('click', function() {
        document.body.classList.remove('pinker');
        showScreen(question2, genderScreen); // Redirect back to gender selection
    });
    
    // Question 3 responses
    document.getElementById('yes3').addEventListener('click', function() {
        document.body.classList.remove('pinkest');
        showScreen(question3, question4);
    });
    
    document.getElementById('no3').addEventListener('click', function() {
        document.body.classList.remove('pinkest');
        showScreen(question3, genderScreen); // Redirect back to gender selection
    });
    
    // Question 4 responses - Coming from girl path
    document.getElementById('yes4').addEventListener('click', function() {
        showScreen(question4, finalReveal);
        
        // Start countdown after screen transition with alternating colors
        setTimeout(() => {
            const countdownElement = document.getElementById('countdown');
            const revealElements = document.querySelectorAll('.reveal-content');
            countdownElement.classList.add('countdown-alternate'); // Add alternating colors to timer
            document.body.classList.add('bg-alternate'); // Add alternating colors to background
            startCountdown(countdownElement, revealElements);
        }, 600);
    });
    
    document.getElementById('no4').addEventListener('click', function() {
        showScreen(question4, confused); // Go to confused screen instead of back to gender selection
    });
    
    // Confused screen responses
    document.getElementById('boy-button2').addEventListener('click', function() {
        showScreen(confused, finalReveal);
        
        // Start countdown after screen transition with alternating colors
        setTimeout(() => {
            const countdownElement = document.getElementById('countdown');
            const revealElements = document.querySelectorAll('.reveal-content');
            countdownElement.classList.add('countdown-alternate'); // Add alternating colors
            document.body.classList.add('bg-alternate'); // Add alternating colors to background
            startCountdown(countdownElement, revealElements);
        }, 600);
    });
    
    document.getElementById('girl-button2').addEventListener('click', function() {
        document.body.classList.add('pink');
        showScreen(confused, giveUp);
    });
    
    // Give up screen responses - both lead to final reveal
    document.getElementById('final-yes').addEventListener('click', function() {
        document.body.classList.remove('pink');
        document.body.classList.add('blue');
        showScreen(giveUp, finalReveal);
        
        // Start countdown after screen transition with alternating colors
        setTimeout(() => {
            const countdownElement = document.getElementById('countdown');
            const revealElements = document.querySelectorAll('.reveal-content');
            countdownElement.classList.add('countdown-alternate'); // Add alternating colors
            document.body.classList.add('bg-alternate'); // Add alternating colors to background
            startCountdown(countdownElement, revealElements);
        }, 600);
    });
    
    document.getElementById('another-yes').addEventListener('click', function() {
        document.body.classList.remove('pink');
        document.body.classList.add('blue');
        showScreen(giveUp, finalReveal);
        
        // Start countdown after screen transition with alternating colors
        setTimeout(() => {
            const countdownElement = document.getElementById('countdown');
            const revealElements = document.querySelectorAll('.reveal-content');
            countdownElement.classList.add('countdown-alternate'); // Add alternating colors
            document.body.classList.add('bg-alternate'); // Add alternating colors to background
            startCountdown(countdownElement, revealElements);
        }, 600);
    });
    
    // Add the countdown functionality
    function startCountdown(countdownElement, revealElements) {
        let count = 3;
        countdownElement.textContent = count;
        countdownElement.style.display = 'block';
        
        // Make sure reveal elements are hidden
        revealElements.forEach(el => el.style.display = 'none');
        
        const interval = setInterval(() => {
            count--;
            if (count <= 0) {
                clearInterval(interval);
                countdownElement.style.display = 'none';
                // Remove the alternating classes if they were added
                countdownElement.classList.remove('countdown-alternate');
                document.body.classList.remove('bg-alternate');
                document.body.classList.add('blue'); // Set back to blue for the reveal
                
                // Show the reveal elements
                revealElements.forEach(el => el.style.display = 'block');
                celebrateWithConfetti();
            } else {
                countdownElement.textContent = count;
            }
        }, 1000);
    }
    
    // Enter key for name input
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('submit-name').click();
        }
    });
});
