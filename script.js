document.addEventListener("DOMContentLoaded", () => {
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            // Calculate mouse position relative to the center of the element
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Adjust the divisor to increase/decrease the intensity of the 3D tilt
            const tiltX = (y / rect.height) * -20; 
            const tiltY = (x / rect.width) * 20;

            element.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Reset the element when the mouse leaves
        element.addEventListener('mouseleave', () => {
            element.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            element.style.transition = `transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        });

        // Remove the transition while moving so the tilt is instantly responsive
        element.addEventListener('mouseenter', () => {
            element.style.transition = `none`;
        });
    });
});
