document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    // Improved menu toggle function
    const toggleMenu = (state) => {
        hamburger.classList.toggle('active', state);
        navMenu.classList.toggle('active', state);
        document.body.style.overflow = state ? 'hidden' : '';
        hamburger.setAttribute('aria-expanded', state);
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(!hamburger.classList.contains('active'));
    });

// Enhanced submenu handling
    document.querySelectorAll('.has-submenu > a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Only prevent default if href starts with #
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    const isOpen = parent.classList.contains('submenu-active');
                    // Close all other submenus
                    document.querySelectorAll('.has-submenu').forEach(item => {
                        if (item !== parent) item.classList.remove('submenu-active');
                    });
                    // Toggle current submenu
                    parent.classList.toggle('submenu-active', !isOpen);
                }
            }
        });
    });

// Click outside handler
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            toggleMenu(false);
            document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('submenu-active');
            });
        }
    });

// Responsive cleanup
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            toggleMenu(false);
            document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('submenu-active');
            });
        }
    });
});