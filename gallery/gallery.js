// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Animate out filtered-out items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.classList.remove('fade-out');
                    item.classList.add('fade-in');
                    item.style.pointerEvents = 'auto';
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 200);
                } else {
                    item.classList.remove('fade-in');
                    item.classList.add('fade-out');
                    item.style.pointerEvents = 'none';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // Lightbox functionality
    const images = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    const closeBtn = document.querySelector('.close-modal');
    const fullscreenBtn = document.querySelector('.fullscreen-modal');
    const caption = document.getElementById('caption');

    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modal.classList.add('show');
            modalImg.src = this.src.replace('w=800', 'w=1920');
            caption.textContent = this.nextElementSibling.textContent;
            
            // Position buttons dynamically based on image size
            modalImg.onload = function() {
                positionModalButtons();
            };
        });
    });

    // Function to position buttons dynamically
    function positionModalButtons() {
        const imgRect = modalImg.getBoundingClientRect();
        const container = document.querySelector('.modal-image-container');
        const containerRect = container.getBoundingClientRect();
        
        // Calculate relative positions
        const imgWidth = modalImg.offsetWidth;
        const imgHeight = modalImg.offsetHeight;
        
        // Update button positions to be relative to actual image bounds
        if (fullscreenBtn) {
            fullscreenBtn.style.left = '12px';
            fullscreenBtn.style.top = '12px';
        }
        
        if (closeBtn) {
            closeBtn.style.right = '12px';
            closeBtn.style.top = '12px';
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            modal.classList.remove('show');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    });

    // Fullscreen toggle
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const modalContent = modal.querySelector('div.relative');
            if (!document.fullscreenElement) {
                if (modalContent.requestFullscreen) {
                    modalContent.requestFullscreen();
                } else if (modalContent.webkitRequestFullscreen) {
                    modalContent.webkitRequestFullscreen();
                } else if (modalContent.msRequestFullscreen) {
                    modalContent.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            modal.classList.remove('show');
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
    });
});
