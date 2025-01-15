// Funktion til at åbne og lukke menuen
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open'); // Skifter menuens visning
}

// Funktion til at navigere til en sektion og lukke menuen
function navigateTo(section) {
    // Først lukker vi menuen
    const nav = document.querySelector('nav');
    nav.classList.remove('open');

    // Ruller til den ønskede sektion
    const targetSection = document.getElementById(section);
    targetSection.scrollIntoView({ behavior: 'smooth' });
}
