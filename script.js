// Event listener for the journey button
document.addEventListener('DOMContentLoaded', function() {
    const journeyButton = document.querySelector('.generate-button');
    
    if (journeyButton) {
        journeyButton.addEventListener('click', function() {
            window.location.href = '/questions.html';
        });
    }
});