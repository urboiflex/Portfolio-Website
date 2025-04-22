// Function to animate the Spotify lyrics (simpler approach)
(function() {
    // Try to start animation immediately
    tryStartAnimation();
    
    // Also try again after a short delay (in case the first attempt was too early)
    setTimeout(tryStartAnimation, 1000);
    
    function tryStartAnimation() {
        const lyricsLines = document.querySelectorAll('.lyrics-line');
        
        // If no lyrics lines are found, don't proceed
        if (!lyricsLines || lyricsLines.length === 0) {
            console.log("No lyrics lines found");
            return;
        }
        
        // Animation variables
        let currentIndex = 0;
        
        // Reset any existing animation
        clearAllHighlights();
        
        // Function to clear all highlights
        function clearAllHighlights() {
            lyricsLines.forEach(line => {
                line.style.color = ''; // Reset to default color
                line.style.transform = ''; // Reset transform
            });
        }
        
        // Function to highlight a line
        function highlightLine(index) {
            // Clear previous highlights
            clearAllHighlights();
            
            // Apply highlight directly with inline styles (more reliable than classes)
            const line = lyricsLines[index];
            line.style.color = '#1DB954'; // Spotify green
            line.style.transform = 'translateX(5px)';
            
            // Update index for next line
            currentIndex = (index + 1) % lyricsLines.length;
            
            // Schedule next line highlight
            setTimeout(() => highlightLine(currentIndex), 2000);
        }
        
        // Start the animation with the first line
        highlightLine(0);
        console.log("Lyrics animation started successfully!");
    }
})();